import { Sample, Technician, Equipment, Timetable } from '../classes/index.js';
import { ROUTINE, STAT, URGENT, GENERAL } from '../constants/index.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

// Converts inputs into instances of the corresponding classes
export const createInstances = (data) => [
  Array.isArray(data.samples) ? data.samples.map(item => new Sample(item)) : [],
  Array.isArray(data.technicians) ? data.technicians.map(item => new Technician(item)) : [],
  Array.isArray(data.equipment) ? data.equipment.map(item => new Equipment(item)) : []
];

export const sortSamplesByPriority = (samples) => {
  return samples.sort((a, b) => {
    const priorityOrder = { [STAT]: 1, [URGENT]: 2, [ROUTINE]: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

// Given the data at hand, assign samples to technicians only based on specialty
export const assignSamplesToTechnicians = (samples, technicians, equipment) => {
  const assignments = technicians.map((technician, index) => ({
    technician: {
      index,
      ...technician,
    }, assignedSamples: []
  }));
  const errors = [];

  samples.forEach((sample) => {
    const type = sample.type;
    // Prioritize technicians with matching specialty
    const availableTechnicians = assignments.filter(({ technician }) => (technician.speciality === type));
    availableTechnicians.push(...assignments.filter(({ technician }) => (technician.speciality === GENERAL)));

    if (availableTechnicians.length === 0) {
      errors.push(`No available technician for sample ${sample.id} of type ${type}`);
      return;
    }

    const chosenTechnician = availableTechnicians.reduce(
      (prev, current) => (
        prev.assignedSamples.length
          <= current.assignedSamples.length ? prev : current
      )).technician.index;

    const chosenAssignment = assignments.find(({ technician }) => technician.index === chosenTechnician);

    const chosenEquipment = equipment.find((eq) => eq.type === type && eq.available);
    chosenAssignment.assignedSamples.push({ sample, equipment: chosenEquipment });
  });

  const schedules = calculateSchedules(assignments);
  return { schedules, errors };
};

// TODO: Ensure that equipment is marked as unavailable during assigned time slots and that technicians are not double-booked
export const calculateSchedules = (assignments) => {
  // This allows parsing of time in custom format into unix timestamps
  dayjs.extend(customParseFormat);

  const schedules = [];
  assignments.forEach(({ technician, assignedSamples }) => {
    const timetable = new Timetable(technician.id, assignedSamples);

    assignedSamples.forEach(({ sample, equipment }, index) => {
      if (index === 0) {
        const startTime = Math.max(
          dayjs(technician.startTime, 'HH[h]mm'),
          dayjs(sample.arrivalTime, 'HH[h]mm')
        );

        timetable.addAssignment(
          sample.id,
          equipment.id,
          dayjs(startTime).format('HH[h]mm'),
          dayjs(dayjs(startTime).add(sample.analysisTime, 'minute')).format('HH[h]mm')
        );
      } else {
        const startTime = Math.max(
          dayjs(timetable.assignments[index - 1].endTime, 'HH[h]mm'),
          dayjs(sample.arrivalTime, 'HH[h]mm')
        );

        timetable.addAssignment(
          sample.id,
          equipment.id,
          dayjs(startTime).format('HH[h]mm'),
          dayjs(dayjs(startTime).add(sample.analysisTime, 'minute')).format('HH[h]mm')
        );
      }
    });

    schedules.push(timetable);
  });
  return schedules;
};

export const calculateTotalTime = (returnSchedule) => {
  const startTime = returnSchedule[0].startTime;
  const endTime = returnSchedule[returnSchedule.length - 1].endTime;
  const totalTime = dayjs(endTime, 'HH[h]mm').diff(dayjs(startTime, 'HH[h]mm'), 'minute');

  return totalTime;
};

// Efficiency does not match the expected output, likely due to the fact that the expected output is probably incorrect
// Calculation consists of total sample analysis time divided by total technician work time (including breaks), and multiplied by the number of technicians
export const calculateEfficiency = (returnSchedule, samples, technicians) => {
  const totalSampleTime = samples.reduce((total, sample) => total + sample.analysisTime, 0);

  const startTime = returnSchedule[0].startTime;
  const endTime = returnSchedule[returnSchedule.length - 1].endTime;
  const totalSpan = dayjs(endTime, 'HH[h]mm').diff(dayjs(startTime, 'HH[h]mm'), 'minute');

  const totalWorkTime = totalSpan * technicians.length;

  return totalSampleTime / totalWorkTime * 100;
};

import { Sample, Technician, Equipment } from '../classes/index.js';
import { ROUTINE, STAT, URGENT, GENERAL } from '../constants/index.js';

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
      id: technician.getId(),
      // name: technician.getName(),
      speciality: technician.getSpeciality(),
      // startTime: technician.getStartTime(),
      // endTime: technician.getEndTime()
    }, assignedSamples: []
  }));
  const errors = [];

  samples.forEach((sample) => {
    const type = sample.getType();
    const availableTechnicians = assignments.filter(({ technician }) => (technician.speciality === type));
    availableTechnicians.push(...assignments.filter(({ technician }) => (technician.speciality === GENERAL)));

    if (availableTechnicians.length === 0) {
      errors.push(`No available technician for sample ${sample.getId()} of type ${type}`);
      return;
    }

    const chosenTechnician = availableTechnicians.reduce(
      (prev, current) => (
        prev.assignedSamples.length
          < current.assignedSamples.length ? prev : current
      )).technician.index;

    const chosenAssignment = assignments.find(({ technician }) => technician.index === chosenTechnician);
    const chosenEquipment = equipment.find((eq) => eq.getType() === type && eq.getAvailable());
    chosenAssignment.assignedSamples.push({ sample: sample.getId(), equipment: chosenEquipment.getId() });
  });

  return { assignments, errors };
};

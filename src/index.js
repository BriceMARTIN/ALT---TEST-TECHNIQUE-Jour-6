import { createInstances } from './services/index.js';
import { sortSamplesByPriority, assignSamplesToTechnicians, calculateTotalTime, calculateEfficiency } from './services/index.js';
import input1 from './fixtures/input1.json' with { type: 'json' };
import input2 from './fixtures/input2.json' with { type: 'json' };
import input3 from './fixtures/input3.json' with { type: 'json' };
// Used for comparison
import expectedOutput1 from './fixtures/output1.json' with { type: 'json' };
import expectedOutput2 from './fixtures/output2.json' with { type: 'json' };
import expectedOutput3 from './fixtures/output3.json' with { type: 'json' };

const run = (data) => {
  const [samples, technicians, equipment] = createInstances(data);

  // Sort by priority to ensure STAT samples are processed first, followed by URGENT and then ROUTINE
  const sortedSamples = sortSamplesByPriority(samples);

  const { schedules, errors } = assignSamplesToTechnicians(sortedSamples, technicians, equipment);

  const returnSchedule = [];
  samples.forEach((sample) => {
    // This can be optimized but would require restructuring data which is not possible due to time constraints
    const currentSchedule = schedules.find((schedule) => schedule.assignments.some(
      (assignment) => assignment.sampleId === sample.id
    ));
    returnSchedule.push({
      sampleId: sample.id,
      technicianId: currentSchedule.technicianId,
      equipmentId: currentSchedule.assignments.find(
        (assignment) => assignment.sampleId === sample.id
      ).equipmentId,
      startTime: currentSchedule.assignments.find(
        (assignment) => assignment.sampleId === sample.id
      ).startTime,
      endTime: currentSchedule.assignments.find(
        (assignment) => assignment.sampleId === sample.id
      ).endTime,
      priority: sample.priority,
    });
  });

  return {
    schedule: returnSchedule,
    metrics: {
      totalTime: calculateTotalTime(returnSchedule),
      efficiency: calculateEfficiency(returnSchedule, samples, technicians),
      conflicts: errors.length,
    }
  };
};

// TODO: compare actual output to expected output
console.log('Input 1:');
console.log(run(input1));
console.log('Input 2:');
console.log(run(input2));
console.log('Input 3:');
console.log(run(input3));

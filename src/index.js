import { createInstances } from './services/index.js';
import { sortSamplesByPriority } from './services/index.js';

// Hardcoded input for testing purposes
const input = {
  'samples': [
    {
      'id': 'S001',
      'type': 'BLOOD',
      'priority': 'URGENT',
      'analysisTime': 30,
      'arrivalTime': '09:00',
      'patientId': 'P001'
    },
    {
      'id': 'S001',
      'type': 'BLOOD',
      'priority': 'STAT',
      'analysisTime': 30,
      'arrivalTime': '09:00',
      'patientId': 'P001'
    }
  ],
  'technicians': [
    {
      'id': 'T001',
      'name': 'Alice Martin',
      'speciality': 'BLOOD',
      'startTime': '08:00',
      'endTime': '17:00'
    }
  ],
  'equipment': [
    {
      'id': 'E001',
      'name': 'Analyseur Sang A',
      'type': 'BLOOD',
      'available': true
    }
  ]
};

const run = (data) => {
  const [samples, technicians, equipment] = createInstances(data);

  // Sort by priority to ensure STAT samples are processed first, followed by URGENT and then ROUTINE
  const sortedSamples = sortSamplesByPriority(samples);

  // TODO: return metrics
  return {};
};

console.log(run(input));

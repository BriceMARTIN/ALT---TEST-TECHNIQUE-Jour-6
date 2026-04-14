import { Sample, Technician, Equipment } from '../classes/index.js';

// Converts inputs into instances of the corresponding classes
export const createInstances = (data) => [
  Array.isArray(data.samples) ? data.samples.map(item => new Sample(item)) : [],
  Array.isArray(data.technicians) ? data.technicians.map(item => new Technician(item)) : [],
  Array.isArray(data.equipment) ? data.equipment.map(item => new Equipment(item)) : []
];

export const sortSamplesByPriority = (samples) => {
  return samples.sort((a, b) => {
    const priorityOrder = { 'STAT': 1, 'URGENT': 2, 'ROUTINE': 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

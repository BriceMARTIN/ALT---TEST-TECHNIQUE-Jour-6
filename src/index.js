import { createInstances } from './services/index.js';
import { sortSamplesByPriority } from './services/index.js';
import input1 from './fixtures/input1.json' with { type: 'json' };
import input2 from './fixtures/input2.json' with { type: 'json' };
import input3 from './fixtures/input3.json' with { type: 'json' };
import expectedOutput1 from './fixtures/output1.json' with { type: 'json' };
import expectedOutput2 from './fixtures/output2.json' with { type: 'json' };
import expectedOutput3 from './fixtures/output3.json' with { type: 'json' };

const run = (data) => {
  const [samples, technicians, equipment] = createInstances(data);

  // Sort by priority to ensure STAT samples are processed first, followed by URGENT and then ROUTINE
  const sortedSamples = sortSamplesByPriority(samples);

  // TODO: return metrics
  return {};
};

// TODO: compare actual output to expected output
console.log(run(input1));
console.log(run(input2));
console.log(run(input3));

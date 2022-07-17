# Genetic Algorithm Framework
[![NPM Version](https://img.shields.io/npm/v/genetic-algorithm-framework)](https://www.npmjs.com/package/genetic-algorithm-framework)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/RolandoAndrade/general-simulation-framework/blob/master/LICENSE)

Small framework for genetic algorithms.

## Getting Started

### Installation

```bash
npm install genetic-algorithm-framework
```

### Using the framework

#### Creating a new agent

An agent is a virtual entity that can be placed in a simulation. It contains a set of chromosomes of type `ChromosomeType[]` and compute
a fitness value of type `FitnessType` that is used during the selection and crossover process.

```typescript
// Import the required components.
import { Agent, Genome } from 'genetic-algorithm-framework';

// Create a new agent that will have a genome compounded by genes of type number that form a chromosome of type number[].
export class MyAgent extends Agent<number[]> {
    constructor() {
        super();
    }

    get genome(): Genome<number[]> {
        throw new Error('Here you should return the chromosomes of the agent used to compute the score.');
    }

    getScore(): Promise<number> {
        throw new Error('Here you should return the score of the agent used for the selection process.');
    }
}
```

You should define the `genome` getter and the `getScore` method that will be used by the
framework to compute the fitness value of the agent, the selection process and the crossover operations.

#### Defining the genetic functions

You must define the following functions:

##### Split Function
During the crossover process, the framework will request separate the chromosomes of the parents to mix them.
The split function divide the chromosomes in many parts and returns them in a tuple of two components. Example:

```typescript
// Import the required components.
import { SplitFunction } from 'genetic-algorithm-framework';

// Define the split function.
export const split: SplitFunction<number[]> = (chromosomeA: number[], chromosomeB: number[]): [number[], number[]] => {
    // divide a in two parts.
    const a1 = chromosomeA.slice(0, a.length / 2);
    const a2 = chromosomeA.slice(a.length / 2);
    // divide b in two parts.
    const b1 = chromosomeB.slice(0, b.length / 2);
    const b2 = chromosomeB.slice(b.length / 2);
    // return the splits.
    return [[a1, a2], [b1, b2]];
}
```

##### Mix Function
After splitting the chromosomes, the framework will mix the genes to create a new chromosome.
The process is defined by the mix function. Example:

```typescript
// Import the required components.
import { MixFunction } from 'genetic-algorithm-framework';

// Define the mix function.
export const mix: MixFunction<number[]> = (genesSplitA: number[][], genesSplitB: number[][]): number[] => {
    // Acept the first split from a.
    const [aAccepted,] = a;
    // Accept the second split from b.
    const [, bAccepted] = b;
    // return the mixed chromosome.
    return [...aAccepted, ...bAccepted]
}
```

##### Mutation Function
The mutation function is used to mutate the generated chromosome. Example:

```typescript
// Import the required components.
import { MutationFunction } from 'genetic-algorithm-framework';

// Define the mutation function.
export const mutation: MutationFunction<number[]> = (chromosome: number[]): number[] => {
    // if probability is greater than 0.5, mutate a gen in the chromosome.
    if (Math.random() > 0.5) {
        // Select a random gene.
        const index = Math.floor(Math.random() * chromosome.length);
        // Mutate the gene.
        chromosome[index] = Math.floor(Math.random() * 100);
    }
    return chromosome;
}
```

#### Defining the simulation functions
During the simulation the framework requires the definition of the following functions:

##### Sort Function
Defines how the framework will sort the agents with the calculated fitness value before the selection. Example:

```typescript
// Import the required components.
import { SortFunction } from 'genetic-algorithm-framework';

// Define the sort function.
export const sort: SortFunction<number[]> = (agents: AgentWithScore<number[]>[]): AgentWithScore<number[]>[] => {
    // Sort the agents by their fitness value on descending order.
    return agents.sort((a, b) => b.score - a.score);
}
```

##### Selection Function
Indicates how the framework will select the agents to be used in the crossover process.
Receives as a param a group of agents with the calculated fitness value, ordered by this value. Example:

```typescript
// Import the required components.
import { SelectionFunction, AgentWithScore } from 'genetic-algorithm-framework';

// Define the selection function.
export const selection: SelectionFunction<number[]> = (agentsWithScore: AgentWithScore<number[]>[]): Agent<number[]>[] => {
    // Agents are sorted by score, so return the best agents.
    return agentsWithScore.slice(0, agentsWithScore.length / 2).map(a => a.agent);
}
```

##### Stop condition
Defines the condition that will stop the simulation. Example:

```typescript
// Import the required components.
import { Agent, StopCondition, SimulationStats } from 'genetic-algorithm-framework';

// Define the stop condition.
export const stopCondition: StopCondition<number[]> = (population: Agent<number[]>[], stats: SimulationStats<number[]>): boolean => {
    // Stop the simulation at generation 100.
    return stats.currentGeneation == 100;
}
```

#### Creating a simulation


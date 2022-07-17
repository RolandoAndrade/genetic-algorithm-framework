# Genetic Algorithm Framework
[![NPM Version](https://img.shields.io/npm/v/genetic-algorithm-framework)](https://www.npmjs.com/package/genetic-algorithm-framework)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/RolandoAndrade/general-simulation-framework/blob/master/LICENSE)

Small framework for genetic algorithms.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#using-the-framework">Using the framework</a>
      <ul>
        <li><a href="#creating-a-new-agent">Creating a new agent</a></li>
        <li><a href="#defining-the-genetic-functions">Defining the genetic functions</a>
            <ul>
                <li><a href="#split-function">Split function</a></li>
                <li><a href="#mix-function">Mix function</a></li>
                <li><a href="#mutation-function">Mutation function</a></li>
            </ul>
        </li>
        <li><a href="#defining-the-simulation-functions">Defining the simulation functions</a>
            <ul>
                <li><a href="#sort-function">Sort function</a></li>
                <li><a href="#selection-function">Selection function</a></li>
                <li><a href="#stop-condition">Stop condition</a></li>
            </ul>
        </li>
        <li><a href="#define-the-agent-generator">Define the agent generator</a></li>
        <li><a href="#creating-and-running-a-simulation">Creating and running a simulation</a></li>
        <li><a href="#that's-it">That's it</a></li>
      </ul>
    </li>
    <li><a href="#examples">Examples</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Getting Started

### Prerequisites

* node >= 14

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

#### Define the agent generator
The agent generator indicates how agents will be generated. You need to create a new one extending
the `AgentGenerator` class. Example:

```typescript
// Import the required components.
import { AgentGenerator } from 'genetic-algorithm-framework';

// Define the agent generator.
export class MyAgentGenerator extends AgentGenerator<number[]> {
    constructor(protected numberOfAgents: number) {
        super();
    }

    createAgentFromGenome(genome: Genome<number>): MyAgent {
        throw new Error('Here you should create a new agent from the genome.');
    }

    createInitialPopulation(): MyAgent[] {
        const agents =  [];
        for (let i = 0; i < this.numberOfAgents; i++) {
            agents.push(this.createRandomAgent());
        }
        return agents;
    }

    createRandomAgent(): MyAgent {
        throw new Error('Here you should create a new random agent');
    }
}
```

#### Creating and running a simulation

The simulation executes the genetic algorithm. Create a new simulation instance defining the functions and the agent generator, 
then run the simulation.

```typescript
// Import the required components.
import { Simulation } from 'genetic-algorithm-framework';

// Create the simulation.
const simulation = new Simulation({
    agentGenerator: new MyAgentGenerator(2),
    mixFunction: rgbMixFunction,
    mutationFunction: rgbMutationFunction,
    selectionFunction: rgbSelectionFunction,
    sortFunction: rgbSortFunction,
    splitFunction: rgbSplitFunction
});

// Run the simulation.
(async ()=> simulation.run(stopCondition))();
```

The simulation returns a data structure with the stats of the last run.


#### That's it

You can use your own datastructures and libraries to implement the functions and dedicate your
time to the implementation of the agent environments.

## Examples

You can find some examples in the `examples` directory.

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/your_feature`)
3. Commit your Changes (`git commit -m 'Add a feature'`)
4. Push to the Branch (`git push origin feature/your_feature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

RolandoAndrade - [GitHub](https://github.com/RolandoAndrade)

Project Link: [Genetic Algorithm Framework](https://github.com/RolandoAndrade/genetic-algorithm-framework)
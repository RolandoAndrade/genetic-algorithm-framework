# Genetic Algorithm Framework
[![NPM Version](https://img.shields.io/npm/v/genetic-algorithm-framework)](https://www.npmjs.com/package/genetic-algorithm-framework)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/RolandoAndrade/general-simulation-framework/blob/master/LICENSE)

Small framework for genetic algorithms.

## Getting Started

### Installation

```bash
npm install genetic-algorithm-framework
```

### Usage

#### Creating a new agent

An agent is a virtual entity that can be placed in a simulation. It contains a set of chromosomes and compute
a fitness value that is used during the selection and crossover process.

```typescript
import { Agent, Genome } from 'genetic-algorithm-framework';

// Receives as type parameter the type of the group of genes that will be
// encapsulated into a chromosome.
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
framework to compute the fitness value of the agent and the selection process.

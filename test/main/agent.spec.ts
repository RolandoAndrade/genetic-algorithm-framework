import { Agent, AgentGenerator } from "@/main";
import { Genome } from "@/types";
import { MixFunction, MutationFunction, SplitFunction } from "@/functions";

class MockAgentGenerator extends AgentGenerator<number[]> {
    createAgentFromGenome = jest.fn((genome) => {
        return new TestAgent(genome);
    });

    createInitialPopulation(): Agent<number[], number>[] {
        return [];
    }

    createRandomAgent(): Agent<number[], number> {
        return undefined;
    }

}

class TestAgent extends Agent<number[]>{
    constructor(protected _genome: Genome<number[]>) {
        super();
    }

    get genome(): Genome<number[]> {
        return this._genome;
    }

    getScore(): Promise<number> {
        return Promise.resolve(undefined);
    }
}

describe("agent tests", () => {
    const splitFunction: SplitFunction<number[]> = jest.fn((chromosomeA, chromosomeB) => {
        const chromosomeASplits = [chromosomeA.slice(0, 4), chromosomeA.slice(4)];
        const chromosomeBSplits = [chromosomeB.slice(0, 4), chromosomeB.slice(4)];
        return [chromosomeASplits, chromosomeBSplits];
    });

    const mixFunction: MixFunction<number[]> = jest.fn((genesA: number[][], genesB: number[][]) => {
        return [...genesA[0], ...genesB[1]];
    });

    const mutationFunction: MutationFunction<number[]> = jest.fn((genes: number[]) => {
        return genes;
    });

    describe("crossover", () => {
        const agentA = new TestAgent([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]);
        const agentB = new TestAgent([
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]);

        it("should crossover the genomes", () => {
            const mockAgentGenerator = new MockAgentGenerator();
            Agent.crossover(agentA, agentB, splitFunction, mixFunction, mutationFunction, mockAgentGenerator);
            expect(splitFunction).toHaveBeenCalledTimes(3);
            expect(mixFunction).toHaveBeenCalledTimes(3);
            expect(mutationFunction).toHaveBeenCalledTimes(3);
        });

        it("should return a new child from the agent generator", () => {
            const mockAgentGenerator = new MockAgentGenerator();
            const child = Agent.crossover(agentA, agentB, splitFunction, mixFunction, mutationFunction, mockAgentGenerator);
            expect(mockAgentGenerator.createAgentFromGenome).toHaveBeenCalled();
            expect(child.genome).toEqual([[0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 1, 1]]);
        });
    })
})
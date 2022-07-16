import { Agent, AgentGenerator, Chromosome } from "@/main";
import { Genome } from "@/types";

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
            const fn = jest.spyOn(Chromosome, "crossover").mockReturnValue(new Chromosome([0, 0, 0, 0, 1, 1, 1, 1]));
            const mockAgentGenerator = new MockAgentGenerator();
            Agent.crossover(agentA, agentB, undefined, undefined, undefined, mockAgentGenerator);
            expect(fn).toHaveBeenCalled();
        });

        it("should return a new child from the agent generator", () => {
            jest.spyOn(Chromosome, "crossover").mockReturnValue(new Chromosome([0, 0, 0, 0, 1, 1, 1, 1]));
            const mockAgentGenerator = new MockAgentGenerator();
            const child = Agent.crossover(agentA, agentB, undefined, undefined, undefined, mockAgentGenerator);
            expect(mockAgentGenerator.createAgentFromGenome).toHaveBeenCalled();
            expect(child.genome).toEqual([new Chromosome([0, 0, 0, 0, 1, 1, 1, 1]), new Chromosome([0, 0, 0, 0, 1, 1, 1, 1]), new Chromosome([0, 0, 0, 0, 1, 1, 1, 1])]);
        });
    })
})
import { Agent, AgentGenerator } from "@/main";
import { Genome } from "@/types";
import { RGBAgent } from "@examples/color-search/rgb-agent";

export class RGBGenerator extends AgentGenerator<number> {
    constructor(protected numberOfAgents: number) {
        super();
    }

    createAgentFromGenome(genome: Genome<number>): Agent<number> {
        return new RGBAgent([genome[0], genome[1], genome[2]]);
    }

    createInitialPopulation(): Agent<number>[] {
        const agents =  [];
        for (let i = 0; i < this.numberOfAgents; i++) {
            agents.push(this.createRandomAgent());
        }
        return agents;
    }

    createRandomAgent(): Agent<number> {
        const rgb = [
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
        ] as [number, number, number];
        return new RGBAgent(rgb);
    }

}
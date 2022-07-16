import { Agent } from "@/main";
import { DefaultFitnessType, Genome } from "@/types";

/**
 * Tries to reach the max value for each RGB component.
 * */
export class RGBAgent extends Agent<number> {
    constructor(protected rgb: [number, number, number]) {
        super();
    }

    get genome(): Genome<number> {
        return this.rgb;
    }

    getScore(): Promise<DefaultFitnessType> {
        const sumOfComponents = this.genome.reduce((acc, curr) => acc + curr, 0);
        return Promise.resolve(sumOfComponents);
    }

}
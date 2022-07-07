import { DefaultFitnessType, DefaultGenType } from "./aliases";
import { SimulationOptions } from "./simulation-options";
import { StopCondition } from "./stop-condition";

export class Simulation<GenType = DefaultGenType, FitnessType = DefaultFitnessType> {
    /** Defines the current generation of the simulation */
    protected readonly currentGeneration = 0;

    /**
     * @param options The simulation options.
     * */
    constructor(protected readonly options: SimulationOptions<GenType, FitnessType>) {}

    /**
     * @description Runs the simulation.
     * @param stopCondition Defines when the simulation must stop. If not specified, the simulation will run indefinitely.
     * @returns The final population of agents.
     * */
    public async run(stopCondition: StopCondition = () => true) {

    }
}
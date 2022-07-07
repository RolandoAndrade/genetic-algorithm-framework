import { Agent } from "./agent";
import { GenerationFactory } from "./generation.factory";

export interface SimulationOptions<GenType, FitnessType> {
    /** Defines how a generation is created */
    generationFactory: GenerationFactory<GenType, FitnessType>;
}
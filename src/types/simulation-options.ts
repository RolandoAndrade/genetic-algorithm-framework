import { GenerationFactory, SortFunction, SelectionFunction } from "../functions";

export interface SimulationOptions<GenType, FitnessType> {
    /** Defines how a generation is created */
    generationFactory: GenerationFactory<GenType, FitnessType>;
    /** Defines how scores are sorted */
    sortFunction: SortFunction<GenType, FitnessType>;
    /** Defines the selection of the agents */
    selectionFunction: SelectionFunction<GenType, FitnessType>;
}
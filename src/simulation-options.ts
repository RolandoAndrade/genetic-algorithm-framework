import { GenerationFactory } from "./generation.factory";
import { SortFunction } from "./sort-function";
import { SelectionFunction } from "./selection-function";

export interface SimulationOptions<GenType, FitnessType> {
    /** Defines how a generation is created */
    generationFactory: GenerationFactory<GenType, FitnessType>;
    /** Defines how scores are sorted */
    sortFunction: SortFunction<GenType, FitnessType>;
    /** Defines the selection of the agents */
    selectionFunction: SelectionFunction<GenType, FitnessType>;
}
import { SortFunction, SelectionFunction, SplitFunction, MixFunction, MutationFunction } from "@/functions";
import { AgentGenerator } from "@/main/agent-generator";

export interface SimulationOptions<GenType, FitnessType> {
    /** Defines how a generation is created */
    agentGenerator: AgentGenerator<GenType, FitnessType>;
    /** Defines how scores are sorted */
    sortFunction: SortFunction<GenType, FitnessType>;
    /** Defines the selection of the agents */
    selectionFunction: SelectionFunction<GenType, FitnessType>;
    /** Defines the function used to split the genome */
    splitFunction: SplitFunction<GenType>;
    /** Defines the function used to mix the genome */
    mixFunction: MixFunction<GenType>;
    /** Defines the function used to mutate the genome */
    mutationFunction: MutationFunction<GenType>;
}

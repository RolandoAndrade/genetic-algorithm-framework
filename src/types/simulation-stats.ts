/**
 * @description Stats about the simulation.
 * */
import { AgentWithScore } from "@/types/agent-with-score";

export interface SimulationStats<GenType, FitnessType> {
    /** The number of generations */
    currentGeneration: number;
    /** The highest fitness score */
    highestScore: FitnessType;
    /** The lowest fitness score */
    lowestScore: FitnessType;
    /** The scores of the simulation that can be used to extract other statistics */
    agentsWithScores: AgentWithScore<GenType, FitnessType>[];
}
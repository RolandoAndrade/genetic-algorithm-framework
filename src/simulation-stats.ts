/**
 * @description Stats about the simulation.
 * */
export interface SimulationStats<FitnessType> {
    /** The number of generations */
    currentGeneration: number;
    /** The highest fitness score */
    highestScore: FitnessType;
    /** The lowest fitness score */
    lowestScore: FitnessType;
    /** The scores of the simulation that can be used to extract other statistics */
    scores: FitnessType[];
}
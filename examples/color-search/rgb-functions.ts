import {
    MixFunction,
    MutationFunction,
    SelectionFunction,
    SortFunction,
    SplitFunction,
    StopCondition
} from "@/functions";

/**
 * It just returns the components because each component only has a value.
 * */
export const rgbSplitFunction: SplitFunction<number> = (componentFromA, componentFromB) => {
    return [[componentFromA], [componentFromB]];
}

/**
 * Receives the splits and returns the max value between the two parent components.
 * */
export const rgbMixFunction: MixFunction<number> = (rgbComponentA, rgbComponentB) => {
    const [colorA] = rgbComponentA;
    const [colorB] = rgbComponentB;
    return Math.max(colorA, colorB);
}

/**
 * With a chance of 15% increases or decreases the component value.
 * */
export const rgbMutationFunction: MutationFunction<number> = (rgbComponent) => {
    const mutate = Math.random() < 0.15;
    if (mutate) {
        const mutation = Math.random() < 0.5 ? 1 : -1;
        return Math.min(Math.max(rgbComponent + mutation, 0), 255);
    }
    return rgbComponent;
}

/**
 * Selects the best 30% of the population.
 * */
export const rgbSelectionFunction: SelectionFunction<number> = (population) => {
    const totalPopulation = population.length;
    const percentile30 = Math.floor(totalPopulation * 0.3);
    return population.slice(0, percentile30).map(agent => agent.agent);
}

/**
 * Sort the population by the fitness value in decreasing order.
 * */
export const rgbSortFunction: SortFunction<number> = (agents) => {
    return agents.sort((a, b) => b.score - a.score);
}

/**
 * Stops until the score is 255 * 3 or the current generation is 100.
 * */
export const rgbStopFunction: StopCondition<number> = (population, stats) => {
    return (stats.highestScore === 255 * 3) || (stats.currentGeneration === 100);
}
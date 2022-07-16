import {
    MixFunction,
    MutationFunction,
    SelectionFunction,
    SortFunction,
    SplitFunction,
    StopCondition
} from "@/functions";
import { SentenceConstants } from "./constants";

export function getRandomChar(): string {
    return SentenceConstants.AVAILABLE_CHARS.charAt(Math.floor(Math.random() * SentenceConstants.AVAILABLE_CHARS.length));
}

type Accepted = string[];
type Rejected = string[];

export const sentenceSplitFunction: SplitFunction<string[]> = (a, b) => {
    const aSplits: [Accepted, Rejected] = [[], []];
    const bSplits: [Rejected, Accepted] = [[], []];
    // Randomly accept a gen from a or b
    for (let i = 0; i < a.length; i++) {
        if (SentenceConstants.EXPECTED_RESULT[i] === a[i]) {
            aSplits[0].push(a[i]);
            bSplits[0].push(b[i]);
        } else if (SentenceConstants.EXPECTED_RESULT[i] === b[i]) {
            aSplits[1].push(a[i]);
            bSplits[1].push(b[i]);
        } else {
            const shouldAccept = Math.random() < 0.5;
            if (shouldAccept) {
                aSplits[0].push(a[i]);
                bSplits[0].push(b[i]);
            }
            else {
                aSplits[1].push(a[i]);
                bSplits[1].push(b[i]);
            }
        }
    }
    return [aSplits, bSplits];
}

export const sentenceMixFunction: MixFunction<string[]> = (a, b) => {
    const [aAccepted,] = a;
    const [, bAccepted] = b;
    return [...aAccepted, ...bAccepted]
}

export const sentenceMutationFunction: MutationFunction<string[]> = (a) => {
    const mutate = Math.random() < 0.25;
    if (mutate) {
        const index = Math.floor(Math.random() * a.length);
        a[index] = getRandomChar();
    }
    return a;
}

export const sentenceSelectionFunction: SelectionFunction<string[]> = (population) => {
    const totalPopulation = population.length;
    const percentile50 = Math.floor(totalPopulation * 0.5);
    return population.slice(0, percentile50).map(agent => agent.agent);
}

export const sentenceSortFunction: SortFunction<string[]> = (agents) => {
    return agents.sort((a, b) => b.score - a.score);
}

export const sentenceStopCondition: StopCondition<string[]> = (currentPopulation, stats) => {
    const { highestScore, currentGeneration } = stats;
    return (highestScore >= SentenceConstants.EXPECTED_RESULT.length);
}
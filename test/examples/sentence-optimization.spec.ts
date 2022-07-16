import { Simulation } from "@/main";
import { SentenceGenerator } from "../../examples/sentence-optimization/sentence-generator";
import {
    sentenceMixFunction,
    sentenceMutationFunction,
    sentenceSelectionFunction, sentenceSortFunction, sentenceSplitFunction, sentenceStopCondition
} from "../../examples/sentence-optimization/sentence-functions";
import { SentenceConstants } from "../../examples/sentence-optimization/constants";

describe("sentence optimization tests", () => {
    const numberOfAgents = 500;
    const simulation = new Simulation({
        agentGenerator: new SentenceGenerator(numberOfAgents),
        mixFunction: sentenceMixFunction,
        mutationFunction: sentenceMutationFunction,
        selectionFunction: sentenceSelectionFunction,
        sortFunction: sentenceSortFunction,
        splitFunction: sentenceSplitFunction
    });
    const expectedHighestScore = SentenceConstants.EXPECTED_RESULT.length;

    it("should find the sentence", async () => {
        const results = await simulation.run(sentenceStopCondition);
        expect(results.highestScore).toEqual(expectedHighestScore);
        expect(results.agentsWithScores[0].agent.genome[0].join("")).toEqual(SentenceConstants.EXPECTED_RESULT);
    });
})
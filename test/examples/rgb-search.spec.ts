import { Simulation } from "@/main";
import { RGBGenerator } from "@examples/color-search/rgb-generator";
import {
    rgbMixFunction,
    rgbMutationFunction,
    rgbSelectionFunction,
    rgbSortFunction, rgbSplitFunction, rgbStopFunction
} from "@examples/color-search/rgb-functions";

describe("rgb search tests", () => {
    const numberOfAgents = 100;
    const simulation = new Simulation({
        agentGenerator: new RGBGenerator(numberOfAgents),
        mixFunction: rgbMixFunction,
        mutationFunction: rgbMutationFunction,
        selectionFunction: rgbSelectionFunction,
        sortFunction: rgbSortFunction,
        splitFunction: rgbSplitFunction
    });

    it("should find the color", async () => {
        const results = await simulation.run(rgbStopFunction);
        console.log(results);
        expect(results.highestScore).toEqual(255 * 3);
        expect(results.agentsWithScores[0].agent.genome).toEqual([255, 255, 255]);
    });
})
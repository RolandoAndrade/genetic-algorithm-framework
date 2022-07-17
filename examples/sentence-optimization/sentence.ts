import { Agent } from "@/main";
import { Genome } from "@/types";
import { SentenceConstants } from "./constants";

export class Sentence extends Agent<string[]>{
    protected _genome: Genome<string[]>

    constructor(protected sentence: string) {
        super();
        this._genome = [sentence.split("")];
    }

    get genome(): Genome<string[]>{
        return this._genome;
    }

    getScore(): Promise<number> {
        const expected = SentenceConstants.EXPECTED_RESULT;
        const actual = this.genome[0];
        const scores = expected.split("").map((letter, index) => {
            return letter === actual[index] ? 1 : 0;
        });
        return Promise.resolve(scores.reduce((acc, score) => acc + score, 0));
    }

}
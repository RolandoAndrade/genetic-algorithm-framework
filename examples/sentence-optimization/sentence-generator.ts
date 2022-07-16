import { AgentGenerator, Chromosome } from "@/main";
import { Sentence } from "./sentence";
import { SentenceConstants } from "./constants";
import { getRandomChar } from "./sentence-functions";

export class SentenceGenerator extends AgentGenerator<string[]> {
    constructor(protected numberOfAgents: number) {
        super();
    }


    createAgentFromGenome(genome: string[][]): Sentence {
        const genesAsSentence = genome[0].join("");
        return new Sentence(genesAsSentence);
    }

    createInitialPopulation(): Sentence[] {
        const sentences =  [];
        for (let i = 0; i < this.numberOfAgents; i++) {
            sentences.push(this.createRandomAgent());
        }
        return sentences;
    }

    createRandomAgent(): Sentence {
        let sentence = "";
        for (let i = 0; i < SentenceConstants.EXPECTED_RESULT.length; i++) {
            sentence += getRandomChar();
        }
        return new Sentence(sentence);
    }
}
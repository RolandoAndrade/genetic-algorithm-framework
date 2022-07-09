import { Chromosome } from "@/main/chromosome";
import { MixFunction, MutationFunction, SplitFunction } from "@/functions";

describe("chromosome tests", () => {
    describe('getGenes', () => {
        it('should return the genes', () => {
            const genes = [1, 2, 3];
            const chromosome = new Chromosome(genes);
            expect(chromosome.getGenes()).toEqual(genes);
        });
    });

    describe("crossover", () => {
        const chromosomeA = new Chromosome<number[]>([0, 1, 0, 1, 0, 0, 1, 1]);
        const chromosomeB = new Chromosome<number[]>([0, 0, 1, 1, 0, 1, 0, 1]);

        const splitFunction: SplitFunction<number[]> = jest.fn((chromosomeA, chromosomeB) => {
            const chromosomeASplits = [chromosomeA.getGenes().slice(0, 4), chromosomeA.getGenes().slice(4)];
            const chromosomeBSplits = [chromosomeB.getGenes().slice(0, 4), chromosomeB.getGenes().slice(4)];
            return [chromosomeASplits, chromosomeBSplits];
        });

        const mixFunction: MixFunction<number[]> = jest.fn((genesA: number[][], genesB: number[][]) => {
            return [...genesA[0], ...genesB[1]];
        });

        const mutationFunction: MutationFunction<number[]> = jest.fn((genes: number[]) => {
            return genes;
        });

        it("should call the functions", () => {
            const newChromosome = Chromosome.crossover(chromosomeA, chromosomeB, splitFunction, mixFunction, mutationFunction);
            expect(splitFunction).toHaveBeenCalledTimes(1);
            expect(mixFunction).toHaveBeenCalledTimes(1);
            expect(mutationFunction).toHaveBeenCalledTimes(1);
        });

        it("should create the correct chromosome", () => {
            const newChromosome = Chromosome.crossover(chromosomeA, chromosomeB, splitFunction, mixFunction, mutationFunction);
            expect(newChromosome.getGenes()).toEqual([0, 1, 0, 1, 0, 1, 0, 1]);
        });
    });
});
import { MixFunction } from "./mix-function";
import { MutationFunction } from "./mutation-function";
import { SplitFunction } from "./split-function";
import { DefaultGenType } from "./aliases";

/**
 * @description Chromosome class.
 *
 * A chromosome is a set of genes that represent a virtual entity. They are used to generate an output and
 * are cross-overed to generate new chromosomes after each generation.
 * */
export class Chromosome<GenType = DefaultGenType> {
    /**
     * @description Creates a new chromosome cross-over with the given chromosome.
     * @param chromosomeA The first chromosome to cross-over.
     * @param chromosomeB The second chromosome to cross-over.
     * @param splitFunction The split function to use.
     * @param mixFunction The function used to mix the genes of the chromosomes.
     * @param mutationFunction The function used to mutate the genes of the chromosome.
     * @returns The new chromosome.
     * */
    public static crossover<GenType = DefaultGenType>(chromosomeA: Chromosome<GenType>,
                                                      chromosomeB: Chromosome<GenType>,
                                                      splitFunction: SplitFunction<GenType>,
                                                      mixFunction: MixFunction<GenType>,
                                                      mutationFunction: MutationFunction<GenType>): Chromosome<GenType> {
        const [chromosomeASplits, chromosomeBSplits] = splitFunction(chromosomeA, chromosomeB);
        const newGenes = mixFunction(chromosomeASplits, chromosomeBSplits);
        const mutatedGenes = mutationFunction(newGenes);
        return new Chromosome<GenType>(mutatedGenes);
    }

    /**
     * @param genes The genes of the chromosome.
     * */
    constructor(protected readonly genes: GenType) {}


    /**
     * @description Gets the genes of the chromosome.
     *
     * @returns The genes of the chromosome. The returned value references the property, so copy it if you want to
     * modify it.
     * */
    public getGenes(): GenType {
        return this.genes;
    }
}

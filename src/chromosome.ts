import { MixFunction } from "./mix-function";
import { MutationFunction } from "./mutation-function";

/**
 * @description Chromosome class.
 *
 * A chromosome is a set of genes that represent a virtual entity. They are used to generate an output and
 * are cross-overed to generate new chromosomes after each generation.
 * */
export abstract class Chromosome<GenType = number[][]> {
    /**
     * @description Creates a new chromosome cross-over with the given chromosome.
     * @param chromosomeA The first chromosome to cross-over.
     * @param chromosomeB The second chromosome to cross-over.
     * @param mixFunction The function used to mix the genes of the chromosomes.
     * @param mutationFunction The function used to mutate the genes of the chromosome.
     * @returns The new chromosome.
     * */
    public static crossOver<GenType = number[][]>(chromosomeA: Chromosome<GenType>,
                                                  chromosomeB: Chromosome<GenType>,
                                                  mixFunction: MixFunction<GenType>,
                                                  mutationFunction: MutationFunction<GenType>): Chromosome<GenType> {
        const chromosomeASplits = chromosomeA.split();
        const chromosomeBSplits = chromosomeB.split();
        const newGenes = mixFunction(chromosomeASplits, chromosomeBSplits);
        const mutatedGenes = mutationFunction(newGenes);
        return undefined;
    }

    /**
     * @description Splits the chromosome into many parts.
     * */
    public abstract split(): GenType[];
}

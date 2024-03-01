type ChainSpecies = {
  name: string;
  url: string;
};

type EvolutionDetails = {
  min_level: number;
};

type EvolvesTo = {
  species: ChainSpecies;
  evolution_details: EvolutionDetails[];
  evolves_to: EvolvesTo[];
};

export type Chain = {
  evolves_to: EvolvesTo[];
  species: ChainSpecies;
};

export type PokemonChain = {
  chain: Chain;
};

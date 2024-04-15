type Species = {
  name: string;
  url: string;
};

type EvolutionDetails = {
  min_level: number;
};

type EvolvesTo = {
  species: Species;
  evolution_details: EvolutionDetails[];
  evolves_to: EvolvesTo[];
};

export type Chain = {
  evolves_to: EvolvesTo[];
  species: Species;
};

export type PokemonChain = {
  chain: Chain;
};

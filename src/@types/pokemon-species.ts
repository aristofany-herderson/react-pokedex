type FlavorTexEntrie = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
};

type EvolutionChain = {
  url: string;
};

export type PokemonSpecies = {
  id: number;
  name: string;
  url: string;
  evolution_chain: EvolutionChain;
  flavor_text_entries: FlavorTexEntrie[] | null;
  is_legendary: boolean;
};

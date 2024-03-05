type FlavorTexEntrie = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
};

type Generation = {
  name:
    | "generation-i"
    | "generation-ii"
    | "generation-iii"
    | "generation-iv"
    | "generation-v"
    | "generation-vi"
    | "generation-vii"
    | "generation-viii"
    | "generation-ix";
  url: string;
};

type EvolutionChain = {
  url: string;
}

export type PokemonSpecies = {
  base_happiness: number;
  capture_rate: number;
  color: any[];
  egg_groups: any[];
  evolution_chain: EvolutionChain;
  evolves_from_species: any[];
  flavor_text_entries: FlavorTexEntrie[] | null;
  form_description: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: any[];
  generation: Generation;
  growth_rate: any[];
  name: string;
  url: string;
  habitat: string | null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  names: any[];
  order: number;
  pal_park_encounters: any[];
  pokedex_numbers: any[];
  shape: any[];
  varieties: any[];
};

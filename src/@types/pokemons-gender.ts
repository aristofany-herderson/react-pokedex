export type PokemonsGender = {
  id: number;
  name: string;
  pokemon_species_details: PokemonSpeciesDetail[];
  required_for_evolution: RequiredForEvolution[];
};

export type PokemonSpeciesDetail = {
  pokemon_species: RequiredForEvolution;
  rate: number;
};

export type RequiredForEvolution = {
  name: string;
  url: string;
};

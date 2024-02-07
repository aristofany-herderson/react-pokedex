type PokemonSpecieDetailsProps = {
  pokemon_species: {
    name: string;
    url: string;
  };
  rate: number;
};

export type PokemonGenderProps = {
  pokemon_species_details: PokemonSpecieDetailsProps[];
};

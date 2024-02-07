type PokemonFlavorTextEntrieProps = {
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

export type PokemonSpecieProps = {
  flavor_text_entries: PokemonFlavorTextEntrieProps[];
};

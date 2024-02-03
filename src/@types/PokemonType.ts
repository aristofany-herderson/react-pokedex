type PokemonsType = {
  type: {
    name:
      | "normal"
      | "fire"
      | "fighting"
      | "water"
      | "flying"
      | "grass"
      | "poison"
      | "electric"
      | "ground"
      | "psychic"
      | "rock"
      | "ice"
      | "bug"
      | "dragon"
      | "ghost"
      | "dark"
      | "steel"
      | "fairy";
  };
};

export type PokemonType = {
  id: number;
  name: string;
  types: PokemonsType[];
};

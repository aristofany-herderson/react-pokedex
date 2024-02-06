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

type PokemonsAbilityType = {
  ability: {
    name: string;
  },
  is_hidden: boolean;
}

type PokemonsStatType = {
  base_stat: number,
  stat: {
    name: string;
  }
}

export type PokemonType = {
  id: number;
  name: string;
  types: PokemonsType[];
  abilities: PokemonsAbilityType[];
  stats: PokemonsStatType[];
  base_experience: number;
  weight: number;
  height: number;
};

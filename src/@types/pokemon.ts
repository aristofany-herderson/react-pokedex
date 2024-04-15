type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type Species = {
  name: string;
  url: string;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name:
      | "hp"
      | "attack"
      | "defense"
      | "special-attack"
      | "special-defense"
      | "speed";
    url: string;
  };
};

export type Type = {
  slot: number;
  type: {
    name: PossibleTypes;
    url: string;
  };
};

export type PossibleTypes =
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

type Sprites = {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

export type Pokemon = {
  id: number;
  name: string;
  abilities: Ability[];
  base_experience: number;
  height: number;
  weight: number;
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
};

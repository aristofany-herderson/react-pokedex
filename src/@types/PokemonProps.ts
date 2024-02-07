export type PokemonTypeProps = {
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
    url: string;
  };
};

type PokemonAbilityProps = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};

type PokemonStatProps = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonProps = {
  id: number;
  name: string;
  types: PokemonTypeProps[];
  abilities: PokemonAbilityProps[];
  stats: PokemonStatProps[];
  base_experience: number;
  weight: number;
  height: number;
};

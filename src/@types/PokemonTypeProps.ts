type DamageType = {
  name: PokemonTypeNameProps;
  url: string;
};

type DamageRelations = {
  double_damage_from: DamageType[];
  half_damage_from: DamageType[];
  no_damage_from: DamageType[];
};

export type PokemonAdvancedTypeProps = {
  damage_relations: DamageRelations;
};

export type PokemonTypeNameProps =
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

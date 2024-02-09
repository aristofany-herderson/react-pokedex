type DamageRelationType = {
  name: string;
  url: string;
}

type DamageRelation = {
  double_damage_from: DamageRelationType[];
  double_damage_to: DamageRelationType[];
  half_damage_from: DamageRelationType[];
  half_damage_to: DamageRelationType[];
  no_damage_from: DamageRelationType[];
  no_damage_to: DamageRelationType[];
};

export type PokemonsTypes = {
  damage_relations: DamageRelation;
  game_indices: any[];
  generation: any[];
  id: number;
  move_damage_class: any[];
  moves: any[];
  name: string;
  names: any[];
  past_damage_relations: any[];
  pokemon: any[];
};

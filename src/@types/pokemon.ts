export type Pokemon = {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: BaseField[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: PastType[];
  species: BaseField;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};

export type Ability = {
  ability: BaseField;
  is_hidden: boolean;
  slot: number;
};

export type BaseField = {
  name: string;
  url: string;
};

export type Cries = {
  latest: string;
  legacy: string;
};

export type GameIndex = {
  game_index: number;
  version: BaseField;
};

export type HeldItem = {
  item: BaseField;
  version_details: VersionDetail[];
};

export type VersionDetail = {
  rarity: number;
  version: BaseField;
};

export type Move = {
  move: BaseField;
  version_group_details: VersionGroupDetail[];
};

export type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: BaseField;
  version_group: BaseField;
};

export type PastType = {
  generation: BaseField;
  types: Type[];
};

export type GenerationV = {
  "black-white": Sprites;
};

export type GenerationIv = {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
};

export type Versions = {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Home };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
};

export type Other = {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
  showdown: ShowDown;
};

export type Sprites = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: Other;
  versions: Versions;
};

export type GenerationI = {
  "red-blue": RedBlue;
  yellow: RedBlue;
};

export type RedBlue = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

export type GenerationIi = {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
};

export type Crystal = {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
};

export type Gold = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
};

export type GenerationIii = {
  emerald: OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire": Gold;
};

export type OfficialArtwork = {
  front_default: string;
  front_shiny: string;
};

export type ShowDown = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

export type Home = {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
};

export type GenerationVii = {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
};

export type DreamWorld = {
  front_default: string;
  front_female: null;
};

export type GenerationViii = {
  icons: DreamWorld;
};

export type SpeciesStat = {
  name:
    | "hp"
    | "attack"
    | "defense"
    | "special-attack"
    | "special-defense"
    | "speed";
  url: string;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: SpeciesStat;
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

export type SpeciesType = {
  name: PossibleTypes;
  url: string;
};

export type Type = {
  slot: number;
  type: SpeciesType;
};

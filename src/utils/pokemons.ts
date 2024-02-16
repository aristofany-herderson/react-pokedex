import { PokemonPosibleTypes } from "@/@types/pokemon";

export const POKEMONTYPECOLORS = {
  normal: {
    light: "#CDCDB9",
    medium: "#7E7E67",
  },
  fire: {
    light: "#F4934D",
    medium: "#A8512B",
  },
  fighting: {
    light: "#DA736E",
    medium: "#802020",
  },
  water: {
    light: "#85A5F0",
    medium: "#33508A",
  },
  flying: {
    light: "#B8A5F2",
    medium: "#584E82",
  },
  grass: {
    light: "#99D07D",
    medium: "#3D6021",
  },
  poison: {
    light: "#BE588B",
    medium: "#602040",
  },
  electric: {
    light: "#F9DF78",
    medium: "#B88C20",
  },
  ground: {
    light: "#EDD081",
    medium: "#967A2A",
  },
  psychic: {
    light: "#F47DA1",
    medium: "#A8285F",
  },
  rock: {
    light: "#C5B059",
    medium: "#6D5C1F",
  },
  ice: {
    light: "#B3E1E1",
    medium: "#589595",
  },
  bug: {
    light: "#B5C534",
    medium: "#577415",
  },
  dragon: {
    light: "#966AFD",
    medium: "#4A3086",
  },
  ghost: {
    light: "#917fAF",
    medium: "#403A54",
  },
  dark: {
    light: "#968376",
    medium: "#403A31",
  },
  steel: {
    light: "#C1C1D1",
    medium: "#787882",
  },
  fairy: {
    light: "#EFA7B7",
    medium: "#B0708E",
  },
};

export const POKEMONSTATS = {
  hp: {
    name: "hp",
    color: "#df2140",
  },
  attack: {
    name: "atk",
    color: "#ff994d",
  },
  defense: {
    name: "def",
    color: "#fedc61",
  },
  "special-attack": {
    name: "spA",
    color: "#85ddff",
  },
  "special-defense": {
    name: "spD",
    color: "#a8ef95",
  },
  speed: {
    name: "spd",
    color: "#fb94a8",
  },
};

export const POKEMONSLEVELS = {
  1: {
    color: "#5CA463",
  },
  2: {
    color: "#90C78E",
  },
  3: {
    color: "#B5A88A",
  },
  4: {
    color: "#E3A857",
  },
  5: {
    color: "#DC143C",
  },
};

export const POKEMONGENERATIONS = {
  "generation-i": {
    value: 1,
  },
  "generation-ii": {
    value: 2,
  },
  "generation-iii": {
    value: 3,
  },
  "generation-iv": {
    value: 4,
  },
  "generation-v": {
    value: 5,
  },
  "generation-vi": {
    value: 6,
  },
  "generation-vii": {
    value: 7,
  },
  "generation-viii": {
    value: 8,
  },
  "generation-ix": {
    value: 9,
  },
};

export const POKEMONSTRENGTHBYABILITY: {
  [key: string]: { strength: PokemonPosibleTypes };
} = {
  levitate: {
    strength: "ground",
  },
  "volt-absorb": {
    strength: "electric",
  },
  "water-absorb": {
    strength: "water",
  },
  "flash-fire": {
    strength: "fire",
  },
};

export const SELECTPOKEMONTYPES = [
  { value: "normal" },
  { value: "fire" },
  { value: "fighting" },
  { value: "water" },
  { value: "flying" },
  { value: "grass" },
  { value: "poison" },
  { value: "electric" },
  { value: "ground" },
  { value: "psychic" },
  { value: "rock" },
  { value: "ice" },
  { value: "bug" },
  { value: "dragon" },
  { value: "ghost" },
  { value: "dark" },
  { value: "steel" },
  { value: "fairy" },
];

type SelectePokemonNumber = {
  level: 1 | 2 | 3 | 4 | 5,
  label: string;
  values: {
    min: number;
    max: number;
  }
}

export const SELECTPOKEMONHEIGHTS: SelectePokemonNumber[] = [
  {
    level: 1,
    label: "0.1m - 3m",
    values: {
      min: 0,
      max: 3,
    },
  },
  {
    level: 2,
    label: "3.1m - 6m",
    values: {
      min: 3,
      max: 6,
    },
  },
  {
    level: 3,
    label: "6.1m - 9m",
    values: {
      min: 6,
      max: 9,
    },
  },
  {
    level: 4,
    label: "9.1m - 12m",
    values: {
      min: 9,
      max: 12,
    },
  },
  {
    level: 5,
    label: "12.1m - 14.5m",
    values: {
      min: 12,
      max: 14.5,
    },
  },
];

export const SELECTPOKEMONWEIGHTS: SelectePokemonNumber[] = [
  {
    level: 1,
    label: "0.1kg - 200.0kg",
    values: {
      min: 0,
      max: 200,
    },
  },
  {
    level: 2,
    label: "200.1kg - 400.0kg",
    values: {
      min: 200,
      max: 400,
    },
  },
  {
    level: 3,
    label: "400.1kg - 600.0kg",
    values: {
      min: 400,
      max: 600,
    },
  },
  {
    level: 4,
    label: "600.1kg - 800.0kg",
    values: {
      min: 600,
      max: 800,
    },
  },
  {
    level: 5,
    label: "800.1kg - 999.9kg",
    values: {
      min: 800,
      max: 1000,
    },
  },
];

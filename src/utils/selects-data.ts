import { SelectionPokemonRange } from "@/@types/select-pokemon-range";

export const SELECTPOKEMONORDER = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export const SELECTPOKEMONTYPES = [
  { value: "normal", label: "normal" },
  { value: "fire", label: "fire" },
  { value: "fighting", label: "fighting" },
  { value: "water", label: "water" },
  { value: "flying", label: "flying" },
  { value: "grass", label: "grass" },
  { value: "poison", label: "poison" },
  { value: "electric", label: "electric" },
  { value: "ground", label: "ground" },
  { value: "psychic", label: "psychic" },
  { value: "rock", label: "rock" },
  { value: "ice", label: "ice" },
  { value: "bug", label: "bug" },
  { value: "dragon", label: "dragon" },
  { value: "ghost", label: "ghost" },
  { value: "dark", label: "dark" },
  { value: "steel", label: "steel" },
  { value: "fairy", label: "fairy" },
];

export const SELECTPOKEMONHEIGHTS: SelectionPokemonRange[] = [
  {
    value: 1,
    label: "0.1m - 3m",
    range: {
      min: 0,
      max: 3,
    },
  },
  {
    value: 2,
    label: "3.1m - 6m",
    range: {
      min: 3,
      max: 6,
    },
  },
  {
    value: 3,
    label: "6.1m - 9m",
    range: {
      min: 6,
      max: 9,
    },
  },
  {
    value: 4,
    label: "9.1m - 12m",
    range: {
      min: 9,
      max: 12,
    },
  },
  {
    value: 5,
    label: "12.1m - 14.5m",
    range: {
      min: 12,
      max: 14.5,
    },
  },
];

export const SELECTPOKEMONWEIGHTS: SelectionPokemonRange[] = [
  {
    value: 1,
    label: "0.1kg - 200.0kg",
    range: {
      min: 0,
      max: 200,
    },
  },
  {
    value: 2,
    label: "200.1kg - 400.0kg",
    range: {
      min: 200,
      max: 400,
    },
  },
  {
    value: 3,
    label: "400.1kg - 600.0kg",
    range: {
      min: 400,
      max: 600,
    },
  },
  {
    value: 4,
    label: "600.1kg - 800.0kg",
    range: {
      min: 600,
      max: 800,
    },
  },
  {
    value: 5,
    label: "800.1kg - 999.9kg",
    range: {
      min: 800,
      max: 1000,
    },
  },
];

export const SELECTLEVELCOLORS = {
  1: "#FF6B6B",
  2: "#FF8A65",
  3: "#FFB74D",
  4: "#FFD54F",
  5: "#4CAF50",
};

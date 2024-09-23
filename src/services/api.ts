import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const BASEIMAGEURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
export const MAXPOKEMONSRENDERED = 1025;
export const POKEMONSPERPAGE = 6;

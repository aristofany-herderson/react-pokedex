import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const BASEHYBRIDSHIVAMIMAGEURL =
  "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/";
  export const BASEPOKEAPIIMAGEURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const MAXPOKEMONSRENDERED = 1025;
export const POKEMONSPERPAGE = 6;

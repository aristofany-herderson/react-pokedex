import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const baseImageUrl =
  "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/";
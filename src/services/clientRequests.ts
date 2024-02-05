import { PokemonType } from "@/@types/PokemonType";
import { api } from "./api";

export const getPokemonByID = async (id: number) => {
  const pokemon = await api.get(`pokemon/${id}`);
  const reponse: PokemonType = pokemon.data;

  return reponse;
};
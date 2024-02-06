import { PokemonType } from "@/@types/PokemonType";
import { api } from "./api";

export const getPokemonByNameOrID = async (id: string| number) => {
  const pokemon = await api.get(`pokemon/${id}`);
  const reponse: PokemonType = pokemon.data;

  return reponse;
};
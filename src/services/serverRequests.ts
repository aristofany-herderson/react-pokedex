"use server";
import { PokemonType } from "@/@types/PokemonType";
import { api } from "./api";
import { shuffle } from "@/utils/shuffle";

export const getPokemons = async (pagination: number) => {
  const MOSTPOKEMONSRENDERED = 905;
  const POKEMONSPERPAGE = 6;
  const pokemonIDs = Array.from(
    { length: MOSTPOKEMONSRENDERED },
    (_, i) => i + 1
  );

  const filteredIDs = shuffle(pokemonIDs).filter((id, index) => {
    if (
      index < pagination * POKEMONSPERPAGE &&
      index >= (pagination - 1) * POKEMONSPERPAGE
    ) {
      return id;
    }
  });

  const response = await Promise.all(
    filteredIDs.map(async (id) => {
      const pokemon = await api.get(`pokemon/${id}`);
      const reponse: PokemonType = pokemon.data;

      return reponse;
    })
  );

  return response;
};

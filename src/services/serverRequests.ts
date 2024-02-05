"use server";
import { PokemonType } from "@/@types/PokemonType";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE, api } from "./api";
import { shuffle } from "@/utils/shuffle";

export const getPokemons = async (pagination: number) => {
  const pokemonIDs = Array.from(
    { length: MAXPOKEMONSRENDERED },
    (_, i) => i + 1
  );

  const filteredIDs = pokemonIDs.filter((id, index) => {
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

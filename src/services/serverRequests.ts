"use server";
import { PokemonType } from "@/@types/PokemonType";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE, api } from "./api";
import { shuffle } from "@/utils/shuffle";
import { getPokemonByNameOrID } from "./clientRequests";

export const getPokemons = async (pagination: number) => {
  const pokemonIDs = Array.from(
    { length: MAXPOKEMONSRENDERED },
    (_, i) => i + 1
  );

  const filteredIDs = (pokemonIDs).filter((id, index) => {
    if (
      index < pagination * POKEMONSPERPAGE &&
      index >= (pagination - 1) * POKEMONSPERPAGE
    ) {
      return id;
    }
  });

  const response = await Promise.all(
    filteredIDs.map(async (id) => {
      const reponse = await getPokemonByNameOrID(id);

      return reponse;
    })
  );

  return response;
};

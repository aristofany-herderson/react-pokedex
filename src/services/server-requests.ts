"use server";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "./api";
import { getLoadPokemonData } from "./client-requests";

const POKEMONIDS = Array.from({ length: MAXPOKEMONSRENDERED }, (_, i) => i + 1);

export const fetchPokemons = async (pagination: number) => {
  const filteredIDsByPagination = POKEMONIDS.filter((id, index) => {
    if (
      index < pagination * POKEMONSPERPAGE &&
      index >= (pagination - 1) * POKEMONSPERPAGE
    )
      return id;
  });

  const response = await Promise.all(
    filteredIDsByPagination.map(async (id) => {
      const reponse = await getLoadPokemonData(id);
      return reponse;
    })
  );

  return response;
};

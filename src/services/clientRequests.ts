import { PokemonType } from "@/@types/PokemonType";
import { api } from "./api";
import { PokemonSpecieType } from "@/@types/PokemonSpecieType";
import { PokemonGender } from "@/@types/PokemonGender";

export const getPokemonByNameOrID = async (id: string | number) => {
  const pokemon = await api.get<PokemonType>(`pokemon/${id}`);
  const reponse = pokemon.data;

  return reponse;
};

export const getPokemonEntry = async (id: string | number) => {
  const pokemonSpecie = await api.get<PokemonSpecieType>(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  const response = pokemonSpecie.data.flavor_text_entries.filter((entry) => {
    if (entry.language.name == "en") {
      return entry;
    }
  })[0].flavor_text;

  return response;
};

export const getPokemonGender = async (name: string) => {
  const female = await api.get<PokemonGender>(
    `https://pokeapi.co/api/v2/gender/1`
  );
  const male = await api.get<PokemonGender>(
    `https://pokeapi.co/api/v2/gender/2`
  );

  const isFemale =
    female.data.pokemon_species_details.filter((pokemon) => {
      if (pokemon.pokemon_species.name == name) return pokemon;
    }).length > 0;

  const isMale =
    male.data.pokemon_species_details.filter((pokemon) => {
      if (pokemon.pokemon_species.name == name) return pokemon;
    }).length > 0;

  return {isFemale, isMale};
};

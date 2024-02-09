import { api } from "./api";
import { Pokemon, PokemonPosibleTypes } from "@/@types/pokemon";
import { PokemonSpecies } from "@/@types/pokemon-species";
import { PokemonsGender } from "@/@types/pokemons-gender";
import { PokemonsTypes } from "@/@types/pokemons-types";

export const getBasePokemonData = async (slug: string | number) => {
  const { data: response } = await api.get<Pokemon>(`pokemon/${slug}`);

  return response;
};

export const getPokemonEntry = async (slug: string | number) => {
  const { data } = await api.get<PokemonSpecies>(
    `https://pokeapi.co/api/v2/pokemon-species/${slug}`
  );
  const response = data.flavor_text_entries.filter((entry) => {
    if (entry.language.name == "en") return entry;
  })[0].flavor_text;

  return response;
};

export const getPokemonGenders = async (name: string) => {
  const { data: female } = await api.get<PokemonsGender>(
    `https://pokeapi.co/api/v2/gender/1`
  );
  const { data: male } = await api.get<PokemonsGender>(
    `https://pokeapi.co/api/v2/gender/2`
  );

  const isFemale =
    female.pokemon_species_details.filter((pokemon) => {
      if (pokemon.pokemon_species.name == name) return pokemon;
    }).length > 0;

  const isMale =
    male.pokemon_species_details.filter((pokemon) => {
      if (pokemon.pokemon_species.name == name) return pokemon;
    }).length > 0;

  return { isFemale, isMale };
};

export const getPokemonDamageRelations = async (name: string) => {
  const data = await getBasePokemonData(name);

  const response = await Promise.all(
    data.types.map(async (type) => {
      const { data } = await api.get<PokemonsTypes>(type.type.url);
      return data;
    })
  );

  return response;
};

export const getPokemonWeakness = async (name: string) => {
  const damageRelations = await getPokemonDamageRelations(name);

  const lessDamage: PokemonPosibleTypes[] = [];
  const moreDamage: PokemonPosibleTypes[] = [];

  damageRelations.map((relation) => {
    const relationsWeakness = relation.damage_relations.double_damage_from;
    const relationsImmunity = relation.damage_relations.no_damage_from;
    const relationsHalf = relation.damage_relations.half_damage_from;

    relationsWeakness.forEach((weak) => {
      const name = weak.name as PokemonPosibleTypes;
      moreDamage.push(name);
    });

    relationsImmunity.forEach((immunity) => {
      const name = immunity.name as PokemonPosibleTypes;
      lessDamage.push(name);
    });
    relationsHalf.forEach((half) => {
      const name = half.name as PokemonPosibleTypes;
      lessDamage.push(name);
    });
  });

  const allWeakness = moreDamage.filter((weak) => !lessDamage.includes(weak));

  const weakness = allWeakness.filter(
    (item, pos) => allWeakness.indexOf(item) === pos
  );
  return weakness;
};

export const getAllPokemonData = async (slug: string | number) => {
  const pokemonBaseData = await getBasePokemonData(slug);
  const pokemonWeakness = await getPokemonWeakness(pokemonBaseData.name);
  const pokemonEntry = await getPokemonEntry(pokemonBaseData.name);
  const pokemonGender = await getPokemonGenders(pokemonBaseData.name);
  const pokemonDamageRelations = await getPokemonDamageRelations(
    pokemonBaseData.name
  );

  return {
    id: pokemonBaseData.id,
    name: pokemonBaseData.name,
    types: pokemonBaseData.types,
    abilities: pokemonBaseData.abilities,
    stats: pokemonBaseData.stats,
    base_experience: pokemonBaseData.base_experience,
    weight: pokemonBaseData.weight,
    height: pokemonBaseData.height,
    pokemonBaseData,
    weakness: pokemonWeakness,
    entry: pokemonEntry,
    gender: pokemonGender,
    damage_relation: pokemonDamageRelations,
  };
};

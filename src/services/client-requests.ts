import { api } from "./api";
import { Pokemon, PokemonPosibleTypes } from "@/@types/pokemon";
import { PokemonSpecies } from "@/@types/pokemon-species";
import { PokemonsGender } from "@/@types/pokemons-gender";
import { PokemonsTypes } from "@/@types/pokemons-types";
import { POKEMONGENERATIONS, POKEMONSTRENGTHBYABILITY } from "@/utils/pokemons";

export const getBasePokemonData = async (slug: string | number) => {
  const { data: response } = await api.get<Pokemon>(`pokemon/${slug}`);

  return response;
};

export const getPokemonSpecie = async (slug: string | number) => {
  const { data: response } = await api.get<PokemonSpecies>(
    `https://pokeapi.co/api/v2/pokemon-species/${slug}`
  );

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

export const getPokemonAbilities = async (name: string) => {
  const { abilities: response } = await getBasePokemonData(name);

  return response;
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
  const abilities = await getPokemonAbilities(name);
  const lessDamage: PokemonPosibleTypes[] = [];
  const moreDamage: PokemonPosibleTypes[] = [];

  abilities.map((ability) => {
    const newAbility = ability.ability.name;
    const strength = POKEMONSTRENGTHBYABILITY[newAbility];

    if (strength) {
      lessDamage.push(strength.strength);
    }
  });

  damageRelations.forEach((relation) => {
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
  const pokemonSpecie = await getPokemonSpecie(pokemonBaseData.id);
  const pokemonGender = await getPokemonGenders(pokemonBaseData.name);

  return {
    id: pokemonBaseData.id,
    name: pokemonBaseData.name,
    types: pokemonBaseData.types,
    abilities: pokemonBaseData.abilities,
    stats: pokemonBaseData.stats,
    base_experience: pokemonBaseData.base_experience,
    weight: pokemonBaseData.weight,
    height: pokemonBaseData.height,
    weakness: pokemonWeakness,
    entry:
      pokemonSpecie?.flavor_text_entries?.filter((entry) => {
        if (entry.language.name == "en") return entry;
      })[0]?.flavor_text || "",
    gender: pokemonGender,
  };
};

export const getLoadPokemonData = async (slug: string | number) => {
  const pokemonBaseData = await getBasePokemonData(slug);
  const pokemonWeakness = await getPokemonWeakness(pokemonBaseData.name);
  const pokemonSpecie = await getPokemonSpecie(pokemonBaseData.id);

  return {
    id: pokemonBaseData.id,
    name: pokemonBaseData.name,
    types: pokemonBaseData.types,
    abilities: pokemonBaseData.abilities,
    weight: pokemonBaseData.weight,
    height: pokemonBaseData.height,
    generation: POKEMONGENERATIONS[pokemonSpecie.generation.name].value,
    weakness: pokemonWeakness,
  };
};

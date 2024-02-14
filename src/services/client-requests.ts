import { MAXPOKEMONSRENDERED, api } from "./api";
import { Pokemon, PokemonPosibleTypes } from "@/@types/pokemon";
import { PokemonSpecies } from "@/@types/pokemon-species";
import { PokemonsAbilities } from "@/@types/pokemons-abilities";
import { PokemonsGender } from "@/@types/pokemons-gender";
import { PokemonsTypes } from "@/@types/pokemons-types";
import { POKEMONGENERATIONS, POKEMONSTRENGTHBYABILITY } from "@/utils/pokemons";

export const getBasePokemonData = async (slug: string | number) => {
  const { data } = await api.get<Pokemon>(`pokemon/${slug}`);

  const response = {
    id: data.id,
    name: data.name,
    types: data.types,
    abilities: data.abilities,
    weight: data.weight,
    height: data.height,
    stats: data.stats,
    base_experience: data.base_experience,
  };

  return response;
};

export const getPokemonSpecie = async (slug: string | number) => {
  const { data } = await api.get<PokemonSpecies>(
    `https://pokeapi.co/api/v2/pokemon-species/${slug}`
  );

  const response = {
    flavor_text_entries: data.flavor_text_entries,
    generation: data.generation,
  };

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

export const getAllPokemonAbilities = async () => {
  const { data } = await api.get<PokemonsAbilities>(
    "https://pokeapi.co/api/v2/ability?offset=0&limit=99999"
  );
  const response = data.results;

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
    const currentAbility = ability.ability.name;
    const strength = POKEMONSTRENGTHBYABILITY[currentAbility];

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

export const getNextAndPrevPokemonData = async (slug: number) => {
  const prevID = slug - 1 < 1 ? MAXPOKEMONSRENDERED : slug - 1;
  const nextID = slug + 1 > MAXPOKEMONSRENDERED ? 1 : slug + 1;
  const prevPokemon = await getBasePokemonData(prevID);
  const nextPokemon = await getBasePokemonData(nextID);

  return {
    previous: {
      id: prevPokemon.id,
      name: prevPokemon.name,
    },
    next: {
      id: nextPokemon.id,
      name: nextPokemon.name,
    },
  };
};

export const getAllPokemonData = async (slug: string | number) => {
  const pokemonBaseData = await getBasePokemonData(slug);
  const pokemonWeakness = await getPokemonWeakness(pokemonBaseData.name);
  const pokemonSpecie = await getPokemonSpecie(pokemonBaseData.id);
  const pokemonGender = await getPokemonGenders(pokemonBaseData.name);
  const pokemonPrevAndNext = await getNextAndPrevPokemonData(
    pokemonBaseData.id
  );

  const entry =
    pokemonSpecie?.flavor_text_entries?.filter((entry) => {
      if (entry.language.name == "en") return entry;
    })[0]?.flavor_text || "";

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
    entry,
    gender: pokemonGender,
    adjacent_pokemons: pokemonPrevAndNext,
  };
};

export const getLoadPokemonData = async (slug: string | number) => {
  const pokemonBaseData = await getBasePokemonData(slug);
  const pokemonSpecie = await getPokemonSpecie(pokemonBaseData.id);
  const pokemonWeakness = await getPokemonWeakness(pokemonBaseData.name);

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

import { AsyncReturnType } from "@/@types/async-return-type";
import {
  Pokemon,
  PossibleTypes as PokemonPossibleTypes,
} from "@/@types/pokemon";
import { Chain, PokemonChain } from "@/@types/pokemon-chain";
import { Abilities } from "@/@types/pokemon-general-requests";
import { PokemonSpecies } from "@/@types/pokemon-species";
import { PokemonTypes } from "@/@types/pokemon-types";
import { PokemonsAbility } from "@/@types/pokemons-abilities";
import { PokemonsGender } from "@/@types/pokemons-gender";
import { getIdInSpeciesUrl } from "@/utils/get-id-in-species-url";
import { POKEMONSTRENGTHBYABILITY } from "@/utils/pokemon-strength-by-ability";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE, api } from "./api";

const POKEMONIDS = Array.from({ length: MAXPOKEMONSRENDERED }, (_, i) => i + 1);
export const getPokemonsByPagination = async (pagination: number) => {
  const filteredIDsByPagination = POKEMONIDS.filter(
    (_, index) => {
      return (
        index < pagination * POKEMONSPERPAGE &&
        index >= (pagination - 1) * POKEMONSPERPAGE
      );
    }
  );

  const response = await Promise.all(
    filteredIDsByPagination.map(async (id) => {
      return await getLoadPokemonData(id);
    })
  );

  return response;
};

export const getPokemonSimpleData = async (slug: string | number) => {
  const { data } = await api.get<Pokemon>(`pokemon/${slug}`);

  return {
    id: data.id,
    name: data.name,
    weight: data.weight,
    height: data.height,
    abilities: data.abilities,
    types: data.types,
    stats: data.stats,
    base_experience: data.base_experience,
    sprite: data.sprites.other["official-artwork"].front_default,
  };
};

export const getPokemonAbility = async (name: string) => {
  const { data } = await api.get<PokemonsAbility>(
    `https://pokeapi.co/api/v2/ability/${name}`
  );

  const entry =
    data.flavor_text_entries?.find((entry) => entry.language.name === "en")
      ?.flavor_text || null;

  return {
    entry,
  };
};

export const getPokemonSpecie = async (slug: number) => {
  const { data } = await api.get<PokemonSpecies>(
    `https://pokeapi.co/api/v2/pokemon-species/${slug}`
  );

  return {
    is_legendary: data.is_legendary,
    evolution_chain: data.evolution_chain,
    flavor_text_entries: data.flavor_text_entries,
  };
};

export const getPokemonGenders = async (slug: number) => {
  const [female, male] = await Promise.all([
    api.get<PokemonsGender>(`https://pokeapi.co/api/v2/gender/1`),
    api.get<PokemonsGender>(`https://pokeapi.co/api/v2/gender/2`),
  ]);

  const isFemale = female.data.pokemon_species_details.some(
    (pokemon) => getIdInSpeciesUrl(pokemon.pokemon_species.url) === slug
  );
  const isMale = male.data.pokemon_species_details.some(
    (pokemon) => getIdInSpeciesUrl(pokemon.pokemon_species.url) === slug
  );

  return { isFemale, isMale };
};

export const getPokemonAbilities = async (slug: number) => {
  const { abilities } = await getPokemonSimpleData(slug);
  return abilities;
};

export const getAllPokemonsAbilities = async () => {
  const { data } = await api.get<Abilities>(
    "https://pokeapi.co/api/v2/ability?offset=0&limit=99999"
  );
  return data.results;
};

export const getPokemonDamageRelations = async (slug: number) => {
  const { types } = await getPokemonSimpleData(slug);

  return Promise.all(
    types.map(async (type) => {
      const { data } = await api.get<PokemonTypes>(type.type.url);
      return data;
    })
  );
};

export const getPokemonWeakness = async (slug: number) => {
  const [damageRelations, abilities] = await Promise.all([
    getPokemonDamageRelations(slug),
    getPokemonAbilities(slug),
  ]);

  const lessDamage: PokemonPossibleTypes[] = [];
  const moreDamage: PokemonPossibleTypes[] = [];

  abilities.forEach((ability) => {
    const currentAbility = ability.ability.name;
    const strength = POKEMONSTRENGTHBYABILITY[currentAbility];

    if (strength) {
      lessDamage.push(strength);
    }
  });

  damageRelations.forEach((relation) => {
    const relationsWeakness = relation.damage_relations.double_damage_from;
    const relationsImmunity = relation.damage_relations.no_damage_from;
    const relationsHalf = relation.damage_relations.half_damage_from;

    relationsWeakness.forEach((weak) => {
      moreDamage.push(weak.name);
    });

    relationsImmunity.forEach((immunity) => {
      lessDamage.push(immunity.name);
    });

    relationsHalf.forEach((half) => {
      lessDamage.push(half.name);
    });
  });

  const allWeakness = moreDamage.filter((weak) => !lessDamage.includes(weak));

  const weakness = allWeakness.filter(
    (item, pos) => allWeakness.indexOf(item) === pos
  );

  return weakness;
};

export const getPokemonEvolutions = async (slug: number) => {
  const { evolution_chain } = await getPokemonSpecie(slug);
  const {
    data: { chain },
  } = await api.get<PokemonChain>(evolution_chain.url);

  const formatResult = async (evolution: Chain) => {
    const name = evolution.species.name;
    const id = getIdInSpeciesUrl(evolution.species.url);
    const level = evolution.evolves_to[0]?.evolution_details[0]?.min_level || 0;
    const { sprite } = await getPokemonSimpleData(id);

    return {
      name,
      sprite,
      id,
      level,
    };
  };

  const evolutions: AsyncReturnType<typeof formatResult>[][] = [];
  let currentEvolution = chain.evolves_to;
  if (currentEvolution) {
    evolutions.push([await formatResult(chain)]);
  }

  while (currentEvolution?.length > 0) {
    evolutions.push(
      await Promise.all(
        currentEvolution.map(async (data) => await formatResult(data))
      )
    );
    currentEvolution = currentEvolution[0]?.evolves_to || null;
  }

  return evolutions;
};

export const getAdjacentPokemonsData = async (slug: number) => {
  const prevID = slug - 1 < 1 ? MAXPOKEMONSRENDERED : slug - 1;
  const nextID = slug + 1 > MAXPOKEMONSRENDERED ? 1 : slug + 1;

  const [prevPokemon, nextPokemon] = await Promise.all([
    getPokemonSimpleData(prevID),
    getPokemonSimpleData(nextID),
  ]);

  return {
    previous: {
      id: prevPokemon.id,
      name: prevPokemon.name,
      sprite: prevPokemon.sprite,
    },
    next: {
      id: nextPokemon.id,
      name: nextPokemon.name,
      sprite: nextPokemon.sprite,
    },
  };
};

export const getPokemonData = async (slug: number) => {
  const [baseData, gender, weakness, adjacent_pokemons, specie, evolution] =
    await Promise.all([
      getPokemonSimpleData(slug),
      getPokemonGenders(slug),
      getPokemonWeakness(slug),
      getAdjacentPokemonsData(slug),
      getPokemonSpecie(slug),
      getPokemonEvolutions(slug),
    ]);

  const abilities = await Promise.all(
    baseData.abilities.map(async (ability) => {
      const { entry } = await getPokemonAbility(ability.ability.name);
      return {
        name: ability.ability.name,
        entry,
        is_hidden: ability.is_hidden,
      };
    })
  );

  const entry =
    specie.flavor_text_entries?.find((entry) => entry.language.name === "en")
      ?.flavor_text || null;

  return {
    id: baseData.id,
    name: baseData.name,
    types: baseData.types,
    stats: baseData.stats,
    base_experience: baseData.base_experience,
    weight: baseData.weight,
    height: baseData.height,
    sprite: baseData.sprite,
    abilities,
    weakness,
    entry,
    is_legendary: specie.is_legendary,
    gender,
    adjacent_pokemons,
    evolution,
  };
};

export const getLoadPokemonData = async (slug: number) => {
  const [{ id, name, sprite, types, abilities, weight, height }, weakness] =
    await Promise.all([getPokemonSimpleData(slug), getPokemonWeakness(slug)]);

  return {
    id,
    name,
    sprite,
    types,
    abilities,
    weight,
    height,
    weakness,
  };
};

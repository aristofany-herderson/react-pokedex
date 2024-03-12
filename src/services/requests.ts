import { Pokemon, PosibleTypes as PokemonPosibleTypes } from "@/@types/pokemon";
import { Chain, PokemonChain } from "@/@types/pokemon-chain";
import { PokemonSpecies } from "@/@types/pokemon-species";
import { PokemonsAbilities } from "@/@types/pokemons-abilities";
import { PokemonsGender } from "@/@types/pokemons-gender";
import { PokemonsTypes } from "@/@types/pokemons-types";
import { getID } from "@/utils/pokemon-get-id-in-species";
import { POKEMONSTRENGTHBYABILITY } from "@/utils/pokemons";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE, api } from "./api";

const POKEMONIDS = Array.from({ length: MAXPOKEMONSRENDERED }, (_, i) => i + 1);

export const fetchPokemons = async (pagination: number) => {
  const filteredIDsByPagination = POKEMONIDS.filter((_, index) => {
    return (
      index < pagination * POKEMONSPERPAGE &&
      index >= (pagination - 1) * POKEMONSPERPAGE
    );
  });

  const response = await Promise.all(
    filteredIDsByPagination.map(async (id) => {
      return await getLoadPokemonData(id);
    })
  );

  return response;
};

export const getBasePokemonData = async (slug: string | number) => {
  const { data } = await api.get<Pokemon>(`pokemon/${slug}`);

  return {
    id: data.id,
    name: data.name,
    types: data.types,
    abilities: data.abilities,
    stats: data.stats,
    base_experience: data.base_experience,
    weight: data.weight,
    height: data.height,
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
    (pokemon) => getID(pokemon.pokemon_species.url) === slug
  );
  const isMale = male.data.pokemon_species_details.some(
    (pokemon) => getID(pokemon.pokemon_species.url) === slug
  );

  return { isFemale, isMale };
};

export const getPokemonAbilities = async (slug: number) => {
  const { abilities } = await getBasePokemonData(slug);
  return abilities;
};

export const getAllPokemonAbilities = async () => {
  const { data } = await api.get<PokemonsAbilities>(
    "https://pokeapi.co/api/v2/ability?offset=0&limit=99999"
  );
  return data.results;
};

export const getPokemonDamageRelations = async (slug: number) => {
  const { types } = await getBasePokemonData(slug);

  return Promise.all(
    types.map(async (type) => {
      const { data } = await api.get<PokemonsTypes>(type.type.url);
      return data;
    })
  );
};

export const getPokemonWeakness = async (slug: number) => {
  const [damageRelations, abilities] = await Promise.all([
    getPokemonDamageRelations(slug),
    getPokemonAbilities(slug),
  ]);

  const lessDamage: PokemonPosibleTypes[] = [];
  const moreDamage: PokemonPosibleTypes[] = [];

  abilities.forEach((ability) => {
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

export const getEvolutions = async (slug: number) => {
  const { evolution_chain } = await getPokemonSpecie(slug);
  const {
    data: { chain },
  } = await api.get<PokemonChain>(evolution_chain.url);

  const formatResult = (evolution: Chain) => {
    const name = evolution.species.name;
    const id = getID(evolution.species.url);
    const level = evolution.evolves_to[0]?.evolution_details[0]?.min_level || 0;

    return {
      name,
      id,
      level,
    };
  };

  const evolutions: ReturnType<typeof formatResult>[][] = [];
  let currentEvolution = chain.evolves_to;
  if (currentEvolution) {
    evolutions.push([formatResult(chain)]);
  }

  while (currentEvolution?.length > 0) {
    evolutions.push(currentEvolution.map(formatResult));
    currentEvolution = currentEvolution[0]?.evolves_to || null;
  }

  return evolutions;
};

export const getNextAndPrevPokemonData = async (slug: number) => {
  const prevID = slug - 1 < 1 ? MAXPOKEMONSRENDERED : slug - 1;
  const nextID = slug + 1 > MAXPOKEMONSRENDERED ? 1 : slug + 1;

  const [prevPokemon, nextPokemon] = await Promise.all([
    getBasePokemonData(prevID),
    getBasePokemonData(nextID),
  ]);

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

export const getAllPokemonData = async (slug: number) => {
  const [baseData, gender, weakness, adjacent_pokemons, specie, evolution] =
    await Promise.all([
      getBasePokemonData(slug),
      getPokemonGenders(slug),
      getPokemonWeakness(slug),
      getNextAndPrevPokemonData(slug),
      getPokemonSpecie(slug),
      getEvolutions(slug),
    ]);

  const entry =
    specie.flavor_text_entries?.find((entry) => entry.language.name === "en")
      ?.flavor_text || null;

  return {
    ...baseData,
    weakness,
    entry,
    is_legendary: specie.is_legendary,
    gender,
    adjacent_pokemons,
    evolution,
  };
};

export const getLoadPokemonData = async (slug: number) => {
  const [{ id, name, types, abilities, weight, height }, weakness] =
    await Promise.all([getBasePokemonData(slug), getPokemonWeakness(slug)]);

  return {
    id,
    name,
    types,
    abilities,
    weight,
    height,
    weakness,
  };
};

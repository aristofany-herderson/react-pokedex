import { Pokemon, PosibleTypes as PokemonPosibleTypes } from "@/@types/pokemon";
import { Chain, PokemonChain } from "@/@types/pokemon-chain";
import { PokemonSpecies } from "@/@types/pokemon-species";
import { PokemonsAbilities } from "@/@types/pokemons-abilities";
import { PokemonsGender } from "@/@types/pokemons-gender";
import { PokemonsTypes } from "@/@types/pokemons-types";
import { POKEMONSTRENGTHBYABILITY } from "@/utils/pokemons";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE, api } from "./api";

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

export const getBasePokemonData = async (slug: string | number) => {
  const { data } = await api.get<Pokemon>(`pokemon/${slug}`);

  const response = {
    id: data.id,
    name: data.name,
    types: data.types,
    abilities: data.abilities,
    stats: data.stats,
    base_experience: data.base_experience,
    weight: data.weight,
    height: data.height,
  };

  return response;
};

export const getPokemonSpecie = async (slug: number) => {
  const { data } = await api.get<PokemonSpecies>(
    `https://pokeapi.co/api/v2/pokemon-species/${slug}`
  );

  const response = {
    is_legendary: data.is_legendary,
    evolution_chain: data.evolution_chain,
    flavor_text_entries: data.flavor_text_entries,
  };

  return response;
};

export const getPokemonGenders = async (name: string) => {
  const [{ data: femaleData }, { data: maleData }] = await Promise.all([
    api.get<PokemonsGender>(`https://pokeapi.co/api/v2/gender/1`),
    api.get<PokemonsGender>(`https://pokeapi.co/api/v2/gender/2`),
  ]);

  const isFemale =
    femaleData.pokemon_species_details.filter((pokemon) => {
      if (pokemon.pokemon_species.name == name) return pokemon;
    }).length > 0;

  const isMale =
    maleData.pokemon_species_details.filter((pokemon) => {
      if (pokemon.pokemon_species.name == name) return pokemon;
    }).length > 0;

  return { isFemale, isMale };
};

export const getPokemonAbilities = async (slug: number) => {
  const { abilities: response } = await getBasePokemonData(slug);

  return response;
};

export const getAllPokemonAbilities = async () => {
  const { data } = await api.get<PokemonsAbilities>(
    "https://pokeapi.co/api/v2/ability?offset=0&limit=99999"
  );
  const response = data.results;

  return response;
};

export const getPokemonDamageRelations = async (slug: number) => {
  const { types } = await getBasePokemonData(slug);

  const response = await Promise.all(
    types.map(async (type) => {
      const { data } = await api.get<PokemonsTypes>(type.type.url);
      return data;
    })
  );

  return response;
};

export const getPokemonWeakness = async (slug: number) => {
  const [damageRelations, abilities] = await Promise.all([
    getPokemonDamageRelations(slug),
    getPokemonAbilities(slug),
  ]);
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

export const getEvolutions = async (slug: number) => {
  const { evolution_chain } = await getPokemonSpecie(slug);
  const {
    data: { chain },
  } = await api.get<PokemonChain>(evolution_chain.url);

  const formatResult = (evolution: Chain) => {
    const name = evolution.species.name;
    const id = Number(
      evolution.species.url
        .split("https://pokeapi.co/api/v2/pokemon-species/")[1]
        .slice(0, -1)
    );
    const level = evolution.evolves_to[0]?.evolution_details[0]?.min_level || 0;

    return {
      name,
      id,
      level,
    };
  };
  const evolutions = [];
  let currentEvolution = chain.evolves_to[0];
  evolutions.push(formatResult(chain));

  while (currentEvolution) {
    evolutions.push(formatResult(currentEvolution));
    currentEvolution = currentEvolution.evolves_to[0];
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

export const getAllPokemonData = async (name: string) => {
  const pokemonBaseData = await getBasePokemonData(name);

  const [
    weakness,
    gender,
    adjacent_pokemons,
    { flavor_text_entries, is_legendary },
    evolution,
  ] = await Promise.all([
    getPokemonWeakness(pokemonBaseData.id),
    getPokemonGenders(pokemonBaseData.name),
    getNextAndPrevPokemonData(pokemonBaseData.id),
    getPokemonSpecie(pokemonBaseData.id),
    getEvolutions(pokemonBaseData.id),
  ]);

  const entry =
    flavor_text_entries?.filter((entry) => {
      if (entry.language.name == "en") return entry;
    })[0]?.flavor_text || null;

  return {
    ...pokemonBaseData,
    weakness,
    entry,
    is_legendary,
    gender,
    adjacent_pokemons,
    evolution,
  };
};

export const getLoadPokemonData = async (slug: number) => {
  const [pokemonBaseData, pokemonWeakness] = await Promise.all([
    getBasePokemonData(slug),
    getPokemonWeakness(slug),
  ]);

  return {
    id: pokemonBaseData.id,
    name: pokemonBaseData.name,
    types: pokemonBaseData.types,
    abilities: pokemonBaseData.abilities,
    weight: pokemonBaseData.weight,
    height: pokemonBaseData.height,
    weakness: pokemonWeakness,
  };
};

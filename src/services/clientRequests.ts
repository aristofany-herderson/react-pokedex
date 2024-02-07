import { PokemonProps } from "@/@types/PokemonProps";
import { api } from "./api";
import { PokemonSpecieProps } from "@/@types/PokemonSpecieProps";
import { PokemonGenderProps } from "@/@types/PokemonGenderProps";
import {
  PokemonAdvancedTypeProps,
  PokemonTypeNameProps,
} from "@/@types/PokemonTypeProps";

export const getPokemonByNameOrID = async (id: string | number) => {
  const pokemon = await api.get<PokemonProps>(`pokemon/${id}`);
  const reponse = pokemon.data;

  return reponse;
};

export const getPokemonEntry = async (id: string | number) => {
  const pokemonSpecie = await api.get<PokemonSpecieProps>(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  const response = pokemonSpecie.data.flavor_text_entries.filter((entry) => {
    if (entry.language.name == "en") {
      return entry;
    }
  })[0].flavor_text;

  return response;
};

export const getPokemonGenderProps = async (name: string) => {
  const female = await api.get<PokemonGenderProps>(
    `https://pokeapi.co/api/v2/gender/1`
  );
  const male = await api.get<PokemonGenderProps>(
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

  return { isFemale, isMale };
};

export const getPokemonDamageRelations = async (name: string) => {
  const damageRelations = (await getPokemonByNameOrID(name)).types.map(
    async (type) => {
      const { data } = await api.get<PokemonAdvancedTypeProps>(type.type.url);
      return data;
    }
  );

  return await Promise.all(damageRelations);
};

export const getPokemonWeakness = async (name: string) => {
  const damageRelations = await getPokemonDamageRelations(name);

  const lessDamage: PokemonTypeNameProps[] = [];
  const moreDamage: PokemonTypeNameProps[] = [];

  damageRelations.map((relation) => {
      const relationsWeakness = relation.damage_relations.double_damage_from
      const relationsImmunity = relation.damage_relations.no_damage_from;
      const relationsHalf = relation.damage_relations.half_damage_from;

      relationsWeakness.forEach((immunity) => {
        moreDamage.push(immunity.name);
      });

      relationsImmunity.forEach((immunity) => {
        lessDamage.push(immunity.name);
      });
      relationsHalf.forEach((half) => {
        lessDamage.push(half.name);
      });
  });

  const repeatedWeakness = moreDamage.filter(
    (weak) => !lessDamage.includes(weak)
  );
  const weakness = repeatedWeakness.filter(
    (item, pos) => repeatedWeakness.indexOf(item) === pos
  );
  return weakness;
};

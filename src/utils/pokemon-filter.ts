import { AsyncReturnType } from "@/@types/async-return-type";
import { PokemonPosibleTypes } from "@/@types/pokemon";
import { MAXPOKEMONSRENDERED } from "@/services/api";
import { getLoadPokemonData } from "@/services/client-requests";
import { useQueryState } from "nuqs";
import { SELECTPOKEMONHEIGHTS, SELECTPOKEMONWEIGHTS } from "./pokemons";

export const filter = (
  pokemons: AsyncReturnType<typeof getLoadPokemonData>[]
) => {
  const [search] = useQueryState("search");
  const [from] = useQueryState("from");
  const [to] = useQueryState("to");
  const [type] = useQueryState("type");
  const [weakness] = useQueryState("weakness");
  const [ability] = useQueryState("ability");
  const [weight] = useQueryState("weight");
  const [height] = useQueryState("height");

  return pokemons
    .filter((pokemon) => {
      if (search?.trim() == "" || search == undefined || search == null) {
        return pokemon;
      } else if (pokemon.name.toLowerCase().includes(search?.toLowerCase())) {
        return pokemon;
      }
    })
    .filter((pokemon) => {
      const fromVerification =
        from?.trim() != "" && from != null
          ? pokemon.id >= Number(from)
          : pokemon.id >= 0;
      const toVerification =
        to?.trim() != "" && to != null
          ? pokemon.id <= Number(to)
          : pokemon.id <= MAXPOKEMONSRENDERED;
      if (fromVerification && toVerification) {
        return pokemon;
      }

      if (
        from == "" ||
        from == null ||
        from == undefined ||
        to == "" ||
        to == null ||
        to == undefined
      ) {
        return pokemon;
      }
    })
    .filter((pokemon) => {
      const types = pokemon.types.map((type) => type.type.name.toLowerCase());
      const currentType = type as PokemonPosibleTypes;

      if (type != null && types.includes(currentType.toLowerCase())) {
        return pokemon;
      }

      if (type == "" || type == null || type == undefined) {
        return pokemon;
      }
    })
    .filter((pokemon) => {
      const abilityList = pokemon.abilities.map((ability) =>
        ability.ability.name.toLowerCase()
      );
      const currentAbility = ability as string;

      if (
        ability != null &&
        abilityList.includes(currentAbility.toLowerCase())
      ) {
        return pokemon;
      }

      if (ability == "" || ability == null || ability == undefined) {
        return pokemon;
      }
    })
    .filter((pokemon) => {
      const currentWeight = weight as unknown as number;
      const pokemonWeight = pokemon.weight / 10;

      const minVerification =
        (currentWeight != null ||
          currentWeight != undefined ||
          currentWeight == "") &&
        SELECTPOKEMONWEIGHTS[currentWeight]?.values?.min < pokemonWeight;

      const maxVerification =
        (currentWeight != null ||
          currentWeight != undefined ||
          currentWeight == "") &&
        SELECTPOKEMONWEIGHTS[currentWeight]?.values?.max >= pokemonWeight;
      if (minVerification && maxVerification) {
        return pokemon;
      }

      if (
        currentWeight == null ||
        currentWeight == undefined ||
        String(currentWeight).trim() == ""
      ) {
        return pokemon;
      }
    })
    .filter((pokemon) => {
      const currentHeight = height as unknown as number;
      const pokemonHeight = pokemon.height / 10;

      console.log(currentHeight);

      const minVerification =
        (currentHeight != null ||
          currentHeight != undefined ||
          currentHeight == "") &&
        SELECTPOKEMONHEIGHTS[currentHeight]?.values?.min < pokemonHeight;

      const maxVerification =
        (currentHeight != null ||
          currentHeight != undefined ||
          currentHeight == "") &&
        SELECTPOKEMONHEIGHTS[currentHeight]?.values?.max >= pokemonHeight;
      if (minVerification && maxVerification) {
        return pokemon;
      }

      if (
        currentHeight == null ||
        currentHeight == undefined ||
        String(currentHeight).trim() == ""
      ) {
        return pokemon;
      }
    });
};

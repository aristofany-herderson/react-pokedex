import {
  createParser,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

const parseAsPossiblePokemonTypes = createParser({
  parse(queryValue) {
    const isValid = queryValue || null;
    return isValid;
  },
  serialize(value) {
    return value;
  },
});

export const usePokemonQueryParams = () => {
  const [pokemon, setPokemon] = useQueryState(
    "pokemon",
    parseAsInteger.withOptions({
      clearOnDefault: true,
    })
  );
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withOptions({
      clearOnDefault: true,
    })
  );
  const [order, setOrder] = useQueryState(
    "order",
    parseAsString.withOptions({
      clearOnDefault: true,
    })
  );
  const [from, setFrom] = useQueryState(
    "from",
    parseAsInteger.withOptions({
      clearOnDefault: true,
    })
  );
  const [to, setTo] = useQueryState(
    "to",
    parseAsInteger.withOptions({
      clearOnDefault: true,
    })
  );
  const [type, setType] = useQueryState(
    "type",
    parseAsPossiblePokemonTypes.withOptions({
      clearOnDefault: true,
    })
  );
  const [weakness, setWeakness] = useQueryState(
    "weakness",
    parseAsPossiblePokemonTypes.withOptions({
      clearOnDefault: true,
    })
  );
  const [ability, setAbility] = useQueryState(
    "ability",
    parseAsString.withOptions({
      clearOnDefault: true,
    })
  );
  const [weight, setWeight] = useQueryState(
    "weight",
    parseAsInteger.withOptions({
      clearOnDefault: true,
    })
  );
  const [height, setHeight] = useQueryState(
    "height",
    parseAsInteger.withOptions({
      clearOnDefault: true,
    })
  );

  return {
    pokemon,
    setPokemon,
    order,
    setOrder,
    search,
    setSearch,
    from,
    setFrom,
    to,
    setTo,
    weakness,
    setWeakness,
    ability,
    setAbility,
    weight,
    setWeight,
    height,
    setHeight,
    type,
    setType,
  };
};

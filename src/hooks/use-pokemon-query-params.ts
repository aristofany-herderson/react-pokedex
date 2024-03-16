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
  const [pokemon, setPokemon] = useQueryState("pokemon", parseAsInteger);
  const [search, setSearch] = useQueryState("search", parseAsString);
  const [order, setOrder] = useQueryState("order", parseAsString);
  const [from, setFrom] = useQueryState("from", parseAsInteger);
  const [to, setTo] = useQueryState("to", parseAsInteger);
  const [type, setType] = useQueryState("type", parseAsPossiblePokemonTypes);
  const [weakness, setWeakness] = useQueryState(
    "weakness",
    parseAsPossiblePokemonTypes
  );
  const [ability, setAbility] = useQueryState("ability", parseAsString);
  const [weight, setWeight] = useQueryState("weight", parseAsInteger);
  const [height, setHeight] = useQueryState("height", parseAsInteger);

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

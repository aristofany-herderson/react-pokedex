import {
  useQueryState,
  createParser,
  parseAsInteger,
  parseAsString,
} from "nuqs";

const parseAsPosiblePokemonTypes = createParser({
  parse(queryValue) {
    const value = queryValue as string | null;
    const isValid = value || null;
    return isValid;
  },
  serialize(value) {
    return value;
  },
});

export const usePokemonQueryParams = () => {
  const [pokemon, setPokemon] = useQueryState("pokemon", parseAsString);
  const [search, setSearch] = useQueryState("search", parseAsString);
  const [from, setFrom] = useQueryState("from", parseAsInteger);
  const [to, setTo] = useQueryState("to", parseAsInteger);
  const [type, setType] = useQueryState("type", parseAsPosiblePokemonTypes);
  const [weakness, setWeakness] = useQueryState(
    "weakness",
    parseAsPosiblePokemonTypes
  );
  const [ability, setAbility] = useQueryState("ability", parseAsString);
  const [weight, setWeight] = useQueryState("weight", parseAsInteger);
  const [height, setHeight] = useQueryState("height", parseAsInteger);

  return {
    pokemon,
    setPokemon,
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
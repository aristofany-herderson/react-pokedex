export const getIdInSpeciesUrl = (slug: string) => {
  return Number(
    slug.split("https://pokeapi.co/api/v2/pokemon-species/")[1].slice(0, -1)
  );
};

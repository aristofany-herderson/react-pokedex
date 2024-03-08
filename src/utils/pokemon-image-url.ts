import { BASEHYBRIDSHIVAMIMAGEURL, BASEPOKEAPIIMAGEURL } from "@/services/api";
import { padID } from "./pokemon-pad-id";

const POKEMONIMAGESBYHYBRIDSHIVAM = 905;

export const pokemonImageURL = (id: number) => {
  const paddedID = padID(id);
  const url =
    id <= POKEMONIMAGESBYHYBRIDSHIVAM
      ? `${BASEHYBRIDSHIVAMIMAGEURL}${paddedID}.png`
      : `${BASEPOKEAPIIMAGEURL}${id}.png`;

  return url;
};

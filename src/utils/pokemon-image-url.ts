import { BASEHYBRIDSHIVAMIMAGEURL, BASEPOKEAPIIMAGEURL } from "@/services/api";
import { padId } from "./pad-id";

const POKEMONIMAGESBYHYBRIDSHIVAM = 905;

export const pokemonImageURL = (id: number) => {
  const paddedID = padId(id);
  const url =
    id <= POKEMONIMAGESBYHYBRIDSHIVAM
      ? `${BASEHYBRIDSHIVAMIMAGEURL}${paddedID}.png`
      : `${BASEPOKEAPIIMAGEURL}${id}.png`;

  return url;
};

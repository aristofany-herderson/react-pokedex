import { BASEHYBRIDSHIVAMIMAGEURL, BASEPOKEAPIIMAGEURL } from "@/services/api";

const POKEMONIMAGESBYHYBRIDSHIVAM = 905;

export const pokemonImageURL = (id: number) => {
  const paddedID = String(id).padStart(3, "0");
  const url =
    id <= POKEMONIMAGESBYHYBRIDSHIVAM
      ? `${BASEHYBRIDSHIVAMIMAGEURL}${paddedID}.png`
      : `${BASEPOKEAPIIMAGEURL}${id}.png`;

  return url;
};

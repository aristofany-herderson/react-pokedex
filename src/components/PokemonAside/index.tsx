import { baseImageUrl } from "@/services/api";
import { PokemonTypeColors } from "@/utils/colors";
import Image from "next/image";
import styles from "./styles.module.scss";

export const PokemonAside = () => {
  return (
    <>
      <div className={styles.figure}>
        <Image
          width={120}
          height={120}
          src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/025.png`}
          alt={"Pikachu"}
        />
      </div>
      <span className={styles.id}>nº 025</span>
      <h2 className={styles.name}>Pikachu</h2>
      <div className={styles.types}>
        <p>WATER</p>
      </div>
    </>
  );
};

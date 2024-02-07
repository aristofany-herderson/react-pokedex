"use client";
import Image from "next/image";
import styles from "./styles.module.scss";

export const PokemonSearch = () => {
  return (
    <div className={styles.input}>
      <input type="text" placeholder="Search your pokemon!" max={50} />
      <button>
        <Image
          width={20}
          height={20}
          src="/icons/pokeball.svg"
          alt="Pokeball icon"
        />
      </button>
    </div>
  );
};

"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { MAXPOKEMONSRENDERED } from "@/services/api";
import { useQueryState } from "nuqs";

export const PokemonControllers = () => {
  const [from, setFrom] = useQueryState("from");
  const [to, setTo] = useQueryState("to");

  return (
    <>
      <div className={styles.search}>
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
      <div className={styles.listAttributes}>
        <div></div>
        <div className={styles.idLimit}>
          <label htmlFor="from">from</label>
          <input
            value={from || ""}
            onChange={(e) => setFrom(e.target.value)}
            min={1}
            max={MAXPOKEMONSRENDERED}
            type="number"
            name="from"
            id="from"
          />
          <label htmlFor="to">to</label>
          <input
            value={to || ""}
            onChange={(e) => setTo(e.target.value)}
            min={1}
            max={MAXPOKEMONSRENDERED}
            type="number"
            name="to"
            id="to"
          />
        </div>
      </div>
    </>
  );
};

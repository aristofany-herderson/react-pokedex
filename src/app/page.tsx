import { PokemonSearch } from "@/components/PokemonSearch";
import { PokemonsLoad } from "@/components/PokemonsLoad";
import styles from "@/styles/pages/home.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.main}>
        <PokemonSearch />
        <PokemonsLoad />
      </main>
      <aside className={styles.aside}>
        <div className={styles.noSelected}>
          <Image width={20} height={20} src="/icons/info-circle.svg" alt="Info icon"/>
          <p>No pokemon selected yet</p>
        </div>
      </aside>
    </div>
  );
}

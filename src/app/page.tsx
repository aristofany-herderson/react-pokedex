import { PokemonAside } from "@/components/pokemon-aside";
import { PokemonFilters } from "@/components/pokemon-filters";
import { PokemonsLoad } from "@/components/pokemons-load";
import styles from "@/styles/pages/home.module.scss";


export default function Home() {
  return (
    <>
    <div className={styles.appWrapper}>
      <main className={styles.main}>
        <PokemonFilters />
        <PokemonsLoad />
      </main>
      <aside className={styles.aside}>
        <PokemonAside />
      </aside>
    </div>
    </>
  );
}

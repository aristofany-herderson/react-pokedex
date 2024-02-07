import { PokemonAside } from "@/components/PokemonAside";
import { PokemonControllers } from "@/components/PokemonControllers";
import { PokemonsLoad } from "@/components/PokemonsLoad";
import styles from "@/styles/pages/home.module.scss";

export default function Home() {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.main}>
        <PokemonControllers />
        <PokemonsLoad />
      </main>
      <aside className={styles.aside}>
        <PokemonAside />
      </aside>
    </div>
  );
}

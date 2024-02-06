import { PokemonAside, PokemonAsideSkeleton } from "@/components/PokemonAside";
import { PokemonSearch } from "@/components/PokemonSearch";
import { PokemonsLoad } from "@/components/PokemonsLoad";
import styles from "@/styles/pages/home.module.scss";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.main}>
        <PokemonSearch />
        <PokemonsLoad />
      </main>
      <aside className={styles.aside}>
        <Suspense fallback={<PokemonAsideSkeleton />}>
          <PokemonAside />
        </Suspense>
      </aside>
    </div>
  );
}

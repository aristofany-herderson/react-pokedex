import {
  PokemonAside,
  PokemonAsideSkeleton,
  NoSelected,
} from "@/components/PokemonAside";
import { PokemonSearch } from "@/components/PokemonSearch";
import { PokemonsLoad } from "@/components/PokemonsLoad";
import styles from "@/styles/pages/home.module.scss";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const selectedPokemon = searchParams?.selected?.toString();

  return (
    <div className={styles.appWrapper}>
      <main className={styles.main}>
        <PokemonSearch />
        <PokemonsLoad />
      </main>
      <aside className={styles.aside}>
        <PokemonAside selectedPokemon={selectedPokemon} />
      </aside>
    </div>
  );
}

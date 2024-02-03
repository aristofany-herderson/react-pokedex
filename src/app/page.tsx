import { PokemonCard } from "@/components/PokemonCard";
import { PokemonCardSkeleton } from "@/components/PokemonsCardSkeleton";
import styles from '@/styles/pages/home.module.scss'
import { shuffle } from "@/utils/shuffle";
import { Suspense } from "react";

const POKEMONSLENGTH = 99;
const pokemonsQuantity = Array.from(
  { length: POKEMONSLENGTH },
  (_, i) => i + 1
);

export default function Home() {
  return (
    <main className={styles.main}>
      {shuffle(pokemonsQuantity).map((id) => {
        return (
          <Suspense fallback={<PokemonCardSkeleton />}>
            <PokemonCard id={id}></PokemonCard>
          </Suspense>
        );
      })}
    </main>
  );
}

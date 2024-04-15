import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InfoCircleIcon } from "@/components/ui/icons/info-circle-icon";
import { QuestionCircleIcon } from "@/components/ui/icons/question-circle-icon";
import Link from "next/link";
import styles from "./no-pokemon-selected.module.scss";

export const NoPokemonSelected = () => {
  return (
    <div className={styles.noSelected}>
      <div className={styles.info}>
        <InfoCircleIcon />
        <p>Select Pokemon to view details</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className={styles.copyright}>
            <QuestionCircleIcon width={16} height={16} />
            Copyright
          </button>
        </DialogTrigger>
        <DialogContent className={styles.content}>
          <h2>🕹️ Credits</h2>
          <p>
            Thanks to <Link href={"https://pokeapi.co/"}>PokéAPI.co</Link> for
            data, of course to Nintendo, Game Freak, and The Pokémon Company for
            making such an awesome series of games.
          </p>
          <h2>📰 Copyright Notice</h2>
          <p>
            This is an unofficial, non-commercial, fan-made app and is NOT
            affiliated, endorsed or supported by Nintendo, Game Freak and The
            Pokémon Company in any way. Many images used in this app are
            copyrighted and are supported under fair use. Pokémon and Pokémon
            character names are trademarks of Nintendo. No copyright
            infringement intended.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

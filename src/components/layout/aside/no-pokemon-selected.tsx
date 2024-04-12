import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoCircleIcon } from "@/components/ui/icons/info-circle-icon";
import { QuestionCircleIcon } from "@/components/ui/icons/question-circle-icon";
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
        <DialogContent>
          <DialogTitle>🕹️ Credits</DialogTitle>
          <DialogDescription>
            Thanks to PokéAPI.co, Bulbapedia for the images, duiker101 for the
            type icons and of course to Nintendo, Game Freak, and The Pokémon
            Company for making such an awesome series of games.
          </DialogDescription>
          <DialogTitle>📰 Copyright Notice</DialogTitle>
          <DialogDescription>
            This is an unofficial, non-commercial, fan-made app and is NOT
            affiliated, endorsed or supported by Nintendo, Game Freak and The
            Pokémon Company in any way. Many images used in this app are
            copyrighted and are supported under fair use. Pokémon and Pokémon
            character names are trademarks of Nintendo. No copyright
            infringement intended.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import { PokeballIcon } from "@/components/ui/icons/pokeball-icon";
import styles from "@/styles/loading.module.scss";

export default function LoadingPage() {
  return (
    <div className={styles.loading}>
      <PokeballIcon width={80} height={80} />
      <p>Loading...</p>
    </div>
  );
}

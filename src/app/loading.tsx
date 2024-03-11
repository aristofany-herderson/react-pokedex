import styles from "@/styles/pages/loading.module.scss";
import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className={styles.loading}>
      <Image
        priority
        width={100}
        height={100}
        src="/icons/pokeball.svg"
        alt="Image of pokeball (loading image)"
      />
      <p>Loading...</p>
    </div>
  );
}

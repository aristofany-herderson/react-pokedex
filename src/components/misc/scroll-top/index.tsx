"use client";
import { ArrowUpIcon } from "@/components/ui/icons/arrow-up-icon";
import { useWindowScroll } from "@uidotdev/usehooks";
import classNames from "classnames";
import styles from "./styles.module.scss";

export const ScrollTop = () => {
  const [{ y }, scrollTo] = useWindowScroll();

  const scrollToTop = () => {
    scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={classNames(styles.scrollTop, (y && y >= 600) && styles.visible)}
    >
      <ArrowUpIcon width={15} height={15} />
    </button>
  );
};

"use client";
import { ArrowUpIcon } from "@/components/ui/icons/arrow-up-icon";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
        return;
      }

      setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => {
        scrollToTop();
      }}
      className={classNames(styles.scrollTop, isVisible && styles.visible)}
    >
      <ArrowUpIcon width={15} height={15} />
    </button>
  );
};

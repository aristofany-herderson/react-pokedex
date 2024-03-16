"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

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
      <Image
        width={15}
        height={15}
        src={"/icons/arrow-up.svg"}
        alt="Scroll Top Icon"
      />
    </button>
  );
};

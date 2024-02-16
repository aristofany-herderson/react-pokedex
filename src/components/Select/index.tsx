import { ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import styles from "./styles.module.scss";
import Image from "next/image";
import { POKEMONSLEVELS, POKEMONTYPECOLORS } from "@/utils/pokemons";

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
  placeholder?: ReactNode;
  ariaLabel: string;
};

export const Select = ({
  ariaLabel,
  children,
  placeholder,
  ...props
}: SelectProps) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        className={styles.trigger}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <Image
            className={styles.triggerIcon}
            width={12}
            height={12}
            src={"/icons/chevron-down.svg"}
            alt="Open select icon"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={styles.content}>
          <SelectPrimitive.ScrollUpButton className={styles.scrollTopButton}>
            <Image
              width={12}
              height={12}
              src={"/icons/chevron-up.svg"}
              alt="Scroll top select icon (chevron)"
            />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className={styles.scrollDownButton}>
            <Image
              width={12}
              height={12}
              src={"/icons/chevron-down.svg"}
              alt="Scroll down select icon (chevron)"
            />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export type SelectItemPokemonTypeProps = React.ComponentProps<
  typeof SelectPrimitive.Item
> & {
  type: string;
};

export const SelectItemPokemonType = ({
  children,
  type,
  ...props
}: SelectItemPokemonTypeProps) => {
  const colors = (POKEMONTYPECOLORS as any)[type];

  return (
    <SelectPrimitive.Item
      className={styles.item}
      style={{ width: "100%" }}
      {...props}
    >
      <SelectPrimitive.ItemText asChild>
        <div className={styles.itemWrapper}>
          <span className={styles.span} style={{ background: colors.medium }}>
            <Image
              width={12}
              height={12}
              src={`/icons/pokemon/${type}.svg`}
              alt={`Pokemon ${type} type icon`}
            />
          </span>
          <p style={{ color: colors.medium }}>{children}</p>
        </div>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator></SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

export type SelectItemPokemonNumberProps = React.ComponentProps<
  typeof SelectPrimitive.Item
> & {
  level: 1 | 2 | 3 | 4 | 5;
};

export const SelectItemPokemonNumber = ({
  children,
  level,
  ...props
}: SelectItemPokemonNumberProps) => {
  return (
    <SelectPrimitive.Item
      className={styles.item}
      style={{ width: "100%" }}
      {...props}
    >
      <SelectPrimitive.ItemText asChild>
        <div className={styles.itemWrapper}>
          <span
            className={styles.span}
            style={{ background: POKEMONSLEVELS[level].color }}
          >
            <Image
              width={12}
              height={12}
              src={`/icons/sort-descending.svg`}
              alt="icon"
            />
          </span>
          <p style={{ color: "var(--colors-gray-600)" }}>{children}</p>
        </div>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator></SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

export type SelectItemPokemonAbilityProps = React.ComponentProps<
  typeof SelectPrimitive.Item
>;

export const SelectItemPokemonAbility = ({
  children,
  ...props
}: SelectItemPokemonAbilityProps) => {
  return (
    <SelectPrimitive.Item
      className={styles.item}
      style={{ width: "100%" }}
      {...props}
    >
      <SelectPrimitive.ItemText asChild>
        <div className={styles.itemWrapper}>
          <span
            className={styles.span}
            style={{ background: "var(--colors-yellow)" }}
          >
            <Image width={12} height={12} src={`/icons/star.svg`} alt="icon" />
          </span>
          <p style={{ color: "var(--colors-gray-600)" }}>{children}</p>
        </div>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator></SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

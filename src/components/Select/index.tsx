"use client";
import { PokemonPosibleTypes } from "@/@types/pokemon";
import Image, { ImageProps } from "next/image";
import SelectComponent, {
  ContainerProps,
  GroupBase,
  NoticeProps,
  SingleValueProps,
} from "react-select";
import {
  Props as SelectComponentProps,
  ControlProps,
  MultiValueProps,
  ValueContainerProps,
  MenuListProps,
  MenuProps,
  OptionProps,
} from "react-select";
import styles from "./styles.module.scss";
import { POKEMONSSELECTLEVELS, POKEMONTYPECOLORS } from "@/utils/pokemons";
import { useEffect, useState } from "react";
import { SelectePokemonNumber } from "@/utils/pokemons";

export type SelectValueData = {
  value: string;
  label: string;
};

type SelectPlaceholderProps = {
  label: string;
  icon: ImageProps;
};

type SelectProps = SelectComponentProps & {
  optionType?: "type" | "number" | "ability";
};

export const Select = ({
  isClearable = true,
  classNames,
  components,
  optionType = "type",
  ...props
}: SelectProps) => {
  const POSIBLEOPTIONTYPE = {
    type: TypeOption,
    number: NumberOption,
    ability: AbilityOption,
  };
  const POSIBLESINGLEVALUE = {
    type: undefined,
    number: NumberSingleValue,
    ability: AbilitySingleValue,
  };

  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <SelectComponent
      id={id}
      isClearable={isClearable}
      components={{
        SelectContainer,
        Control,
        IndicatorSeparator: null,
        ValueContainer,
        Menu,
        MenuList,
        MultiValue,
        Option: POSIBLEOPTIONTYPE[optionType],
        NoOptionsMessage,
        SingleValue: POSIBLESINGLEVALUE[optionType],
      }}
      {...props}
    />
  ) : (
    <SelectSkeleton />
  );
};

export const SelectPlaceholder = ({
  label,
  icon: { alt = "placeholder image", ...props },
}: SelectPlaceholderProps) => {
  return (
    <div className={styles.placeholder}>
      <Image {...props} alt={alt} />
      <p>{label}</p>
    </div>
  );
};

const SelectContainer = ({
  children,
  isFocused,
  innerProps,
}: ContainerProps) => {
  return (
    <div
      className={!isFocused ? styles.container : styles.containerFocus}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const Control = ({
  children,
  isFocused,
  innerProps,
  innerRef,
}: ControlProps) => {
  return (
    <div
      ref={innerRef}
      className={!isFocused ? styles.trigger : styles.triggerFocus}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const ValueContainer = ({ children, innerProps }: ValueContainerProps) => {
  return <div className={styles.valueContainer} {...innerProps}>{children}</div>;
};

const Menu = ({ children, innerProps, innerRef }: MenuProps) => {
  return (
    <div className={styles.menu} ref={innerRef} {...innerProps}>
      {children}
    </div>
  );
};

const MenuList = ({ children, innerProps, innerRef }: MenuListProps) => {
  return (
    <div className={styles.menuWrapper} ref={innerRef} {...innerProps}>
      {children}
    </div>
  );
};

const MultiValue = ({ data, innerProps, children }: MultiValueProps) => {
  const currentData = data as SelectValueData;
  const currentDataValue = currentData.value as PokemonPosibleTypes;
  const colors = POKEMONTYPECOLORS[currentDataValue];

  return (
    <div className={styles.value} {...innerProps}>
      <span style={{ background: colors.medium }}>
        <Image
          width={10}
          height={10}
          src={`/icons/pokemon/${currentData.value}.svg`}
          alt={currentData.value}
        />
      </span>
      <p style={{ color: colors.medium }}>{currentData.label}</p>
    </div>
  );
};

const AbilitySingleValue = ({
  data,
  innerProps,
  children,
}: SingleValueProps) => {
  const currentData = data as SelectValueData;

  return (
    <div className={styles.value} {...innerProps}>
      <span style={{ background: "var(--colors-yellow)" }}>
        <Image
          width={10}
          height={10}
          src={`/icons/star.svg`}
          alt={currentData.value}
        />
      </span>
      <p>{currentData.label}</p>
    </div>
  );
};

const NumberSingleValue = ({
  data,
  innerProps,
  children,
}: SingleValueProps) => {
  const currentData = data as SelectePokemonNumber;
  const color = POKEMONSSELECTLEVELS[currentData.value].color;

  return (
    <div className={styles.value} {...innerProps}>
      <span style={{ background: color }}>
        <Image
          width={10}
          height={10}
          src={`/icons/sort-descending.svg`}
          alt={currentData.value}
        />
      </span>
      <p>{currentData.label}</p>
    </div>
  );
};

const TypeOption = ({ data, isFocused, innerRef, innerProps }: OptionProps) => {
  const currentData = data as SelectValueData;
  const currentDataValue = currentData.value as PokemonPosibleTypes;
  const colors = POKEMONTYPECOLORS[currentDataValue];

  return (
    <div
      className={!isFocused ? styles.option : styles.optionFocus}
      style={{ "--outline-color": colors.medium } as React.CSSProperties}
      ref={innerRef}
      {...innerProps}
    >
      <span style={{ background: colors.medium }}>
        <Image
          width={10}
          height={10}
          src={`/icons/pokemon/${currentData.value}.svg`}
          alt={currentData.value}
        />
      </span>
      <p style={{ color: colors.medium }}>{currentData.label}</p>
    </div>
  );
};

const AbilityOption = ({
  data,
  isFocused,
  innerRef,
  innerProps,
}: OptionProps) => {
  const currentData = data as SelectValueData;

  return (
    <div
      className={
        !isFocused
          ? `${styles.option} ${styles.optionAbility}`
          : `${styles.optionFocus} ${styles.optionFocusAbility}`
      }
      ref={innerRef}
      {...innerProps}
    >
      <span style={{ background: "var(--colors-yellow)" }}>
        <Image
          width={10}
          height={10}
          src={`/icons/star.svg`}
          alt={currentData.value}
        />
      </span>
      <p>{currentData.label}</p>
    </div>
  );
};

const NumberOption = ({
  data,
  isFocused,
  innerRef,
  innerProps,
}: OptionProps) => {
  const currentData = data as SelectePokemonNumber;
  const color = POKEMONSSELECTLEVELS[currentData.value].color;

  return (
    <div
      className={
        !isFocused
          ? `${styles.option} ${styles.optionAbility}`
          : `${styles.optionFocus} ${styles.optionFocusAbility}`
      }
      ref={innerRef}
      {...innerProps}
    >
      <span style={{ background: color }}>
        <Image
          width={10}
          height={10}
          src={`/icons/sort-descending.svg`}
          alt={currentData.label}
        />
      </span>
      <p>{currentData.label}</p>
    </div>
  );
};

const NoOptionsMessage = ({ innerProps }: NoticeProps) => {
  return (
    <div className={styles.noOptions} {...innerProps}>
      No options
    </div>
  );
};

const SelectSkeleton = () => {
  return <div className={styles.selectSkeleton} />;
};

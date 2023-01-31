import type { MutableRefObject } from "react";

type ItemHeight<T> = (index: number, data: T) => number;

export type BasicTarget = { current: HTMLElement | null };

export interface Options<T> {
  containerTarget: BasicTarget;
  wrapperTarget: BasicTarget;
  itemHeight: number | ItemHeight<T>;
  overscan?: number;
}

export type Size = { width: number; height: number };

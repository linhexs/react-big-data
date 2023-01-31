import { useEffect, useState } from "react";
import type { BasicTarget, Size } from "@/types/list";
import { useRef } from "react";

const defaultSize: Size = { width: 0, height: 0 };

export const useSize = (containerRef: BasicTarget, initialState?: Size) => {
  const [size, setSize] = useState(initialState || defaultSize);

  useEffect(() => {
    if (containerRef?.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setSize({ width: clientWidth, height: clientHeight });
    }
  }, []);

  return size;
};

export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref.current;
}
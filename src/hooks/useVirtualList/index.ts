import { useEffect, useMemo, useState, CSSProperties } from "react";
import type { Options } from "@/types/list";
import { isNumber } from "@/utils/util";
import { useSize, useLatest } from "../useUtils/util";

export const useVirtualList = <T = any>(list: T[], options: Options<T>) => {
  const { containerTarget, wrapperTarget, itemHeight, overscan = 5 } = options;
  const { width, height } = useSize(containerTarget);
  const itemHeightRef = useLatest(itemHeight);
  const [wrapperStyle, setWrapperStyle] = useState<CSSProperties>({});
  const [targetList, setTargetList] = useState<{ index: number; data: T }[]>(
    []
  );

  /**
   * 计算对于container偏移量
   * @param scrollTop
   * @returns
   */
  const getOffset = (scrollTop: number) => {
    if (isNumber(itemHeightRef)) {
      return Math.floor(scrollTop / itemHeightRef);
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = itemHeightRef(i, list[i]);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };

  /**
   * 计算可视数量
   * @param containerHeight
   * @param fromIndex
   * @returns
   */
  const getVisibleCount = (containerHeight: number, fromIndex: number) => {
    if (isNumber(itemHeightRef)) {
      return Math.ceil(containerHeight / itemHeightRef);
    }

    let sum = 0;
    let endIndex = 0;
    for (let i = fromIndex; i < list.length; i++) {
      const height = itemHeightRef(i, list[i]);
      sum += height;
      endIndex = i;
      if (sum >= containerHeight) {
        break;
      }
    }
    return endIndex - fromIndex;
  };

  /**
   * 获取距离顶部距离
   * @param index
   * @returns
   */
  const getDistanceTop = (index: number) => {
    if (isNumber(itemHeightRef)) {
      const height = index * itemHeightRef;
      return height;
    }
    const height = list
      .slice(0, index)
      .reduce((sum, _, i) => sum + itemHeightRef(i, list[i]), 0);
    return height;
  };

  // 列表总体高度
  const totalHeight = useMemo(() => {
    if (isNumber(itemHeightRef)) {
      return list.length * itemHeightRef;
    }
    return list.reduce(
      (sum, _, index) => sum + itemHeightRef(index, list[index]),
      0
    );
  }, [list]);

  const calculateRange = () => {
    // 获取外部容器
    const container = containerTarget.current;
    if (container) {
      const { scrollTop, clientHeight } = container;
      const offset = getOffset(scrollTop);
      const visibleCount = getVisibleCount(clientHeight, offset);
      const start = Math.max(0, offset - overscan);
      const end = Math.min(list.length, offset + visibleCount + overscan);
      const offsetTop = getDistanceTop(start);
      // 设置wrapper的高度和偏移量
      setWrapperStyle({
        height: totalHeight - offsetTop + "px",
        marginTop: offsetTop + "px",
      });
      // 设置wrapper展示dom
      setTargetList(
        list.slice(start, end).map((ele, index) => ({
          data: ele,
          index: index + start,
        }))
      );
    }
  };

  const resize = (e: Event) => {
    e.preventDefault();
    calculateRange();
  };

  useEffect(() => {
    const wrapper = wrapperTarget.current;
    if (wrapper) {
      const styles = Object.keys(wrapperStyle) as (keyof CSSProperties)[];
      styles.forEach(
        // @ts-ignore
        (key) => (wrapper.style[key] = wrapperStyle[key])
      );
    }
  }, [wrapperStyle]);

  useEffect(() => {
    if (containerTarget.current) {
      containerTarget.current.addEventListener("scroll", resize);
    }
    return () => {
      containerTarget.current?.removeEventListener("scroll", resize);
    };
  }, []);

  useEffect(() => {
    if (!width || !height) {
      return;
    }
    calculateRange();
  }, [width, height, list]);

  return [targetList] as const;
};

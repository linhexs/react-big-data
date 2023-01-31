import type { Size } from "@/types/list";

export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

/* 获取随机颜色 */
export function getColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ",0.8)";
}

/* 获取随机位置 */
export function getPostion(position: Size) {
  const { width, height } = position;
  return {
    left: Math.ceil(Math.random() * width) + "px",
    top: Math.ceil(Math.random() * height) + "px",
  };
}


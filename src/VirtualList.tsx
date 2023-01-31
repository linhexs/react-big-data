import React, { useMemo, useRef } from "react";
import { useVirtualList } from "./hooks/useVirtualList";

export default () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const originalList = useMemo(() => Array.from(Array(9999).keys()), []);

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    // itemHeight: 60,
    itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
  });

  return (
    <>
      <div
        ref={containerRef}
        style={{ height: "300px", overflow: "auto", border: "1px solid" }}
      >
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: 52,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #e8e8e8",
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

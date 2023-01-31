import React, { useMemo } from "react";

export default () => {
  const originalList = useMemo(() => Array.from(Array(150000).keys()), []);

  return (
    <div>
      {originalList.map((ele) => (
        <div
          style={{
            height: 52,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #e8e8e8",
            marginBottom: 8,
          }}
          key={ele}
        >
          Row: {ele}
        </div>
      ))}
    </div>
  );
};

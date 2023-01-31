import React from "react";
import ReactDOM from "react-dom/client";
import VirtualList from "./VirtualList";
import TimeSlicing from "./TimeSlicing";
// import DefaultDrawing from "./DefaultDrawing";
import DefaultList from "./DefaultList";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    {/* <DefaultList /> */}
    <VirtualList />
    {/* <TimeSlicing /> */}
    {/* <DefaultDrawing/> */}
  </>
);

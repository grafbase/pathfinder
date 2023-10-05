import { useEffect, useRef } from "react";

import { shared } from "@pathfinder-ide/style";

import { resizerClass, handleClass, paneClass } from "./resizer.css";
import type { ResizerProps } from "./resizer.types";

import { ResizerProvider, useResizer } from "./use-resizer";

export const Resizer = ({
  onSurface,
  orientation = "HORIZONTAL",
  pane1,
  pane2,
}: ResizerProps) => {
  return (
    <ResizerProvider>
      <ResizerComponent
        onSurface={onSurface}
        orientation={orientation}
        pane1={pane1}
        pane2={pane2}
      />
    </ResizerProvider>
  );
};

const ResizerComponent = ({
  onSurface,
  orientation = "HORIZONTAL",
  pane1,
  pane2,
}: ResizerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pane1Ref = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const pane2Ref = useRef<HTMLDivElement | null>(null);

  const {
    pane1Size,
    determineInitialSize,
    resetPane,
    setInitialSize,
    setPane1Size,
  } = useResizer();

  useEffect(() => {
    if (containerRef.current) {
      const initialSize = determineInitialSize({
        containerRef,
        orientation,
        initialSize: pane2.initialSize,
      });
      setInitialSize(initialSize as number);
      setPane1Size(initialSize as number);
    }
  }, [
    determineInitialSize,
    orientation,
    pane2.initialSize,
    setInitialSize,
    setPane1Size,
  ]);

  const gridTemplate = `minmax(0, ${pane1Size}fr) 0px minmax(0, ${
    1 - pane1Size
  }fr)`;

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const onMouseMove = (e: MouseEvent) => {
      const containerEl = containerRef.current;
      const pane1El = pane1Ref.current;
      const pane2El = pane2Ref.current;

      if (containerEl && pane1El && pane2El) {
        const eventProperty =
          orientation === "HORIZONTAL" ? "clientX" : "clientY";

        // the distance from the parent container to view left (HORIZONTAL) or view top (VERTICAL)
        const containerOffset =
          orientation === "HORIZONTAL"
            ? containerEl.getBoundingClientRect().left
            : containerEl.getBoundingClientRect().top;

        // the width or height of pane1, depending on orientation
        const containerWidthOrHeight =
          orientation === "HORIZONTAL"
            ? containerEl.clientWidth
            : containerEl.clientHeight;

        // the distance from the in-motion handle to our parent container left (HORIZONTAL) or parent container top (VERTICAL)
        const handleOffset = e[eventProperty] - containerOffset;

        // the width or height of pane1, depending on orientation
        const pane1WidthOrHeight =
          orientation === "HORIZONTAL"
            ? pane1El.offsetWidth
            : pane1El.offsetHeight;

        // the width or height of pane2, depending on orientation
        const pane2WidthOrHeight =
          orientation === "HORIZONTAL"
            ? pane2El.offsetWidth
            : pane2El.offsetHeight;

        // the minimum size of pane1, depending on whether the minimumSize prop was passed in with pane 1
        const pane1Min = pane1.minimumSize
          ? 0.0 + pane1.minimumSize / containerWidthOrHeight / 1
          : 0.01;

        // the maximum size of pane1, depending on whether the minimumSize prop was passed in with pane2
        const pane1Max = pane2.minimumSize
          ? 1 - pane2.minimumSize / containerWidthOrHeight / 1
          : 0.99;

        // our new size for pane1
        const newPane1Size = Math.min(
          Math.max(
            handleOffset / (pane1WidthOrHeight + pane2WidthOrHeight),
            pane1Min,
          ),
          pane1Max,
        );

        setPane1Size(newPane1Size);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className={resizerClass({
        isInitialized: pane1Size !== 0,
      })}
      ref={containerRef}
      style={
        orientation === "HORIZONTAL"
          ? { gridTemplateColumns: gridTemplate }
          : { gridTemplateRows: gridTemplate }
      }
    >
      <div
        className={`${paneClass} ${shared.hairlineBorder({
          border: orientation === "HORIZONTAL" ? "right" : "bottom",
          onSurface,
        })}`}
        ref={pane1Ref}
      >
        {pane1.component}
      </div>
      <div
        className={handleClass({
          orientation,
        })}
        ref={handleRef}
        onMouseDown={onMouseDown}
        onDoubleClick={() => resetPane()}
      ></div>
      <div className={paneClass} ref={pane2Ref}>
        {pane2.component}
      </div>
    </div>
  );
};

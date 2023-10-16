import { useCallback, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import { shared } from "@pathfinder-ide/style";

import {
  getInitialGridTemplate,
  resetPane,
  setResizerState,
  useResizerStore,
} from "./resizer-store";

import { resizerClass, handleClass, paneClass } from "./resizer.css";
import type { ResizerProps } from "./resizer.types";

export const Resizer = ({
  onSurface,
  orientation = "HORIZONTAL",
  pane1,
  pane2,
  resizerName,
}: ResizerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pane1Ref = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const pane2Ref = useRef<HTMLDivElement | null>(null);

  const resizer = useResizerStore.use[resizerName]();

  const throttledOnWindowResize = throttle(() => {
    if (pane2.minimumSize) {
      const containerWidthOrHeight =
        orientation === "HORIZONTAL"
          ? (containerRef.current?.clientWidth as number)
          : (containerRef.current?.clientHeight as number);

      const pane1Height = pane1Ref.current?.clientHeight as number;

      if (containerWidthOrHeight - pane1Height < pane2.minimumSize + 1) {
        const gridTemplate = `minmax(0, 1fr) 0px ${pane2.minimumSize}px`;

        setResizerState({
          name: resizerName,
          updates: {
            gridTemplate,
            startingGridTemplate: gridTemplate,
          },
        });
      }
    }
  }, 16);

  useEffect(
    () => {
      if (containerRef && containerRef.current) {
        const initialGridTemplate = getInitialGridTemplate({
          pane2InitialSize: pane2.initialSize,
        });

        setResizerState({
          name: resizerName,
          updates: {
            pane2InitialSize: pane2.initialSize,
            gridTemplate: initialGridTemplate,
            startingGridTemplate: initialGridTemplate,
          },
        });
      }

      if (pane2.minimumSize) {
        window.addEventListener("resize", throttledOnWindowResize);
      } else {
        window.removeEventListener("resize", throttledOnWindowResize);
      }

      return () =>
        window.removeEventListener("resize", throttledOnWindowResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleMouseMove = useCallback(
    ({ mouseEvent }: { mouseEvent: MouseEvent }) => {
      const containerEl = containerRef.current;
      const pane1El = pane1Ref.current;
      const pane2El = pane2Ref.current;

      if (containerEl && pane1El && pane2El) {
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

        // the distance from the in-motion handle to our parent container left (HORIZONTAL) or parent container top (VERTICAL)
        const handleOffset =
          mouseEvent[orientation === "HORIZONTAL" ? "clientX" : "clientY"] -
          containerOffset;

        // our new size for pane1
        const newPane1Size = Math.min(
          Math.max(
            handleOffset / (pane1WidthOrHeight + pane2WidthOrHeight),
            pane1Min,
          ),
          pane1Max,
        );

        setResizerState({
          name: resizerName,
          updates: {
            gridTemplate: `minmax(0, ${Number(
              newPane1Size.toFixed(5),
            )}fr) 0px minmax(0, ${Number(
              (1 - Number(newPane1Size.toFixed(5))).toFixed(5),
            )}fr)`,
          },
        });
      }
    },
    [orientation, pane1.minimumSize, pane2.minimumSize, resizerName],
  );

  const throttledOnMouseMove = throttle((e: MouseEvent) => {
    handleMouseMove({ mouseEvent: e });
  }, 16);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const onMouseUp = () => {
        document.removeEventListener("mousemove", throttledOnMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", throttledOnMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [throttledOnMouseMove],
  );

  return (
    <div
      className={resizerClass({
        isInitialized: resizer.startingGridTemplate ? true : false,
      })}
      ref={containerRef}
      style={
        orientation === "HORIZONTAL"
          ? { gridTemplateColumns: resizer.gridTemplate }
          : { gridTemplateRows: resizer.gridTemplate }
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
        onMouseDown={handleMouseDown}
        onDoubleClick={() =>
          resetPane({
            resizerName,
          })
        }
      ></div>
      <div className={paneClass} ref={pane2Ref}>
        {pane2.component}
      </div>
    </div>
  );
};

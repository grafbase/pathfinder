import { Pathfinder, Trailblazer } from "@pathfinder/core";
import { useState, useEffect } from "react";
import { shared } from "@pathfinder/style";
import { appContainer } from "./app.css";

export const App = () => {
  const [url, setUrl] = useState("https://graphql.earthdata.nasa.gov/api");
  const [debouncedUrl, setDebouncedUrl] = useState(url);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUrl(debouncedUrl);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [debouncedUrl]);

  return (
    <div className={appContainer}>
      <div
        data-tauri-drag-region=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          width: "100%",
        }}
        className={`${shared.hairlineBorder({
          border: "bottom",
          onSurface: 1,
        })}`}
      >
        <input
          defaultValue={url}
          type="text"
          placeholder="Enter a URL..."
          onChange={(event) => {
            if (event.target.value !== url) {
              setDebouncedUrl(event.target.value);
            }
          }}
          style={{
            fontSize: "14px",
            fontWeight: 500,
            fontFamily:
              "Inter, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
            padding: "7px",
            width: "50%",
            color: "rgb(191,191,191)",
            backgroundColor: "rgba(24,24,24,0.75)",
            borderRadius: "8px",
            border: "1px solid transparent",
          }}
        />
      </div>
      <div style={{ height: "calc(100% - 45px)" }}>
        <Trailblazer
          schemaProps={{
            fetcherOptions: {
              endpoint: url,
              headers: [
                {
                  key: "Content-Type",
                  value: "application/json",
                },
              ],
            },
          }}
        >
          <Pathfinder />
        </Trailblazer>
      </div>
    </div>
  );
};

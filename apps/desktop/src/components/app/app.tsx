import { Pathfinder, Trailblazer } from "@pathfinder/core";
import { useState, useEffect } from "react";

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
    <div style={{ height: "100%", width: "100%", padding: 0, margin: 0 }}>
      <div
        data-tauri-drag-region=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          width: "100%",
        }}
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
      <hr style={{ border: "0.1px solid rgb(43,42,42)" }} />
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

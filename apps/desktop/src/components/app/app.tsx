import { Pathfinder, Trailblazer } from "@pathfinder/core";
import { useState } from "react";

export const App = () => {
  const [url, setUrl] = useState("https://graphql.earthdata.nasa.gov/api");

  return (
    <div style={{ height: "100%", width: "100%", padding: 0, margin: 0 }}>
      <div
        data-tauri-drag-region=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          width: "100%",
        }}
      >
        <input
          value={url}
          placeholder="Enter a URL..."
          onChange={(event) => setUrl(event.target.value)}
          style={{
            fontSize: "13px",
            padding: "5px",
            width: "75%",
            color: "rgb(177,177,177)",
            backgroundColor: "#00000033",
            borderRadius: "5px",
            border: "1px solid rgb(43,42,42)",
          }}
        />
      </div>
      <hr style={{ border: "0.1px solid rgb(43,42,42)" }} />
      <div style={{ height: "calc(100% - 40px)" }}>
        <Trailblazer
          schemaProps={{
            fetcherOptions: {
              endpoint: url,
              headers: [],
            },
          }}
        >
          <Pathfinder />
        </Trailblazer>
      </div>
    </div>
  );
};

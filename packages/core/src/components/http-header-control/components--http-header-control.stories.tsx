import { HTTPHeaderControl } from "./http-header-control";

export const HTTPHeaderControlStory = () => {
  return (
    <div
      style={{
        width: `100%`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <HTTPHeaderControl />
    </div>
  );
};

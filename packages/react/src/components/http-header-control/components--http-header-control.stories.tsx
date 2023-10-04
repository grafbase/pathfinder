import { HTTPHeaderControl } from "./http-header-control";

export const Default = () => {
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

import { HTTPHeaderControl } from "./http-header-control";

export const InApp = () => {
  return (
    <div
      style={{
        width: `100%`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <HTTPHeaderControl placement="IN_APP" />
    </div>
  );
};

export const WelcomeScreen = () => {
  return (
    <div
      style={{
        width: `100%`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <HTTPHeaderControl placement="WELCOME_SCREEN" />
    </div>
  );
};

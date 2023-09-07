import { Pill } from "./pill";

export const Options = () => {
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <div>
        <span>default</span>
        <Pill copy="a cool pill" />
      </div>
    </div>
  );
};

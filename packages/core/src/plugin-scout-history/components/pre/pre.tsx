import { preClass } from "./pre.css";

export const Pre = ({ code }: { code: string }) => {
  return <pre className={preClass}>{code}</pre>;
};

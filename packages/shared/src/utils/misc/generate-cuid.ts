import { init } from "@paralleldrive/cuid2";

export const generateCuid = ({ length = 10 }: { length?: number }) => {
  return init({ length })();
};

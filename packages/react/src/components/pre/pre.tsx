import { RecipeVariants } from "@pathfinder-ide/style";
import { preClass } from "./pre.css";

export const Pre = ({
  code,
  status,
}: {
  code: string;
  status: Pick<
    NonNullable<RecipeVariants<typeof preClass>>,
    "status"
  >["status"];
}) => {
  return (
    <pre
      className={preClass({
        status,
      })}
    >
      {code}
    </pre>
  );
};

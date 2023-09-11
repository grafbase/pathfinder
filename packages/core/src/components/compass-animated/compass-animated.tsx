import { RecipeVariants } from "@pathfinder/style";

import {
  compassAnimatedClass,
  compassAnimatedOuterClass,
  compassAnimatedSpinClass,
} from "./compass-animated.css";

export const CompassAnimated = ({
  variants,
}: {
  variants: Pick<
    NonNullable<RecipeVariants<typeof compassAnimatedClass>>,
    "size"
  >;
}) => {
  return (
    <div
      className={compassAnimatedClass({
        size: variants.size,
      })}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <g fill="#818181">
          <path
            className={compassAnimatedSpinClass}
            d="M13.774 5.8 8.267 8.17c-.1.05-.18.131-.231.231l-2.523 5.086a.53.53 0 0 0 .703.718l5.376-2.233a.524.524 0 0 0 .233-.22l2.653-5.221a.53.53 0 0 0-.704-.73Zm-6.6 6.764 1.53-3.125 1.545 1.934-3.075 1.19Zm3.99-1.85L9.6 8.759l3.11-1.227-1.548 3.182Z"
          />
          <path
            className={compassAnimatedOuterClass}
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0ZM1.25 10c0 4.825 3.925 8.77 8.75 8.77s8.75-3.945 8.75-8.77c0-4.825-3.925-8.75-8.75-8.75S1.25 5.175 1.25 10Z"
            clipRule="evenodd"
          />
        </g>
      </svg>
    </div>
  );
};

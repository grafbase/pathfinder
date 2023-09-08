import type { ThemeContractOverrides } from "@pathfinder/style";
import { toTitleCase } from "@pathfinder/style";

export const mungeThemeOverrides = ({
  overrides,
  parentKey,
}: {
  overrides: ThemeContractOverrides;
  parentKey?: string;
}) => {
  let result = {};

  Object.keys(overrides).forEach((key) => {
    const value = overrides[key as keyof object];
    // our final key will be in this format: "dark__--ColorSurface1" | "light__--FontBody"
    // we'll split on the "__" and have our target theme in split[0] and our css variable name in split[1]
    const _key = parentKey ? parentKey + toTitleCase(key) : `${key}__--`;

    if (typeof value === "object") {
      result = {
        ...result,
        ...mungeThemeOverrides({ overrides: value, parentKey: _key }),
      };
    } else {
      result[_key as keyof object] = value;
    }
  });

  return result;
};

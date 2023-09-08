import { ThemeContractOverrides } from "@pathfinder/style";
import { themeStore } from "../theme-store";

export const setThemeOverrides = ({
  overrides,
}: {
  overrides: ThemeContractOverrides;
}) => {
  return themeStore.setState({ themeOverrides: overrides });
};

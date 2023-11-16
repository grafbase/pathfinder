export type ColorRange = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
};

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
      ? Subset<K[attr]> | null
      : K[attr] extends object | null | undefined
        ? Subset<K[attr]> | null | undefined
        : K[attr];
};

type ThemeContract = {
  color: {
    neutral: ColorRange;
    red: ColorRange;
    orange: ColorRange;
    yellow: ColorRange;
    green: ColorRange;
    blue: ColorRange;
    purple: ColorRange;
  };
  font: {
    body: string;
  };
};

export type SubsetThemeContract = Subset<ThemeContract>;

export type ThemeContractOverrides = {
  dark?: SubsetThemeContract;
  light?: SubsetThemeContract;
};

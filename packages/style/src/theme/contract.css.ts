import { createGlobalThemeContract } from '@vanilla-extract/css';
import { toTitleCase } from '../utils';

import { color } from './color';
import { fonts } from './fonts';
import { space } from './space';

export const contract = createGlobalThemeContract(
  {
    color,
    fonts,
    space,
  },
  (_value, path) => `${path.map(toTitleCase).join('')}`,
);

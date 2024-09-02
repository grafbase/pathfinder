import * as React from 'react';

import { GlobalProvider } from '@ladle/react';

import { ThemeSwitcher } from '../../../packages/react/src/components/theme-switcher';

// 👇 a simple override of ladle-main styles
import './styles.css';

import { contract } from '@pathfinder-ide/style';
import { setMonacoImporter } from '../../../packages/stores/src';

setMonacoImporter(() => import('monaco-graphql/esm/monaco-editor'));

export const Provider: GlobalProvider = ({ children, globalState }) => {
  return (
    <React.StrictMode>
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: contract.color.neutral[1],
          // if we're using ladle's preview mode (full screen mode), we don't wantpadding
          padding: globalState.mode === 'preview' ? 0 : 24,
        }}
      >
        <div className="ladle-theme-switcher">
          <ThemeSwitcher />
        </div>
        {children}
      </div>
    </React.StrictMode>
  );
};

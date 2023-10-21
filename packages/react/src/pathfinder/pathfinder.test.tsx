import { act, render, screen } from '@testing-library/react';
import { Pathfinder } from './pathfinder';

import { setTheme, themeStore } from '@pathfinder-ide/stores';

// TODO: reset store between tests

describe('Pathfinder props', () => {
  it('should correctly render Welcome when Pathfinder does not receive fetcherOptions', async () => {
    render(<Pathfinder />);

    const welcomeContainer = screen.getByTestId('welcome-container');
    expect(welcomeContainer).toBeInTheDocument();
  });

  it('should correctly render Pathfinder without theme override props', async () => {
    render(<Pathfinder fetcherOptions={{ endpoint: 'ENDPOINT' }} />);

    const themeOverrides = themeStore.getState().themeOverrides;
    expect(themeOverrides).toBe(null);
  });

  it('should correctly render Pathfinder with theme override props', async () => {
    const overrides = {
      dark: {
        color: {
          neutral: {
            5: 'red',
          },
        },
      },
      light: {
        color: {
          neutral: {
            5: 'blue',
          },
        },
        font: { body: 'Comic Sans' },
      },
    };
    render(
      <Pathfinder
        fetcherOptions={{ endpoint: 'ENDPOINT' }}
        themeOptions={{
          theme: { overrides },
        }}
      />,
    );

    const rootEl = document.documentElement;

    const themeOverrides = themeStore.getState().themeOverrides;

    expect(themeOverrides).toEqual(overrides);

    // test light colors
    expect(rootEl.style.getPropertyValue('--ColorNeutral5')).toEqual(
      overrides.light.color.neutral[5],
    );
    expect(rootEl.style.getPropertyValue('--FontBody')).toEqual(
      overrides.light.font.body,
    );

    // test dark colors
    act(() => {
      setTheme({ theme: 'dark' });
    });

    expect(rootEl.style.getPropertyValue('--ColorNeutral5')).toEqual(
      overrides.dark.color.neutral[5],
    );
  });
});

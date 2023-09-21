import { act, render, screen } from "@testing-library/react";
import { Trailblazer } from "./trailblazer";

import { setTheme, themeStore } from "@pathfinder/stores";

// TODO: reset store between tests

describe("Trailblazer props", () => {
  it("should correctly render Welcome when Trailblazer does not receive schemaProps", async () => {
    render(<Trailblazer />);

    const welcomeContainer = screen.getByTestId("welcome-container");
    expect(welcomeContainer).toBeInTheDocument();
  });

  it("should correctly render Trailblazer without theme override props", async () => {
    render(
      <Trailblazer
        schemaProps={{
          fetcherOptions: {
            endpoint: "ENDPOINT",
          },
        }}
      />,
    );

    const themeOverrides = themeStore.getState().themeOverrides;
    expect(themeOverrides).toBe(null);
  });

  it("should correctly render Trailblazer with theme override props", async () => {
    const overrides = {
      dark: {
        color: {
          neutral: {
            5: "red",
          },
        },
      },
      light: {
        color: {
          neutral: {
            5: "blue",
          },
        },
        font: { body: "Comic Sans" },
      },
    };
    render(
      <Trailblazer
        schemaProps={{
          fetcherOptions: {
            endpoint: "ENDPOINT",
          },
        }}
        themeProps={{
          theme: { overrides },
        }}
      />,
    );

    const rootEl = document.documentElement;

    const themeOverrides = themeStore.getState().themeOverrides;

    expect(themeOverrides).toEqual(overrides);

    // test light colors
    expect(rootEl.style.getPropertyValue("--ColorNeutral5")).toEqual(
      overrides.light.color.neutral[5],
    );
    expect(rootEl.style.getPropertyValue("--FontBody")).toEqual(
      overrides.light.font.body,
    );

    // test dark colors
    act(() => {
      setTheme({ theme: "dark" });
    });

    expect(rootEl.style.getPropertyValue("--ColorNeutral5")).toEqual(
      overrides.dark.color.neutral[5],
    );
  });
});

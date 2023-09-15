import { act, render, screen } from "@testing-library/react";
import { Trailblazer } from "./trailblazer";

import { Pathfinder } from "../pathfinder";

import {
  useSessionStore,
  usePluginsStore,
  setTheme,
  themeStore,
} from "@pathfinder/stores";

// TODO: reset store between tests

describe("Trailblazer props", () => {
  it("should correctly render Welcome when Trailblazer does not receive schemaProps", async () => {
    render(
      <Trailblazer>
        <Pathfinder />
      </Trailblazer>,
    );

    const welcomeContainer = screen.getByTestId("welcome-container");
    expect(welcomeContainer).toBeInTheDocument();
  });

  it("should correctly render Pathfinder when Trailblazer receives schemaProps", async () => {
    render(
      <Trailblazer
        schemaProps={{
          fetcherOptions: {
            endpoint: "ENDPOINT",
          },
        }}
      >
        <Pathfinder />
      </Trailblazer>,
    );

    const pathfinderContainer = screen.getByTestId("pathfinder-container");
    expect(pathfinderContainer).toBeInTheDocument();
  });

  it("should correctly render Trailblazer without theme override props", async () => {
    render(
      <Trailblazer
        schemaProps={{
          fetcherOptions: {
            endpoint: "ENDPOINT",
          },
        }}
      >
        <Pathfinder />
      </Trailblazer>,
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
      >
        <Pathfinder />
      </Trailblazer>,
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

  it("should correctly render Trailblazer with plugins/scoutTools props", async () => {
    render(
      <Trailblazer
        plugins={{
          scoutTools: [
            {
              buttonCopy: () => "A Cool Plugin",
              content: () => <p>some cool plugin</p>,
              name: "my-cool-scout-plugin",
            },
          ],
        }}
        schemaProps={{
          fetcherOptions: {
            endpoint: "ENDPOINT",
          },
        }}
      >
        <Pathfinder />
      </Trailblazer>,
    );

    act(() => {
      useSessionStore.setState({ _hasHydrated: true });
    });

    const scoutTools = usePluginsStore.getState().scoutTools;

    expect(JSON.stringify(scoutTools)).toEqual(
      JSON.stringify([
        {
          buttonCopy: () => "A Cool Plugin",
          content: () => <p>some cool plugin</p>,
          name: "my-cool-scout-plugin",
        },
      ]),
    );

    const ourPluginButton = screen.getByText("A Cool Plugin");
    expect(ourPluginButton).toBeInTheDocument();
  });
});

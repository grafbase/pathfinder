import { useEffect, useState } from "react";
import { get, keys } from "idb-keyval";

import { STORAGE_NAME_SESSION } from "@pathfinder/shared";

import {
  HTTPHeaderValue,
  getNamespacedStorageName,
  loadSchema,
  useSchemaStore,
  useSessionStore,
} from "@pathfinder/stores";

import { CompassAnimated } from "../compass-animated";
import { Control, type ControlProps } from "../control";
import { HTTPHeaderControl } from "../http-header-control";
import { Icon } from "../icon";
import { Pre } from "../pre";

import {
  backToPreviousSessionsButton,
  blueGradientClass,
  introspectionStatusClass,
  introspectionStatusWrapClass,
  loadingWrapClass,
  purpleGradientClass,
  sessionSelectButtonClass,
  startNewSessionButtonClass,
  startNewSessionButtonWrapClass,
  welcomeClass,
  welcomeContentClass,
  welcomeContentControlsAddHeadersButtonClass,
  welcomeContentControlsClass,
  welcomeContentControlsDoIntrospectionButtonClass,
} from "./welcome.css";

export const Welcome = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [endpointValue, setEndpointValue] = useState<string>("");

  const [storedSessions, setStoredSessions] = useState<string[] | null>(null);

  const [showHeadersControl, setShowHeadersControl] = useState<boolean>(false);
  const [showNewSession, setShowNewSession] = useState<boolean>(false);

  const isIntrospecting = useSchemaStore.use.isIntrospecting();
  const introspectionErrors = useSchemaStore.use.introspectionErrors();

  const handleChange: ControlProps["control"]["handleChange"] = ({ value }) => {
    setEndpointValue(value as string);
  };

  useEffect(() => {
    keys().then((keys) => {
      const storedSessions = keys.filter((key) => {
        if (typeof key === "string" && key.includes(STORAGE_NAME_SESSION)) {
          return true;
        }
      });
      setLoading(false);
      setStoredSessions(storedSessions as string[]);
      if (storedSessions.length === 0) {
        setShowNewSession(true);
      }
    });
  }, []);

  return (
    <div className={welcomeClass} data-testid="welcome-container">
      <div
        className={loadingWrapClass({
          isVisible: loading,
        })}
      >
        <CompassAnimated size={"medium"} speed={"standard"} />
      </div>
      <div
        className={welcomeContentClass({
          isVisible: !loading,
        })}
      >
        {showNewSession && storedSessions && storedSessions.length !== 0 && (
          <button
            className={backToPreviousSessionsButton}
            onClick={() => setShowNewSession(false)}
          >
            <Icon name="Chevron" rotate="90" size="medium" />
            <span>Back to previous sessions</span>
          </button>
        )}

        {!showNewSession && storedSessions && storedSessions.length > 0 && (
          <div>
            <p>Choose a from a previous session: </p>
            {storedSessions.map((storedSession, i) => (
              <button
                key={i}
                className={sessionSelectButtonClass}
                onClick={async () => {
                  const { headers, endpoint } = await get(storedSession).then(
                    (val) => ({
                      headers: val.state.headers,
                      endpoint: val.state.endpoint,
                    }),
                  );

                  useSessionStore.persist.setOptions({
                    name: storedSession as string,
                  });

                  // manually rehydrate
                  useSessionStore.persist.rehydrate();

                  loadSchema({
                    fetchOptions: {
                      endpoint,
                      headers: (headers as HTTPHeaderValue[]).map((header) => [
                        header.key,
                        header.value,
                      ]),
                    },
                  });
                }}
              >
                {storedSession.split(`${STORAGE_NAME_SESSION}-`)[1]}
              </button>
            ))}

            <div className={startNewSessionButtonWrapClass}>
              <button
                className={startNewSessionButtonClass}
                onClick={() => setShowNewSession(true)}
              >
                Or click here to begin a new session
              </button>
            </div>
          </div>
        )}

        {showNewSession && (
          <>
            <Control
              control={{
                controlType: "INPUT",
                handleChange,
                name: "welcome-endpoint",
                placeholder: "Enter your GraphQL endpoint URL to get started",
                value: endpointValue,
              }}
              displayLabel={true}
              labelCopy={`Endpoint`}
            />

            {showHeadersControl && (
              <HTTPHeaderControl placement="WELCOME_SCREEN" />
            )}

            <div className={welcomeContentControlsClass}>
              <button
                className={welcomeContentControlsAddHeadersButtonClass}
                onClick={() => setShowHeadersControl(!showHeadersControl)}
              >
                {showHeadersControl ? "Remove header" : "Add header"}
              </button>

              <button
                className={welcomeContentControlsDoIntrospectionButtonClass}
                disabled={endpointValue.length < 1}
                onClick={() => {
                  const headers = useSessionStore.getState().headers;

                  const name = getNamespacedStorageName({
                    endpoint: endpointValue,
                    storageName: STORAGE_NAME_SESSION,
                  });

                  useSessionStore.persist.setOptions({
                    name,
                  });

                  // manually rehydrate
                  useSessionStore.persist.rehydrate();

                  loadSchema({
                    fetchOptions: {
                      endpoint: endpointValue,
                      headers: headers.map((header) => [
                        header.key,
                        header.value,
                      ]),
                    },
                  });

                  // write our fetcherOptions into session state/storage after a short timeout to prevent hydration collisions
                  setTimeout(() => {
                    useSessionStore.setState({
                      endpoint: endpointValue,
                      headers,
                    });
                  }, 100);
                }}
              >
                Connect
              </button>
            </div>
          </>
        )}

        {isIntrospecting && (
          <div className={introspectionStatusWrapClass}>
            <div
              className={introspectionStatusClass({
                status: "info",
              })}
            >
              <Pre code={"Introspecting schema..."} status={"info"} />
            </div>
          </div>
        )}

        {introspectionErrors.length > 0 && (
          <div className={introspectionStatusWrapClass}>
            <div
              className={introspectionStatusClass({
                status: "error",
              })}
            >
              {introspectionErrors.map((error, i) => (
                <Pre key={i} code={error} status={"error"} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={purpleGradientClass} />
      <div className={blueGradientClass} />
    </div>
  );
};

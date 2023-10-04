import { useEffect, useState } from "react";

import { generateCuid } from "@pathfinder/shared";

import {
  getSessions,
  initSession,
  useSchemaStore,
  useSessionStore,
} from "@pathfinder/stores";

import { doIntrospection } from "@pathfinder/stores/src/schema-store";

import { CompassAnimated } from "../compass-animated";
import { Control, type ControlProps } from "../control";
import { Icon } from "../icon";
import { Pre } from "../pre";
import { Sessions } from "../sessions";
import { Button } from "../button";

import {
  backToPreviousSessionsButton,
  connectClass,
  connectContentClass,
  connectContentControlsAddHeadersButtonClass,
  connectContentControlsClass,
  connectContentControlsDoIntrospectionButtonClass,
  connectContentHeadersClass,
  introspectionStatusClass,
  loadStoredSessionCopyClass,
  loadingWrapClass,
  startNewSessionButtonWrapClass,
} from "./connect.css";

export const Connect = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [storedSessions, setStoredSessions] = useState<string[] | null>(null);

  const [showHeadersControl, setShowHeadersControl] = useState<boolean>(false);

  const [showNewSession, setShowNewSession] = useState<boolean>(false);

  const isIntrospecting = useSchemaStore.use.isIntrospecting();

  const introspectionErrors = useSchemaStore.use.introspectionErrors();

  const [endpointValue, setEndpointValue] = useState<string>("");
  const [headerKeyValue, setHeaderKeyValue] = useState<string>("");
  const [headerValueValue, setHeaderValueValue] = useState<string>("");

  const handleChange: ControlProps["control"]["handleChange"] = ({
    name,
    value,
  }) => {
    if (name === "endpointValue") {
      setEndpointValue(value as string);
    }
    if (name === "headerKeyValue") {
      setHeaderKeyValue(value as string);
    }
    if (name === "headerValueValue") {
      setHeaderValueValue(value as string);
    }
  };

  useEffect(() => {
    getSessions().then((sessions) => {
      setLoading(false);
      setStoredSessions(sessions as string[]);
      if (sessions.length === 0) {
        setShowNewSession(true);
      }
    });
  }, []);

  return (
    <div
      className={connectClass}
      data-testid="welcome-container"
      data-tauri-drag-region=""
    >
      <div
        className={loadingWrapClass({
          isVisible: loading,
        })}
      >
        <CompassAnimated size={"medium"} speed={"standard"} />
      </div>
      <div
        className={connectContentClass({
          isVisible: !loading,
        })}
      >
        {showNewSession && storedSessions && storedSessions.length !== 0 && (
          <button
            className={backToPreviousSessionsButton}
            onClick={() => setShowNewSession(false)}
          >
            <Icon name="Chevron" rotate="90" size="medium" />
            <span>Back to stored sessions</span>
          </button>
        )}

        {!showNewSession && storedSessions && storedSessions.length > 0 && (
          <div>
            <p className={loadStoredSessionCopyClass}>
              Load a stored session:{" "}
            </p>
            <Sessions sessionNames={storedSessions} />

            <div className={startNewSessionButtonWrapClass}>
              <Button
                action={() => setShowNewSession(true)}
                copy={"Or click here to begin a new session"}
                onSurface={1}
                size="large"
                title="Begin a new session"
                withBorder={true}
              />
            </div>
          </div>
        )}

        {showNewSession && (
          <>
            <Control
              control={{
                controlType: "INPUT",
                handleChange,
                name: "endpointValue",
                placeholder: "Enter your GraphQL endpoint URL to get started",
                value: endpointValue,
              }}
              displayLabel={true}
              labelCopy={`Endpoint`}
            />
            <div
              className={connectContentHeadersClass({
                isVisible: showHeadersControl,
              })}
            >
              <Control
                control={{
                  controlType: "INPUT",
                  handleChange,
                  name: "headerKeyValue",
                  placeholder: "Authorization",
                  value: headerKeyValue,
                }}
                displayLabel={true}
                labelCopy={`Header key`}
              />
              <Control
                control={{
                  controlType: "INPUT",
                  handleChange,
                  name: "headerValueValue",
                  placeholder: "Bearer ...",
                  value: headerValueValue,
                }}
                displayLabel={true}
                labelCopy={`Header value`}
              />
            </div>
            <div className={connectContentControlsClass}>
              <button
                className={connectContentControlsAddHeadersButtonClass}
                onClick={() => setShowHeadersControl(!showHeadersControl)}
              >
                {showHeadersControl ? "Remove header" : "Add header"}
              </button>

              <button
                className={connectContentControlsDoIntrospectionButtonClass}
                disabled={endpointValue.length < 1}
                onClick={async () => {
                  const fetchOptions = {
                    endpoint: endpointValue,
                    headers:
                      headerKeyValue.length > 0 || headerValueValue.length > 0
                        ? [
                            {
                              id: generateCuid({}),
                              enabled: true,
                              key: headerKeyValue,
                              value: headerValueValue,
                            },
                          ]
                        : [],
                  };

                  const schema = await doIntrospection({ fetchOptions });

                  // if we have a schema, we can go ahead and initialize a new session
                  if (schema) {
                    initSession({ fetchOptions });
                    useSessionStore.setState({ connectionDialogOpen: false });
                  }
                }}
              >
                {isIntrospecting ? (
                  <CompassAnimated size="small" speed="standard" />
                ) : (
                  "Connect"
                )}
              </button>
            </div>
          </>
        )}

        {showNewSession && introspectionErrors.length > 0 && (
          <div
            className={introspectionStatusClass({
              status: introspectionErrors.length > 0 ? "error" : "info",
            })}
          >
            {introspectionErrors.map((error, i) => (
              <Pre key={i} code={error} status={"error"} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

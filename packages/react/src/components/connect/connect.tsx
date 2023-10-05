import { useEffect, useReducer, useState } from "react";

import { generateCuid } from "@pathfinder-ide/shared";

import {
  HTTPHeaderValue,
  getSessions,
  initSession,
  useSchemaStore,
  useSessionStore,
} from "@pathfinder-ide/stores";

import { doIntrospection } from "@pathfinder-ide/stores/src/schema-store";

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
  connectContentHeaderRowClass,
  connectContentAddHeaderButtonClass,
  introspectionStatusClass,
  loadStoredSessionCopyClass,
  loadingWrapClass,
  startNewSessionButtonWrapClass,
} from "./connect.css";

const headersReducer = (
  headers: HTTPHeaderValue[],
  action:
    | { type: "add" }
    | { type: "update"; payload: { name: string; value: string } },
) => {
  switch (action.type) {
    case "add": {
      return [
        ...headers,
        {
          id: generateCuid({}),
          enabled: true,
          key: "",
          value: "",
        },
      ];
    }
    case "update": {
      const id = action.payload.name.split("--")[0];
      const valueType = action.payload.name.split("--")[1];

      const existingHeaderIndex = headers.findIndex(
        (header) => header.id === id,
      );

      const update = { [valueType]: action.payload.value };

      headers[existingHeaderIndex] = {
        ...headers[existingHeaderIndex],
        ...update,
      };

      return [...headers];
    }
  }
};

export const Connect = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [storedSessions, setStoredSessions] = useState<string[] | null>(null);

  const [showHeadersControl, setShowHeadersControl] = useState<boolean>(false);

  const [showNewSession, setShowNewSession] = useState<boolean>(false);

  const isIntrospecting = useSchemaStore.use.isIntrospecting();

  const introspectionErrors = useSchemaStore.use.introspectionErrors();

  const [endpointValue, setEndpointValue] = useState<string>("");
  const [headers, headersDispatch] = useReducer(headersReducer, [
    {
      id: generateCuid({}),
      enabled: true,
      key: "Content-Type",
      value: "application/json",
    },
  ]);

  const handleChange: ControlProps["control"]["handleChange"] = ({
    name,
    value,
  }) => {
    if (name === "endpointValue") {
      setEndpointValue(value as string);
    } else {
      headersDispatch({
        type: "update",
        payload: { name, value: value as string },
      });
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
              {headers.map((h, index) => (
                <div key={h.id} className={connectContentHeaderRowClass}>
                  <Control
                    control={{
                      controlType: "INPUT",
                      handleChange,
                      name: `${h.id}--key`,
                      placeholder: "Authorization",
                      value: h.key,
                    }}
                    displayLabel={index === 0 ? true : false}
                    labelCopy={`Header key`}
                  />
                  <Control
                    control={{
                      controlType: "INPUT",
                      handleChange,
                      name: `${h.id}--value`,
                      placeholder: "Bearer ...",
                      value: h.value,
                    }}
                    displayLabel={index === 0 ? true : false}
                    labelCopy={`Header value`}
                  />
                </div>
              ))}
              <button
                className={connectContentAddHeaderButtonClass}
                onClick={() => headersDispatch({ type: "add" })}
              >
                Add another header
              </button>
            </div>
            <div className={connectContentControlsClass}>
              <button
                className={connectContentControlsAddHeadersButtonClass}
                onClick={() => setShowHeadersControl(!showHeadersControl)}
              >
                {showHeadersControl ? "Hide headers" : "Show headers"}
              </button>

              <button
                className={connectContentControlsDoIntrospectionButtonClass}
                disabled={endpointValue.length < 1}
                onClick={async () => {
                  const fetchOptions = {
                    endpoint: endpointValue,
                    headers,
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

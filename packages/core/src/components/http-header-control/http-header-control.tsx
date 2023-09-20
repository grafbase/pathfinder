import {
  useSessionStore,
  addEmptyHeader,
  removeHeader,
  updateHeader,
} from "@pathfinder/stores";

import { IconButton } from "../icon-button";

import { Control, ControlProps } from "../control";

import { Switch } from "../switch";

import {
  addHeaderButtonWrapClass,
  headerControlClass,
  headerControlsClass,
  headerControlWrapClass,
  removeHeaderButtonWrapClass,
} from "./http-header-control.css";

const SEPARATOR = `--`;

export const HTTPHeaderControl = ({
  placement,
}: {
  placement: "WELCOME_SCREEN" | "IN_APP";
}) => {
  const headers = useSessionStore.use.headers();

  const handleChange: ControlProps["control"]["handleChange"] = ({
    name,
    value,
  }) => {
    const id = name.split(SEPARATOR)[0];
    const valueType = name.split(SEPARATOR)[1];

    if (valueType === "kVSwitch") {
      updateHeader({ id, payload: { enabled: value as boolean } });
    } else {
      updateHeader({
        id,
        payload: {
          keyOrValue: valueType as "key" | "value",
          value: value as string,
        },
      });
    }
  };

  return (
    <div
      className={headerControlWrapClass({
        placement,
      })}
    >
      <div className={headerControlsClass}>
        {headers.map((header, i) => (
          <div
            className={headerControlClass({
              placement,
            })}
            key={header.id}
          >
            {placement === "IN_APP" && (
              <Switch
                handleChange={handleChange}
                isChecked={header.enabled}
                isDisabled={!header.key || !header.value}
                name={`${header.id}${SEPARATOR}kVSwitch`}
                size="SMALL"
              />
            )}
            <Control
              control={{
                controlType: "INPUT",
                handleChange,
                name: `${header.id}${SEPARATOR}key`,
                placeholder: "Authorization",
                value: header.key,
              }}
              displayLabel={i === 0}
              labelCopy={`Header key`}
            />
            <Control
              control={{
                controlType: "INPUT",
                handleChange,
                name: `${header.id}${SEPARATOR}value`,
                placeholder: "Bearer ...",
                value: header.value,
              }}
              displayLabel={i === 0}
              labelCopy={`Header value`}
            />

            {placement === "IN_APP" && !header.enabled && (
              <div
                className={removeHeaderButtonWrapClass({
                  withLabel: i === 0,
                })}
              >
                <IconButton
                  action={() => removeHeader({ id: header.id })}
                  iconName="Close"
                  isDisabled={header.enabled}
                  size="medium"
                  title="Remove header"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {placement === "IN_APP" && (
        <button
          className={addHeaderButtonWrapClass}
          onClick={() => addEmptyHeader({})}
          title="Add header"
        >
          {`Add ${headers.length > 0 ? "another" : ""} header`}
        </button>
      )}
    </div>
  );
};

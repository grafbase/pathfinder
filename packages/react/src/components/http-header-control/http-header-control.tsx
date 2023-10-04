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
  headerControlsSwitchWrapClass,
  headerControlWrapClass,
  removeHeaderButtonWrapClass,
} from "./http-header-control.css";

const SEPARATOR = `--`;

export const HTTPHeaderControl = () => {
  const headers = useSessionStore.use.headers();

  const handleChange: ControlProps["control"]["handleChange"] = ({
    name,
    value,
  }) => {
    const id = name.split(SEPARATOR)[0];
    const valueType = name.split(SEPARATOR)[1];

    if (valueType === "switch") {
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
    <div className={headerControlWrapClass}>
      <div className={headerControlsClass}>
        {headers.map((header, i) => (
          <div className={headerControlClass} key={header.id}>
            <div
              className={headerControlsSwitchWrapClass({
                hasLabel: i === 0,
              })}
            >
              <Switch
                handleChange={handleChange}
                isChecked={header.enabled}
                isDisabled={!header.key || !header.value}
                name={`${header.id}${SEPARATOR}switch`}
                size="SMALL"
              />
            </div>
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

            {!header.enabled && (
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

      <button
        className={addHeaderButtonWrapClass}
        onClick={() => addEmptyHeader({})}
        title="Add header"
      >
        {`Add ${headers.length > 0 ? "another" : ""} header`}
      </button>
    </div>
  );
};

import {
  useHTTPHeadersStore,
  addEmptyHeader,
  removeHeader,
  updateHeader,
} from "@pathfinder/stores";

import { Button } from "../button";

import { IconButton } from "../icon-button";

import { Control, ControlProps } from "../control";

import { Switch } from "../switch";

import {
  addHeaderButtonWrapClass,
  headerControlClass,
  headerControlsClass,
  headerControlHeaderClass,
  headerControlHeaderSpanClass,
  headerControlWrapClass,
} from "./http-header-control.css";

const SEPARATOR = `--`;

export const HTTPHeaderControl = () => {
  const headers = useHTTPHeadersStore.use.headers();

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
    <div className={headerControlWrapClass}>
      <div className={headerControlHeaderClass}>
        <span className={headerControlHeaderSpanClass}>Enable</span>
        <span className={headerControlHeaderSpanClass}>Key</span>
        <span className={headerControlHeaderSpanClass}>Value</span>
      </div>
      <div className={headerControlsClass}>
        {headers.map((header) => (
          <div className={headerControlClass} key={header.id}>
            <Switch
              handleChange={handleChange}
              isChecked={header.enabled}
              isDisabled={!header.key || !header.value}
              name={`${header.id}${SEPARATOR}kVSwitch`}
              size="SMALL"
            />
            <Control
              alignment="LEFT"
              control={{
                controlType: "INPUT",
                handleChange,
                name: `${header.id}${SEPARATOR}key`,
                placeholder: "Authorization",
                value: header.key,
              }}
              displayLabel={false}
              labelCopy={`Value for Key`}
            />
            <Control
              alignment="LEFT"
              control={{
                controlType: "INPUT",
                handleChange,
                name: `${header.id}${SEPARATOR}value`,
                placeholder: "Bearer ...",
                value: header.value,
              }}
              displayLabel={false}
              labelCopy={`Value for Value`}
            />

            {!header.enabled && (
              <IconButton
                action={() => removeHeader({ id: header.id })}
                iconName="Close"
                isDisabled={header.enabled}
                size="medium"
                title="Remove header"
              />
            )}
          </div>
        ))}
      </div>

      <div className={addHeaderButtonWrapClass}>
        <Button
          action={() => addEmptyHeader()}
          copy={"Add header"}
          onSurface={3}
          size="medium"
          title="Add header"
        />
      </div>
    </div>
  );
};

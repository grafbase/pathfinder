import { useEffect, useState } from "react";

import { FieldNode } from "graphql";

import {
  type AncestorField,
  type AncestorsArray,
  generateSelectionBreadcrumbsFromAncestors,
} from "../../compass-store";

import { Argument } from "../argument";

import {
  argumentsCollapseTriggerClass,
  argumentsClass,
  argumentsContentClass,
  argumentsListClass,
} from "./arguments.css";
import { Icon } from "../../../components";

export const Arguments = ({
  ancestors,
  selection,
}: {
  ancestors: AncestorsArray;
  selection: FieldNode | null;
}) => {
  const { field } = ancestors[ancestors.length - 1] as AncestorField;

  const { args } = field;

  // can we use a ref here to ensure the isExpanded state doesn't reset on each render?
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // useEffect(() => {
  //   // this effect ensures the field is initially expanded when selected
  //   // this is one of the many micro-interactions in pathfinder that need tweaking/testing
  //   if (selection?.arguments && selection?.arguments.length > 0) {
  //     setIsExpanded(true);
  //   } else {
  //     setIsExpanded(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  console.log("rendering Arguments", { selection, field });

  return (
    <div className={argumentsClass({ isExpanded })}>
      <button
        className={argumentsCollapseTriggerClass}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        title={`Expand nested content of ${generateSelectionBreadcrumbsFromAncestors(
          { ancestors },
        )} ARGUMENTS`}
      >
        <Icon
          name={"Caret"}
          rotate={isExpanded ? "90" : undefined}
          size="small"
        />
        ARGUMENTS
      </button>
      <div className={argumentsContentClass}>
        {isExpanded && (
          <ul className={argumentsListClass}>
            {args.map((arg) => (
              <Argument
                key={arg.name}
                ancestors={[
                  ...ancestors,
                  {
                    type: "ARGUMENT",
                    argument: arg,
                    selection: selection?.arguments?.find(
                      (a) => a.name.value === arg.name,
                    ),
                  },
                ]}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

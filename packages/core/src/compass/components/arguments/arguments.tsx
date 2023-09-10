import { useEffect, useState } from "react";

import { FieldNode } from "graphql";

import {
  type AncestorField,
  type AncestorsArray,
  generateSelectionBreadcrumbsFromAncestors,
} from "../../compass-store";

import { Argument } from "../argument";
import { CollapseControl } from "../collapse-control";

import {
  argumentsClass,
  argumentsContentClass,
  argumentsLeadWrapClass,
  argumentsListClass,
} from "./arguments.css";

export const Arguments = ({
  ancestors,
  selection,
}: {
  ancestors: AncestorsArray;
  selection: FieldNode | null;
}) => {
  const { field } = ancestors[ancestors.length - 1] as AncestorField;

  const { args } = field;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    // this effect ensures the field is initially expanded when selected
    // this is one of the many micro-interactions in pathfinder that need tweaking/testing
    if (selection?.arguments && selection?.arguments.length > 0) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={argumentsClass({ isExpanded })}>
      <div className={argumentsLeadWrapClass}>
        <CollapseControl
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          title={`Expand nested content of ${generateSelectionBreadcrumbsFromAncestors(
            { ancestors },
          )} ARGUMENTS`}
        />
        ARGUMENTS
      </div>
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

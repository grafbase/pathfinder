import { useState } from "react";
import { isRequiredArgument, isRequiredInputField } from "graphql";

import { toggle, type AncestorsArray } from "../../compass-store";

import { DetailsActions } from "../details-actions";
import type { ListItemTypeTypes, ListItemVariants } from "../list-item";

import {
  detailsClass,
  detailsTogglerClass,
  inlineFragmentClass,
} from "./details.css";

type DetailsProps = {
  ancestors: AncestorsArray;
  breadcrumbs: string;
  isSelected: boolean;
  onClick: () => void;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

export const Details = ({
  ancestors,
  breadcrumbs,
  isSelected,
  onClick,
  type,
  variant,
}: DetailsProps) => {
  const [showActions, setShowActions] = useState<boolean>(false);
  const self = ancestors[ancestors.length - 1];

  const previousAncestor = ancestors[ancestors.length - 2];

  // we disable the toggle button for arguments when the parent field is not selected
  // ...the logic to perform this toggle update is complicated
  const isDisabled =
    self.type === "ARGUMENT" &&
    previousAncestor.type === "FIELD" &&
    !previousAncestor.selection;

  const ifRequiredShowAsterisk =
    "defaultValue" in type &&
    (isRequiredArgument(type) || isRequiredInputField(type)) &&
    `*`;
  const title = `${isSelected ? "Remove" : "Add"} ${breadcrumbs} ${self.type} ${
    isSelected ? "from" : "to"
  } operation`;

  return (
    <div
      className={detailsClass}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {variant === "INLINE_FRAGMENT" ? (
        <div
          className={inlineFragmentClass({ isSelected })}
        >{`... on ${type.name}`}</div>
      ) : (
        <button
          className={detailsTogglerClass({
            isSelected,
            variant,
          })}
          aria-label={title}
          aria-pressed={isSelected}
          disabled={isDisabled}
          onClick={() => {
            onClick();
            return toggle({
              ancestors,
            });
          }}
          title={title}
          type="button"
        >
          {`${type.name}${ifRequiredShowAsterisk || ""}`}
        </button>
      )}
      {self.type === "FIELD" && (
        <DetailsActions
          ancestors={ancestors}
          previousAncestor={previousAncestor}
          showActions={showActions}
          type={type}
        />
      )}
    </div>
  );
};

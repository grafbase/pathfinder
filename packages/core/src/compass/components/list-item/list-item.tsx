import { useEffect, useState } from "react";

import { generateSelectionBreadcrumbsFromAncestors } from "../../compass-store";

import { CollapseControl } from "../collapse-control";
import { Details } from "../details";
import { IndicatorLeaf } from "../indicator-leaf";

import {
  listItemClass,
  listItemContentClass,
  listItemLeadClass,
} from "./list-item.css";

import type { ListItemProps } from "./list-item.types";

export const ListItem = ({
  ancestors,
  collapsibleContent,
  isSelected,
  type,
  variant,
}: ListItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    // this effect ensures the field is initially expanded when selected
    // this is one of the many micro-interactions in pathfinder that need tweaking/testing
    if (isSelected) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isSelected]);

  const breadcrumbs = generateSelectionBreadcrumbsFromAncestors({ ancestors });

  if (collapsibleContent) {
    return (
      <li className={listItemClass}>
        <div
          className={listItemLeadClass({
            isCollapsible: true,
          })}
        >
          <CollapseControl
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            title={`Expand nested content of ${breadcrumbs} ${variant}`}
          />

          <Details
            ancestors={ancestors}
            breadcrumbs={breadcrumbs}
            isSelected={isSelected}
            type={type}
            variant={variant}
          />
        </div>
        <div
          className={listItemContentClass({
            isExpanded,
          })}
        >
          {isExpanded && (
            <>
              {"deprecationReason" in type && type.deprecationReason && (
                <p>{type.deprecationReason}</p>
              )}

              {collapsibleContent.arguments && collapsibleContent.arguments}
              {isExpanded && collapsibleContent.childFields && (
                <ul className="child-fields">
                  {collapsibleContent.childFields}
                </ul>
              )}
            </>
          )}
        </div>
      </li>
    );
  }

  return (
    <li className={listItemClass}>
      <div
        className={listItemLeadClass({
          isCollapsible: false,
        })}
      >
        <IndicatorLeaf />
        <Details
          ancestors={ancestors}
          breadcrumbs={breadcrumbs}
          isSelected={isSelected}
          type={type}
          variant={variant}
        />
      </div>
    </li>
  );
};

import { useState } from "react";

import { generateSelectionBreadcrumbsFromAncestors } from "../../compass-store";

import { CollapseControl } from "../collapse-control";
import { Details } from "../details";
import { IndicatorLeaf } from "../indicator-leaf";

import {
  listItemChildFieldsClass,
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
  const [isExpanded, setIsExpanded] = useState<boolean>(isSelected);

  const breadcrumbs = generateSelectionBreadcrumbsFromAncestors({
    ancestors,
  });

  const hasParent = ancestors.length > 2;

  if (collapsibleContent) {
    return (
      <li
        className={listItemClass({
          hasParent,
          isCollapsible: true,
        })}
      >
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
            onClick={() => setIsExpanded(!isExpanded)}
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
                <ul className={listItemChildFieldsClass}>
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
    <li
      className={listItemClass({
        hasParent,
        isCollapsible: false,
      })}
    >
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
          onClick={() => undefined}
          type={type}
          variant={variant}
        />
      </div>
    </li>
  );
};

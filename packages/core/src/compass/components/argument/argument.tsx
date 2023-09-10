import {
  type AncestorArgument,
  type AncestorsArray,
  generateSelectionBreadcrumbsFromAncestors,
} from "../../compass-store";

import { Details } from "../details";
import { IndicatorLeaf } from "../indicator-leaf";

import { argumentClass } from "./argument.css";

export const Argument = ({ ancestors }: { ancestors: AncestorsArray }) => {
  const { argument, selection } = ancestors[
    ancestors.length - 1
  ] as AncestorArgument;

  return (
    <div className={argumentClass}>
      <IndicatorLeaf />
      <Details
        ancestors={ancestors}
        breadcrumbs={generateSelectionBreadcrumbsFromAncestors({ ancestors })}
        isSelected={!!selection}
        type={argument}
        variant={"ARGUMENT"}
      />
    </div>
  );
};

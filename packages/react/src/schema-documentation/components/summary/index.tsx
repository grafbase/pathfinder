import type {
  GraphQLDirective,
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
} from "graphql";

import { unwrapType } from "@pathfinder-ide/shared";

import { useSchemaDocumentationStore } from "../../store";

import { ArgumentsList } from "../arguments-list";
import { DefaultValue } from "../default-value";
import { Markdown } from "../markdown";

import { summaryFieldClass, summaryTypeClass } from "./summary.css";

import {
  returnTypeButtonClass,
  scalarArgumentNameClass,
  tertiaryTriggerButtonClass,
} from "../../shared.styles.css";

export const SummaryField = ({
  field,
  resetTertiaryPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any, any>;
  resetTertiaryPaneOnClick: boolean;
}) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore();

  return (
    <div className={summaryFieldClass}>
      <button
        className={tertiaryTriggerButtonClass({
          color: "VIOLET",
        })}
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: field,
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {field.name}
      </button>
      {"args" in field && field.args.length > 0 && (
        <>
          <span>{`(`}</span>
          <ArgumentsList
            args={field.args}
            resetTertiaryPaneOnClick={resetTertiaryPaneOnClick}
          />
          <span>{`)`}</span>
        </>
      )}
      <span>{`:`}</span>
      <button
        className={returnTypeButtonClass}
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: unwrapType(field.type),
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {field.type.toString()}
      </button>
    </div>
  );
};

export const SummaryInputField = ({
  inputField,
}: {
  inputField: GraphQLInputField;
}) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore();

  return (
    <div className={summaryFieldClass}>
      <span className={scalarArgumentNameClass}>{inputField.name}</span>
      <span>{`:`}</span>
      <button
        className={returnTypeButtonClass}
        title="Return type"
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: unwrapType(inputField.type),
          })
        }
      >
        {inputField.type.toString()}
      </button>
      <DefaultValue inputFieldOrArgument={inputField} />
      {inputField.description && <Markdown content={inputField.description} />}
    </div>
  );
};

export const SummaryType = ({
  resetTertiaryPaneOnClick,
  showDescription,
  type,
}: {
  resetTertiaryPaneOnClick: boolean;
  showDescription: boolean;
  type: GraphQLNamedType | GraphQLDirective;
}) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore();

  return (
    <div className={summaryTypeClass}>
      <button
        className={tertiaryTriggerButtonClass({
          color: "BLUE",
        })}
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: type,
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {type.name}
      </button>
      {showDescription && type.description && (
        <Markdown content={type.description} />
      )}
    </div>
  );
};

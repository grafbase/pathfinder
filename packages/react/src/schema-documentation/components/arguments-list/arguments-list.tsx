import { GraphQLArgument, isInputObjectType } from "graphql";

import { unwrapType } from "@pathfinder-ide/shared";

import { useSchemaDocumentationStore } from "../../store";

import { DefaultValue } from "../default-value";
import { Delimiter } from "../delimiter";
import { Markdown } from "../markdown";

import {
  argumentClass,
  argumentListClass,
  inputObjectName,
} from "./arguments-list.css";

import {
  returnTypeButtonClass,
  scalarArgumentNameClass,
} from "../../shared.styles.css";

export const ArgumentsList = ({
  args,
  resetTertiaryPaneOnClick,
  showBorder = false,
  showDescription = false,
}: {
  args: readonly GraphQLArgument[];
  resetTertiaryPaneOnClick: boolean;
  showBorder?: boolean;
  showDescription?: boolean;
}) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore();

  if (args.length < 1) {
    return null;
  } else {
    return (
      <div className={argumentListClass}>
        {args.map((a) => (
          <div
            className={argumentClass({
              showBorder,
              showDescription,
            })}
            key={a.name}
            data-testid="dsfsdfdsfdsf"
          >
            <div>
              {isInputObjectType(a.type) ? (
                <span className={inputObjectName}>{a.name}</span>
              ) : (
                <span className={scalarArgumentNameClass}>{a.name}</span>
              )}
              <Delimiter value=":" spacing="LEFT_AND_RIGHT" />
              <button
                className={returnTypeButtonClass}
                onClick={() =>
                  setActiveTertiaryPane({
                    destinationPane: unwrapType(a.type),
                    reset: resetTertiaryPaneOnClick,
                  })
                }
              >
                {a.type.toString()}
              </button>
              <DefaultValue inputFieldOrArgument={a} />
            </div>
            {showDescription && a.description && (
              <Markdown content={a.description} />
            )}
          </div>
        ))}
      </div>
    );
  }
};

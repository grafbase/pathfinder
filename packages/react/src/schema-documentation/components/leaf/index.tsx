import { unwrapType } from "@pathfinder-ide/shared";
import {
  GraphQLDirective,
  GraphQLEnumType,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
} from "graphql";

import { useSchemaDocumentationStore } from "../../store";

import { ArgumentsList } from "../arguments-list";
import {
  SectionDescription,
  Section,
  SectionEnumValues,
  SectionInputFields,
  SectionFields,
  SectionInterface,
  SectionPossibleTypes,
  SectionArguments,
} from "../section";

import { directiveLocationClass } from "./leaf.css";

import { returnTypeButtonClass } from "../../shared.styles.css";

export const LeafDirective = ({
  directive,
}: {
  directive: GraphQLDirective;
}) => {
  return (
    <>
      <SectionDescription description={directive.description} />
      <Section lead="Arguments">
        {directive.args.length > 0 ? (
          <ArgumentsList
            args={directive.args}
            resetTertiaryPaneOnClick={false}
            showDescription={true}
            showBorder={true}
          />
        ) : (
          "This directive has no arguments"
        )}
      </Section>
      <Section lead="Locations">
        {directive.locations.map((d) => (
          <div key={d} className={directiveLocationClass}>
            {d}
          </div>
        ))}
      </Section>
    </>
  );
};

export const LeafEnum = ({ type }: { type: GraphQLEnumType }) => {
  return (
    <>
      <SectionDescription description={type.description} />
      <SectionEnumValues enumValues={type.getValues()} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LeafField = ({ field }: { field: GraphQLField<any, any> }) => {
  const { setActiveTertiaryPane } = useSchemaDocumentationStore();

  return (
    <>
      <SectionDescription description={field.description} />
      <Section lead="Return type">
        <button
          className={returnTypeButtonClass}
          onClick={() =>
            setActiveTertiaryPane({ destinationPane: unwrapType(field.type) })
          }
        >
          {field.type.toString()}
        </button>
      </Section>
      <SectionArguments args={field.args} />
    </>
  );
};

export const LeafInputObject = ({ type }: { type: GraphQLInputObjectType }) => {
  const fields = type.getFields();

  return (
    <>
      <SectionDescription description={type.description} />
      <SectionInputFields fields={fields} />
    </>
  );
};

export const LeafInterface = ({ int }: { int: GraphQLInterfaceType }) => {
  const fields = int.getFields();
  const interfaces = int.getInterfaces();

  return (
    <>
      <SectionDescription description={int.description} />
      <SectionFields fields={fields} resetTertiaryPaneOnClick={false} />
      <SectionInterface interfaces={interfaces} />
    </>
  );
};

export const LeafObject = ({ type }: { type: GraphQLObjectType }) => {
  const fields = type.getFields();
  const interfaces = type.getInterfaces();

  return (
    <>
      <SectionDescription description={type.description} />
      <SectionFields fields={fields} resetTertiaryPaneOnClick={false} />
      <SectionInterface interfaces={interfaces} />
    </>
  );
};

export const LeafScalar = ({ type }: { type: GraphQLScalarType }) => {
  return (
    <>
      {["String", "ID", "Int", "Float", "Boolean"].includes(type.name) && (
        <Section>
          <p>This is a built-in scalar type</p>
        </Section>
      )}
      <SectionDescription description={type.description} />
    </>
  );
};

export const LeafUnion = ({ type }: { type: GraphQLUnionType }) => {
  const types = type.getTypes();

  return (
    <>
      <SectionDescription description={type.description} />
      <SectionPossibleTypes possibleTypes={types} />
    </>
  );
};

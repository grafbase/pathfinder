import type { ReactNode } from 'react';
import type {
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLFieldMap,
  GraphQLInputFieldMap,
  GraphQLInterfaceType,
  GraphQLObjectType,
} from 'graphql';

import { ArgumentsList } from '../arguments-list';
import { Markdown } from '../markdown';
import { SummaryField, SummaryInputField, SummaryType } from '../summary';

import { enumValueClass, sectionClass, sectionLeadClass } from './section.css';

export const Section = ({ children, lead }: { children: ReactNode; lead?: string }) => {
  return (
    <section className={sectionClass}>
      {lead && <span className={sectionLeadClass}>{lead}</span>}
      {children}
    </section>
  );
};

export const SectionArguments = ({ args }: { args: readonly GraphQLArgument[] }) => {
  return (
    <Section lead="Arguments">
      {args.length > 0 ? (
        <ArgumentsList
          args={args}
          resetTertiaryPaneOnClick={false}
          showBorder={true}
          showDescription={true}
        />
      ) : (
        <Markdown content={'This field has no arguments'} />
      )}
    </Section>
  );
};

export const SectionDescription = ({
  description,
  lead = 'Description',
}: {
  description: string | null | undefined;
  lead?: string;
}) => {
  return (
    <Section lead={lead}>
      <Markdown content={description || 'No description provided'} />
    </Section>
  );
};

export const SectionEnumValues = ({
  enumValues,
}: {
  enumValues: readonly GraphQLEnumValue[];
}) => {
  return (
    <Section lead="Values">
      {enumValues.map((val) => (
        <div key={val.name}>
          <div className={enumValueClass}>{val.name}</div>
          {val.description && <Markdown content={val.description} />}
        </div>
      ))}
    </Section>
  );
};

export const SectionFields = ({
  fields,
  parentType,
  resetTertiaryPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any>;
  parentType?: GraphQLObjectType;
  resetTertiaryPaneOnClick: boolean;
}) => {
  return (
    <>
      {Object.keys(fields).length > 0 ? (
        <Section lead="Fields">
          {Object.keys(fields)
            .sort()
            .map((f) => (
              <SummaryField
                key={fields[f].name}
                field={fields[f]}
                parentType={parentType}
                resetTertiaryPaneOnClick={resetTertiaryPaneOnClick}
              />
            ))}
        </Section>
      ) : null}
    </>
  );
};

export const SectionInputFields = ({ fields }: { fields: GraphQLInputFieldMap }) => {
  return (
    <>
      {Object.keys(fields).length > 0 ? (
        <Section lead="Input Fields">
          {Object.keys(fields)
            .sort()
            .map((f) => (
              <SummaryInputField key={fields[f].name} inputField={fields[f]} />
            ))}
        </Section>
      ) : null}
    </>
  );
};

export const SectionInterface = ({
  interfaces,
}: {
  interfaces: readonly GraphQLInterfaceType[];
}) => {
  return (
    <>
      {interfaces.length > 0 ? (
        <Section lead="Implements">
          {[...interfaces].sort().map((inter) => (
            <SummaryType
              key={inter.name}
              resetTertiaryPaneOnClick={false}
              showDescription={true}
              type={inter}
            />
          ))}
        </Section>
      ) : null}
    </>
  );
};

export const SectionPossibleTypes = ({
  possibleTypes,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  possibleTypes: readonly GraphQLObjectType<any, any>[];
}) => {
  return (
    <>
      {possibleTypes.length > 0 ? (
        <Section lead="Possible types">
          {possibleTypes.map((f) => (
            <SummaryType
              key={f.name}
              resetTertiaryPaneOnClick={false}
              showDescription={true}
              type={f}
            />
          ))}
        </Section>
      ) : null}
    </>
  );
};

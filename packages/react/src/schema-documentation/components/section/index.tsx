import { type ReactNode } from 'react';
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
import { useVirtualizer } from '@tanstack/react-virtual';

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
  getScrollElement,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any>;
  parentType?: GraphQLObjectType;
  resetTertiaryPaneOnClick: boolean;
  getScrollElement: () => HTMLElement | null;
}) => {
  const fieldsKeysSorted = Object.keys(fields ?? {}).sort();

  const count = fieldsKeysSorted.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement,
    estimateSize: () => 22,
    scrollMargin: 200, // This is to account for the space taken by the "root property type" & "description" sections
  });

  const items = virtualizer.getVirtualItems();

  if (fieldsKeysSorted.length === 0) {
    return null;
  }

  return (
    <Section lead="Fields">
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${(items[0]?.start ?? 0) - virtualizer.options.scrollMargin}px)`,
          }}
        >
          {items.map((virtualRow) => {
            const fieldKey = fieldsKeysSorted[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
              >
                <SummaryField
                  key={fields[fieldKey].name}
                  field={fields[fieldKey]}
                  parentType={parentType}
                  resetTertiaryPaneOnClick={resetTertiaryPaneOnClick}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
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

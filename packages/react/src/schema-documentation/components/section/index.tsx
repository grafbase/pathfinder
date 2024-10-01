import { useMemo, useRef, useState, type ReactNode } from 'react';
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

import {
  enumValueClass,
  sectionClass,
  sectionFieldsClasses,
  sectionLeadClass,
} from './section.css';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Icon } from '../../../components';

export const Section = ({
  children,
  lead,
  className,
}: {
  children: ReactNode;
  lead?: string;
  className?: string;
}) => {
  return (
    <section className={`${sectionClass} ${className ?? ''}`}>
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
  const parentRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState('');

  const fieldsSorted = useMemo(() => {
    return Object.keys(fields ?? {}).sort();
  }, [fields]);

  const fieldsFilteredBySearch = useMemo(() => {
    return fieldsSorted.filter((field) =>
      field.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [fieldsSorted, searchValue]);

  const count = fieldsFilteredBySearch.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 22,
  });

  const items = virtualizer.getVirtualItems();

  if (fieldsSorted.length === 0) {
    return null;
  }

  return (
    <Section lead="Fields" className={sectionFieldsClasses.container}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div className={sectionFieldsClasses.searchContainer}>
          <div className={sectionFieldsClasses.searchInputWrapper}>
            <Icon name="MagnifingGlass" size="small" />
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={sectionFieldsClasses.searchInput}
            />
          </div>
        </div>
        <div ref={parentRef} className={sectionFieldsClasses.fieldsListContainer}>
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
                const fieldKey = fieldsFilteredBySearch[virtualRow.index];

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

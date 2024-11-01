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

import { enumValueClass, sectionStyles } from './section.css';
import { useVirtualizer } from '@tanstack/react-virtual';
import fuzzysort from 'fuzzysort';
import { ListItemField, ListItemInputField, ListItemType } from '../list-item';
import { listClasses } from '../list.css';
import { schemaDocumentationStyles } from '../schema-documentation/schema-documentation.css';

export const Section = ({
  children,
  className,
  lead,
  withSeparator = false,
}: {
  children: ReactNode;
  className?: string;
  lead?: string;
  withSeparator?: boolean;
}) => {
  return (
    <section
      className={`${sectionStyles.container({ withSeparator })} ${className ?? ''}`}
    >
      {lead && <span className={sectionStyles.lead}>{lead}</span>}
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
          resetDetailsPaneOnClick={false}
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
  resetDetailsPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any>;
  parentType?: GraphQLObjectType;
  resetDetailsPaneOnClick: boolean;
  hideSearch?: boolean;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [searchValue] = useState('');

  const allFields = useMemo(() => {
    return Object.keys(fields ?? {})
      .sort()
      .map((fieldKey) => ({
        fieldKey,
        searchTarget: fuzzysort.prepare(fieldKey),
      }));
  }, [fields]);

  const fieldsFilteredBySearch = useMemo(() => {
    if (!searchValue) return allFields.map((f) => f.fieldKey);

    const results = fuzzysort
      .go(searchValue, allFields, {
        threshold: 0.4,
        limit: 20,
        key: 'searchTarget',
      })
      .map((res) => res.obj.fieldKey);

    return results;
  }, [allFields, searchValue]);

  const count = fieldsFilteredBySearch.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 22,
  });

  const virtualItems = virtualizer.getVirtualItems();

  if (allFields.length === 0) {
    return null;
  }

  return (
    <Section lead="Fields" className={listClasses.container}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          height: '100%',
        }}
      >
        {/* {!hideSearch && (
          <div className={sectionFieldsClasses.searchContainer}>
            <div className={sectionFieldsClasses.searchInputWrapper}>
              <Icon name="MagnifingGlass" size="small" />
              <input
                type="text"
                name="search"
                placeholder="Find field..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={sectionFieldsClasses.searchInput}
              />
            </div>
          </div>
        )} */}
        <div ref={parentRef} className={listClasses.fieldsListContainer}>
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
                transform: `translateY(${(virtualItems[0]?.start ?? 0) - virtualizer.options.scrollMargin}px)`,
              }}
            >
              {virtualItems.map((virtualRow) => {
                const fieldKey = fieldsFilteredBySearch[virtualRow.index];

                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                  >
                    <ListItemField
                      key={fields[fieldKey].name}
                      field={fields[fieldKey]}
                      parentType={parentType}
                      resetDetailsPaneOnClick={resetDetailsPaneOnClick}
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
          <div className={schemaDocumentationStyles.list}>
            {Object.keys(fields)
              .sort()
              .map((f) => (
                <ListItemInputField key={fields[f].name} inputField={fields[f]} />
              ))}
          </div>
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
            <ListItemType
              key={inter.name}
              resetDetailsPaneOnClick={false}
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
            <ListItemType
              key={f.name}
              resetDetailsPaneOnClick={false}
              showDescription={true}
              type={f}
            />
          ))}
        </Section>
      ) : null}
    </>
  );
};

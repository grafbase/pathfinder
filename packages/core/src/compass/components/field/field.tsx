import { FieldNode, isInterfaceType, isObjectType, isUnionType } from "graphql";

import { unwrapType } from "@pathfinder/shared";

import type { AncestorField, AncestorsArray } from "../../compass-store";

import { Arguments } from "../arguments";
import { Fields } from "../fields";
import { ListItem } from "../list-item";
import { Union } from "../union";

export const Field = ({ ancestors }: { ancestors: AncestorsArray }) => {
  const { field, selection } = ancestors[ancestors.length - 1] as AncestorField;

  const unwrappedType = unwrapType(field.type);

  const isCollapsible =
    isObjectType(unwrappedType) ||
    isUnionType(unwrappedType) ||
    isInterfaceType(unwrappedType) ||
    field.args.length > 0;

  const parentSelections = () => {
    if (selection && "selectionSet" in selection && selection.selectionSet) {
      return selection.selectionSet.selections;
    }
    return [];
  };

  let childFieldsToRender: React.ReactNode = null;

  if (isObjectType(unwrappedType) || isInterfaceType(unwrappedType)) {
    const fields = unwrappedType.getFields();
    childFieldsToRender = fields && (
      <Fields
        ancestors={ancestors}
        fields={unwrappedType.getFields()}
        parentSelections={parentSelections()}
      />
    );
  } else if (isUnionType(unwrappedType)) {
    childFieldsToRender = (
      <Union
        ancestors={ancestors}
        parentSelections={parentSelections()}
        unionType={unwrappedType}
      />
    );
  }

  return (
    <ListItem
      ancestors={ancestors}
      collapsibleContent={
        isCollapsible
          ? {
              arguments: field.args.length > 0 && (
                <Arguments
                  ancestors={ancestors}
                  selection={selection as FieldNode}
                />
              ),
              childFields: childFieldsToRender,
            }
          : undefined
      }
      isSelected={!!selection}
      type={field}
      variant="FIELD"
    />
  );
};

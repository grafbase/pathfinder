import {
  ArgumentNode,
  GraphQLArgument,
  GraphQLField,
  OperationDefinitionNode,
  OperationTypeNode,
  SelectionNode,
} from 'graphql';

type AncestorSelection = SelectionNode | null;

export type AncestorRoot = {
  type: 'ROOT';
  operationType: OperationTypeNode;
  operationDefinition: OperationDefinitionNode | null;
};

export type AncestorArgument = {
  type: 'ARGUMENT';
  argument: GraphQLArgument;
  selection: ArgumentNode | undefined;
};

export type AncestorField = {
  type: 'FIELD';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selection: AncestorSelection;
};

export type AncestorInlineFragment = {
  type: 'INLINE_FRAGMENT';
  onType: string;
  selection: AncestorSelection;
};

export type AncestorTypes =
  | AncestorRoot
  | AncestorField
  | AncestorInlineFragment
  | AncestorArgument;

export type AncestorsArray = AncestorTypes[];

type ToggleSignature = ({ ancestors }: { ancestors: AncestorsArray }) => void;

type ArgumentHandlingMode = 'INLINE' | 'WITH_VARIABLE';

export type CompassState = {
  argumentHandlingMode: ArgumentHandlingMode;
};

export type CompassActions = {
  addTargetArgument: ({
    previousAncestor,
    rootAncestor,
    target,
  }: {
    previousAncestor: AncestorField;
    rootAncestor: AncestorRoot;
    target: AncestorArgument;
  }) => void;
  addTargetField: ({
    ancestors,
    previousAncestor,
    rootAncestor,
    target,
  }: {
    ancestors: AncestorsArray;
    previousAncestor: Exclude<AncestorTypes, AncestorArgument>;
    rootAncestor: AncestorRoot;
    target: AncestorField;
  }) => void;
  removeTargetArgument: ({ target }: { target: AncestorArgument }) => void;
  removeTargetField: ({
    ancestors,
    previousAncestor,
    target,
  }: {
    ancestors: AncestorsArray;
    previousAncestor: AncestorTypes;
    target: AncestorField;
  }) => void;
  setArgumentHandlingMode: ({ mode }: { mode: ArgumentHandlingMode }) => void;
  toggle: ToggleSignature;
};

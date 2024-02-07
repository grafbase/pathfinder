import { Kind, type SelectionSetNode } from 'graphql';

enum Directive {
  Defer = 'defer',
}

export const usingDefer = (set: SelectionSetNode | undefined): boolean =>
  set?.selections.some((selection) => {
    // add Kind.FRAGMENT_SPREAD once we support named fragments
    const inlineFragment = selection.kind == Kind.INLINE_FRAGMENT;
    const usingDeferOnCurrentSelection =
      inlineFragment &&
      (selection.directives?.some((node) => node.name.value === Directive.Defer) ??
        false);
    const hasSelectionSet = 'selectionSet' in selection;
    return (
      usingDeferOnCurrentSelection ||
      (hasSelectionSet && usingDefer(selection.selectionSet))
    );
  }) ?? false;

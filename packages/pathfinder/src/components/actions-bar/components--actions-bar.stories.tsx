import { ActionExecute } from "../action-execute/action-execute";
import { ActionPrettier } from "../action-prettier";
import { ActionsBar } from "./actions-bar";

export const OperationActions = () => {
  return (
    <ActionsBar
      actions={[<ActionPrettier />, <ActionExecute />]}
      title="Document"
    />
  );
};

export const ResponseActions = () => {
  return <ActionsBar actions={[]} title="Response" />;
};

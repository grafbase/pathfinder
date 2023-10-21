import { GraphQLArgument, GraphQLInputField, astFromValue, print } from 'graphql';

import { defaultValueClass } from './default-value.css';

export const DefaultValue = ({
  inputFieldOrArgument,
}: {
  inputFieldOrArgument: GraphQLInputField | GraphQLArgument;
}) => {
  const defaultValue = () => {
    if (inputFieldOrArgument.defaultValue !== undefined) {
      const ast = astFromValue(
        inputFieldOrArgument.defaultValue,
        inputFieldOrArgument.type,
      );
      if (!ast) {
        return null;
      }
      return print(ast);
    }
    return null;
  };

  const dVal = defaultValue();

  if (!dVal) {
    return null;
  }

  return (
    <>
      <span>=</span>
      <span className={defaultValueClass} title="Default value">
        {dVal}
      </span>
    </>
  );
};

import {
  type ArgumentNode,
  type GraphQLArgument,
  type GraphQLSchema,
  Kind,
  type ValueNode,
  isEnumType,
  isListType,
  isScalarType,
  print,
} from "graphql";

import { DEFAULT_SCALAR_VALUES } from "../constants";

import { compassStore } from "../compass-store";

import { getEnumValues, unwrapType } from "../utils";

export const generateArgumentText = ({
  argument,
  schema,
}: {
  argument: GraphQLArgument;
  schema: GraphQLSchema;
}) => {
  const argumentHandlingMode = compassStore.getState().argumentHandlingMode;

  // defaults are set for "WITH_VARIABLE" handling mode
  let valueNode: ValueNode = {
    kind: Kind.VARIABLE,
    name: {
      kind: Kind.NAME,
      value: argument.name,
    },
  };
  let argumentNode: ArgumentNode = {
    kind: Kind.ARGUMENT,
    name: {
      kind: Kind.NAME,
      value: argument.name,
    },
    value: {
      ...valueNode,
    },
  };

  if (argumentHandlingMode === "INLINE") {
    const { name } = unwrapType(argument.type);

    if (isScalarType(argument.type)) {
      if (name === "String") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.STRING,
        };
      } else if (name === "ID") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.ID,
        };
      } else if (name === "Int") {
        valueNode = {
          kind: Kind.INT,
          value: DEFAULT_SCALAR_VALUES.INT,
        };
      } else if (name === "Float") {
        valueNode = {
          kind: Kind.FLOAT,
          value: DEFAULT_SCALAR_VALUES.FLOAT,
        };
      } else if (name === "Boolean") {
        valueNode = {
          kind: Kind.BOOLEAN,
          value: DEFAULT_SCALAR_VALUES.BOOLEAN,
        };
      } else if (name === "Date") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.DATE,
        };
      } else if (name === "DateTime") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.DATE_TIME,
        };
      } else if (name === "Email") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.EMAIL,
        };
      } else if (name === "IPAddress") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.IP_ADDRESS,
        };
      } else if (name === "Timestamp") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.TIMESTAMP,
        };
      } else if (name === "URL") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.URL,
        };
      } else if (name === "JSON") {
        valueNode = {
          kind: Kind.OBJECT,
          fields: DEFAULT_SCALAR_VALUES.JSON,
        };
      } else if (name === "PhoneNumber") {
        valueNode = {
          kind: Kind.STRING,
          value: DEFAULT_SCALAR_VALUES.PHONE_NUMBER,
        };
      }
    } else if (isEnumType(argument.type)) {
      const enumValues = getEnumValues({
        enumTypeName: argument.type.toString(),
        schema,
      });
      valueNode = {
        kind: Kind.ENUM,
        value: enumValues ? enumValues[0].value : "NO_ENUM_VALUE",
      };
    } else if (isListType(argument.type)) {
      valueNode = {
        kind: Kind.LIST,
        values: [],
      };
    } else {
      // default to object
      valueNode = {
        kind: Kind.OBJECT,
        fields: [],
      };
    }

    argumentNode = {
      ...argumentNode,
      value: {
        ...valueNode,
      },
    };
  }

  return print(argumentNode);
};

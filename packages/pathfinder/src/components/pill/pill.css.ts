import { contract, recipe } from "@graphql-pathfinder/style";

export const pillClass = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: contract.space[16],

    padding: "2px 4px",
    width: "fit-content",

    borderRadius: contract.space[2],

    fontFamily: contract.fonts.mono,
    fontSize: 8,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },

  variants: {
    color: {
      neutral: {
        color: contract.color.neutral[11],
        border: `1px solid ${contract.color.neutral[5]}`,
        backgroundColor: contract.color.neutral[4],
      },
      red: {
        color: contract.color.red[11],
        border: `1px solid ${contract.color.red[5]}`,
        backgroundColor: contract.color.red[4],
      },
      orange: {
        color: contract.color.orange[11],
        border: `1px solid ${contract.color.orange[5]}`,
        backgroundColor: contract.color.orange[4],
      },
      yellow: {
        color: contract.color.yellow[11],
        border: `1px solid ${contract.color.yellow[5]}`,
        backgroundColor: contract.color.yellow[4],
      },
      green: {
        color: contract.color.green[11],
        border: `1px solid ${contract.color.green[5]}`,
        backgroundColor: contract.color.green[4],
      },
      blue: {
        color: contract.color.blue[11],
        border: `1px solid ${contract.color.blue[5]}`,
        backgroundColor: contract.color.blue[4],
      },
      purple: {
        color: contract.color.purple[11],
        border: `1px solid ${contract.color.purple[5]}`,
        backgroundColor: contract.color.purple[4],
      },
    },
  },
});

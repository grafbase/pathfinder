import { contract, recipe } from "@pathfinder-ide/style";

export const pillClass = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: contract.space[16],
    paddingRight: 4,
    paddingLeft: 4,
    width: "fit-content",
    borderRadius: 2,
    fontFamily: contract.fonts.mono,
    fontSize: 9,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },

  variants: {
    color: {
      neutral: {
        color: contract.color.neutral[12],
        border: `1px solid ${contract.color.neutral[5]}`,
        backgroundColor: contract.color.neutral[2],
      },
      red: {
        color: contract.color.red[12],
        border: `1px solid ${contract.color.red[5]}`,
        backgroundColor: contract.color.red[2],
      },
      orange: {
        color: contract.color.orange[12],
        border: `1px solid ${contract.color.orange[5]}`,
        backgroundColor: contract.color.orange[2],
      },
      yellow: {
        color: contract.color.yellow[12],
        border: `1px solid ${contract.color.yellow[5]}`,
        backgroundColor: contract.color.yellow[2],
      },
      green: {
        color: contract.color.green[12],
        border: `1px solid ${contract.color.green[5]}`,
        backgroundColor: contract.color.green[2],
      },
      blue: {
        color: contract.color.blue[12],
        border: `1px solid ${contract.color.blue[5]}`,
        backgroundColor: contract.color.blue[2],
      },
      purple: {
        color: contract.color.purple[12],
        border: `1px solid ${contract.color.purple[5]}`,
        backgroundColor: contract.color.purple[2],
      },
    },
  },
});

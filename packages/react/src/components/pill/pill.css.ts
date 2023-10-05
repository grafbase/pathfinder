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
        color: contract.color.neutral[11],
        border: `1px solid ${contract.color.neutral[5]}`,
        backgroundColor: contract.color.neutral[1],
      },
      red: {
        color: contract.color.red[11],
        border: `1px solid ${contract.color.red[5]}`,
        backgroundColor: contract.color.red[1],
      },
      orange: {
        color: contract.color.orange[11],
        border: `1px solid ${contract.color.orange[5]}`,
        backgroundColor: contract.color.orange[1],
      },
      yellow: {
        color: contract.color.yellow[11],
        border: `1px solid ${contract.color.yellow[5]}`,
        backgroundColor: contract.color.yellow[1],
      },
      green: {
        color: contract.color.green[11],
        border: `1px solid ${contract.color.green[5]}`,
        backgroundColor: contract.color.green[1],
      },
      blue: {
        color: contract.color.blue[11],
        border: `1px solid ${contract.color.blue[5]}`,
        backgroundColor: contract.color.blue[1],
      },
      purple: {
        color: contract.color.purple[11],
        border: `1px solid ${contract.color.purple[5]}`,
        backgroundColor: contract.color.purple[1],
      },
    },
  },
});

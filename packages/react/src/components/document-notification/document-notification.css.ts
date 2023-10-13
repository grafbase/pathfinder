import { contract, globalStyle, style } from "@pathfinder-ide/style";

export const documentNotificationClass = style({
  width: "100%",
  backgroundColor: contract.color.orange[4],
  color: contract.color.orange[11],
  border: `1px solid ${contract.color.orange[6]}`,
  padding: contract.space[12],
  display: "flex",
  flexDirection: "column",
  gap: contract.space[8],
  fontSize: 12,
  marginTop: contract.space[12],
  borderRadius: contract.space[4],
});

globalStyle(`${documentNotificationClass} span`, {
  fontSize: 10,
  color: contract.color.orange[11],
  display: "block",
  textTransform: "uppercase",
  lineHeight: 1,
});

globalStyle(`${documentNotificationClass} p`, {
  color: contract.color.orange[12],
  padding: 0,
  margin: 0,
});

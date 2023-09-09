import { Fragment } from "react";

import { shared } from "@pathfinder/style";

import {
  actionsBarClass,
  actionsBarLeadClass,
  actionsBarLeftClass,
  actionsBarRightClass,
} from "./actions-bar.css";

export const ActionsBar = ({
  actions,
  title,
}: {
  actions: React.ReactNode[];
  title: string;
}) => {
  return (
    <div
      className={`${actionsBarClass} ${shared.hairlineBorder({
        border: "bottom",
        onSurface: 1,
      })}`}
    >
      <div className={actionsBarLeftClass}>
        <span className={actionsBarLeadClass}>{title}</span>
      </div>
      <div className={actionsBarRightClass}>
        {actions.map((action, i) => (
          <Fragment key={i}>{action}</Fragment>
        ))}
      </div>
    </div>
  );
};

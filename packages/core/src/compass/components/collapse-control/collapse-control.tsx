import { IconButton } from "../../../components/icon-button";
import { collapseControlClass } from "./collapse-control.css";

export const CollapseControl = ({
  isExpanded,
  setIsExpanded,
  title,
}: {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) => {
  return (
    <div className={collapseControlClass({ isExpanded })}>
      <IconButton
        action={() => setIsExpanded(!isExpanded)}
        iconName="Caret"
        title={title}
        size="small"
      />
    </div>
  );
};

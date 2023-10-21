import { iconClass } from './icon.css';
import { IconMap, IconProps } from './icon.types';

export const Icon = ({ name, rotate, size = 'small' }: IconProps) => {
  const TheIcon = IconMap[name];
  return (
    <div
      className={iconClass({
        rotate,
        size,
      })}
    >
      <TheIcon />
    </div>
  );
};

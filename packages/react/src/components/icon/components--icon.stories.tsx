import { Icon } from './icon';

export const Icons = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <span>Prettier</span>
        <Icon name="Prettier" />
        <Icon name="Prettier" rotate="90" />
        <Icon name="Prettier" rotate="180" />
        <Icon name="Prettier" rotate="270" />
      </div>
    </div>
  );
};

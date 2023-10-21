import { KBD } from './kbd';

export const Options = () => {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div>
        <span>COMMAND_CONTROL</span>
        <KBD shortcut="COMMAND_CONTROL" />
      </div>
      <div>
        <span>RETURN</span>
        <KBD shortcut="RETURN" />
      </div>
    </div>
  );
};

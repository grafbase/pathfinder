import { Pill } from './pill';

export const Options = () => {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Pill copy="a cool pill" variant={{ color: 'blue' }} />
      <Pill copy="a cool pill" variant={{ color: 'green' }} />
      <Pill copy="a cool pill" variant={{ color: 'neutral' }} />
      <Pill copy="a cool pill" variant={{ color: 'orange' }} />
      <Pill copy="a cool pill" variant={{ color: 'purple' }} />
      <Pill copy="a cool pill" variant={{ color: 'red' }} />
      <Pill copy="a cool pill" variant={{ color: 'yellow' }} />
    </div>
  );
};

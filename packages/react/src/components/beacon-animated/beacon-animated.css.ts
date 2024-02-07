import { contract, keyframes, style } from '@pathfinder-ide/style';

const pulse = keyframes({
  '0%': {
    transform: `scale(0.1, 0.1)`,
    opacity: `0.0`,
  },
  '50%': {
    opacity: `1.0`,
  },
  '100%': {
    transform: `scale(1, 1)`,
    opacity: `0.0`,
  },
});

export const beaconAnimatedStyles = {
  container: style({
    position: 'relative',
    height: 20,
    width: 20,
    flexShrink: 0,
  }),

  ring: style({
    border: `2px solid ${contract.color.green[10]}`,
    borderRadius: 30,
    height: 20,
    width: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    animation: `${pulse} 1s ease-out`,
    animationIterationCount: `infinite`,
    opacity: 0.0,
  }),

  circle: style({
    width: 6,
    height: 6,
    backgroundColor: contract.color.green[11],
    borderRadius: '50%',
    position: 'absolute',
    top: 7,
    left: 7,
  }),
};

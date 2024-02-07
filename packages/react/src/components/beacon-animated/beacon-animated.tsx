import { beaconAnimatedStyles } from './beacon-animated.css';

export const BeaconAnimated = () => {
  return (
    <div className={beaconAnimatedStyles.container}>
      <div className={beaconAnimatedStyles.ring}></div>
      <div className={beaconAnimatedStyles.circle}></div>
    </div>
  );
};

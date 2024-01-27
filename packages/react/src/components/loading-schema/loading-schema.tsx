import { CompassAnimated } from '../compass-animated';
import { loadingSchemaClass } from './loading-schema.css';

export const LoadingSchema = () => {
  return (
    <div className={loadingSchemaClass}>
      <span>Loading schema...</span>
      <CompassAnimated size="small" speed="standard" />
    </div>
  );
};

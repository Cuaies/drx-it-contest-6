import { StageDescriptions } from '../../core/constants';

/**
 * Description of a stage.
 */
export type StageDescription =
  (typeof StageDescriptions)[keyof typeof StageDescriptions];

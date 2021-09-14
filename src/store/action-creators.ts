import { AuthActionCreator } from './reducers/auth/action-creator';
import { EventActionCreator } from './reducers/event/action-creator';

export const allActionCreators = {
  ...AuthActionCreator,
  ...EventActionCreator,
};

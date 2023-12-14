/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import taskReducer from './tasks';
import categoryReducer from './categories';
import priorityReducer from './priorities';
import authReducer from './auth';
import pageReducer from './page';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    tasks: taskReducer,
    categories: categoryReducer,
    priorities: priorityReducer,
    auth: authReducer,
    page: pageReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import update from 'react-addons-update';
import { 
  PAGE_SET_TITLE
} from './types';

// The initial state of the App
export const initialState = {
  title: '',
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case PAGE_SET_TITLE:
        return update(state, {
          title: { $set: action.payload.title },
        });
        break;
    }
    return state;
  };

export default reducer;

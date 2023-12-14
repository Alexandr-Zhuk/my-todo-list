import update from 'react-addons-update';

import {
    SET_PRIORITY_LIST
} from './types';

export const initialState = {
    priorityList: []
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case SET_PRIORITY_LIST:
            return update(state, {
                priorityList: {$set: action.payload.priorityList},
            });
        break;
    }
    return state;
}

export default reducer;
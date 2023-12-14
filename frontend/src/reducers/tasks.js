import update from 'react-addons-update';

import {
    SET_TASKS_LIST,
    SET_URL_PARAMS
} from './types';

export const initialState = {
    tasksList: [],
    urlParams: {}
    
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case SET_TASKS_LIST:
            return update(state, {
                tasksList: {$set: action.payload.tasksList},
            });
        break;
        case SET_URL_PARAMS:
            return update(state, {
                urlParams: {$set: action.payload.urlParams}
            });
        break;    
    }
    return state;
}

export default reducer;
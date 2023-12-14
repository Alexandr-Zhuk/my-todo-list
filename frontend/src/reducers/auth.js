
import update from 'react-addons-update';

import {
    SET_ACCESS_TOKEN
} from './types';

export const initialState = {
    accessToken: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case SET_ACCESS_TOKEN:
            return update(state, {
                accessToken: {$set: action.payload.accessToken},
            });
        break;
    }
    return state;
}

export default reducer;
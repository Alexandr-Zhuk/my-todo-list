import update from 'react-addons-update';

import {
    SET_CATEGORY_LIST
} from './types';

export const initialState = {
    categoryList: []
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case SET_CATEGORY_LIST:
            return update(state, {
                categoryList: {$set: action.payload.categoryList},
            });
        break;
    }
    return state;
}

export default reducer;
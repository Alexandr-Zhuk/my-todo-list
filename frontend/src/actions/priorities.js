import {
    SET_PRIORITY_LIST
} from '../reducers/types';

// action creators
const actionGetPriorities = (priorityList) => ({
    type: SET_PRIORITY_LIST,
    payload: { priorityList }
});

const setPriorities = (priorityList, dispatch) => {
    const action = actionGetPriorities(priorityList);
    
    dispatch(action);
}

export { setPriorities };

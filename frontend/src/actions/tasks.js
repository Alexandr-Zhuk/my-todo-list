import {
    SET_TASKS_LIST,
    SET_URL_PARAMS
} from '../reducers/types';

// action creators
const actionGetTasks = (tasksList) => ({
    type: SET_TASKS_LIST,
    payload: { tasksList }
});

const setTasks = (tasksList, dispatch) => {
    const action = actionGetTasks(tasksList);
    
    dispatch(action);
}

const actionGetUrlParams = (urlParams) => ({
    type: SET_URL_PARAMS,
    payload: { urlParams }
});

const setUrlParams = (urlParams, dispatch) => {
    const action = actionGetUrlParams(urlParams);
    
    dispatch(action);
}

export { setTasks, setUrlParams };

import {
    SET_ACCESS_TOKEN,
    //SET_GOOGLE_ACCESS_TOKEN
} from '../reducers/types';

const actionSetAccessToken = (accessToken) => ({
    type: SET_ACCESS_TOKEN,
    payload: { accessToken: accessToken }
});

const setAccessToken = (accessToken, dispatch) => {
    const action = actionSetAccessToken(accessToken);
    dispatch(action);
};

/*
const actionSetGoogleAccessToken = (accessToken) => ({
    type: SET_GOOGLE_ACCESS_TOKEN,
    payload: { googleAccessToken: accessToken }
});

const setGoogleAccessToken = (accessToken, dispatch) => {
    const action = actionSetGoogleAccessToken(accessToken);
    dispatch(action);
};
*/
export {setAccessToken};
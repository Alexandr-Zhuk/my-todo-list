import {
    SET_CATEGORY_LIST
} from '../reducers/types';

// action creators
const actionGetCategories = (categoryList) => ({
    type: SET_CATEGORY_LIST,
    payload: { categoryList }
});

const setCategories = (categoryList, dispatch) => {
    const action = actionGetCategories(categoryList);
    
    dispatch(action);
}

export { setCategories };

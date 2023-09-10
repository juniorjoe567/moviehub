import { ADD_WATCHED_ITEM } from "../actionTypes/actionTypes";

const addToDataArray = (data) => ({
    type: ADD_WATCHED_ITEM,
    payload: data,
});
export { addToDataArray };
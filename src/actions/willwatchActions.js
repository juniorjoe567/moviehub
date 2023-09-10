import { ADD_TO_WILL_WATCH } from "../actionTypes/actionTypes";

const addToWillWatchDataArray = (data) => ({
    type: ADD_TO_WILL_WATCH,
    payload: data,
});
export { addToWillWatchDataArray };
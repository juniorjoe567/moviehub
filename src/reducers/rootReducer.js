// rootReducer.js
import { ADD_WATCHED_ITEM, DELETE_WATCHED_ITEM,ADD_TO_WILL_WATCH } from "../actionTypes/actionTypes";

const initialState = {
    watchedMovies: [], // Initial empty array
    willWatchMovies:[]
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WATCHED_ITEM:
      //console.log(initialState.watchedMovies)
      return {
        
        ...state,
        watchedMovies: [...state.watchedMovies, action.payload],
      };
      case ADD_TO_WILL_WATCH:
      return {
        ...state,
        willWatchMovies: [...state.willWatchMovies, action.payload],
      };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

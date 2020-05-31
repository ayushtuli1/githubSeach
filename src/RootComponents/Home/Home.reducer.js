import { Switch } from "react-router-dom";

const _initialState = {
    data: [],
    loading: false,
    error:""
};
function home(state, action) {
    state = state || _initialState;
    let newState;
    switch (action.type) {
      case "LOAD_DATA":
        newState = Object.assign({}, state);
        newState.data = action.data;
        newState.loading = false;
        return newState;
      case "SHOW_LOADER":
        newState = Object.assign({}, state);
        newState.loading = true;
        return newState;
      case "HIDE_LOADER":
        newState = Object.assign({}, state);
        newState.loading = false;
        return newState;
      case "CLEAR_DATA":
        newState = Object.assign({}, state);
        newState.data = [];
        newState.loading = false;
        return newState;
      case "SHOW_ERROR":
        newState = Object.assign({}, state);
        newState.data = []
        newState.error = "No Result Found";
        newState.loading = false;
        return newState;
      default:
        return state;
    }
}

export default home;

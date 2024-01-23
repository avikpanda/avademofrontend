const initialState = {
  state: "",
  data: [],
};

export default function aiTouchpointsDataReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "RESET_REDUCERS":
      return initialState;
    default:
      return state;
  }
}

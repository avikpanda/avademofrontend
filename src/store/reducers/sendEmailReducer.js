const initialState = {
  status: "",
};

export default function sendEmailReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_REDUCERS":
      return initialState;
    default:
      return state;
  }
}

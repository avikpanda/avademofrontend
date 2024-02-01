const initialState = {
  data: [],
};

export default function aiTouchpointsDataReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_AI_TOUCHPOINT":
      return {
        data: [...state.data, action.payload],
      };
    case "RESET_REDUCERS":
      return initialState;
    case "SET_SIMULATION_RESET":
      return initialState;
    default:
      return state;
  }
}

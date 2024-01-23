const initialState = {
  customerRecognizingTranscript: "",
  aiRecognizingTranscript: "",
  data: [],
};

export default function transcriptionReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CUSTOMER_RECOGNIZED_TRANSCRIPT":
      return {
        ...state,
        data: [
          ...state.data,
          {
            type: "customer",
            text: action.payload,
          },
        ],
      };
    case "SET_AI_RECOGNIZED_TRANSCRIPT":
      return {
        ...state,
        data: [
          ...state.data,
          {
            type: "ai",
            text: action.payload,
          },
        ],
      };
    case "SET_CUSTOMER_RECOGNIZING_TRANSCRIPT":
      return {
        ...state,
        customerRecognizingTranscript: action.payload,
      };
    case "SET_AI_RECOGNIZING_TRANSCRIPT":
      return {
        ...state,
        aiRecognizingTranscript: action.payload,
      };
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

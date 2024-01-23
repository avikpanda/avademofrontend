import { combineReducers } from "redux";
import aiTouchpointsReducer from "./reducers/aiTouchpointsDataReducer";
import applicationDataReducer from "./reducers/applicationDataReducer";
import sendEmailReducer from "./reducers/sendEmailReducer";
import transcriptionReducer from "./reducers/transcriptionReducer";

export default combineReducers({
  aiTouchpointsReducer,
  applicationDataReducer,
  sendEmailReducer,
  transcriptionReducer,
});

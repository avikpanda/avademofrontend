import { all, call } from "redux-saga/effects";
import { sendEmailWatcher } from "./sendEmailSaga";

export default function* rootSaga() {
  yield all([call(sendEmailWatcher)]);
}

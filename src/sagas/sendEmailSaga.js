import { call, put, takeEvery, select } from "redux-saga/effects";
import axios from "axios";

export function* sendEmailWorker(action) {
  try {
    const { customerName } = yield select(
      (state) => state.applicationDataReducer.customer
    );

    yield call(
      axios.post("http://localhost:8080/send-email", {
        templateType: action.payload,
        customerName: customerName,
        callSummary: action?.callSummary ?? "",
      })
    );
  } catch (e) {
    console.error("Error occured in send email sagas", e);
    yield put({ type: "SEND_EMAIL_ERROR" });
  }
  yield put({ type: "SEND_EMAIL_SUCCESS" });
}

export function* sendEmailWatcher() {
  yield takeEvery("SEND_EMAIL", sendEmailWorker);
}

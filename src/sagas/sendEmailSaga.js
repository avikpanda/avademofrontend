import { call, put, takeEvery, select } from "redux-saga/effects";
import axios from "axios";

export function* sendEmailWorker(action) {
  try {
    const customerName = yield select(
      (state) => state.applicationDataReducer?.customer?.customerName
    );

    const contactName = yield select(
      (state) => state.applicationDataReducer?.contactName
    );

    const callState = yield select(
      (state) => state.applicationDataReducer?.customer?.callState
    );

    const bodyFormData = new FormData();
    bodyFormData.append("templateType", action.payload);
    bodyFormData.append("customerName", callState === "incoming" ? "Aqua Packaging" : "Bottle Makers");
    bodyFormData.append("callSummary", action?.callSummary ?? "");
    bodyFormData.append("contactName", contactName);

    yield call(axios.post, "http://localhost:8080/send-email", bodyFormData);
  } catch (e) {
    console.error("Error occured in send email sagas", e);
    yield put({ type: "SEND_EMAIL_ERROR" });
  }
  yield put({ type: "SEND_EMAIL_SUCCESS" });
}

export function* sendEmailWatcher() {
  yield takeEvery("SEND_EMAIL", sendEmailWorker);
}

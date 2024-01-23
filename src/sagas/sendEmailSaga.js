import { delay, put, takeEvery } from "redux-saga/effects";

export function* sendEmailWorker() {
  yield delay(1000);
  yield put({ type: "SEND_EMAIL_SUCCESS" });
}

export function* sendEmailWatcher() {
  yield takeEvery("SEND_EMAIL", sendEmailWorker);
}

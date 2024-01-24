import { delay, put, takeEvery } from "redux-saga/effects";

export function* sendEmailWorker() {
  try {
    // yield call(axios.post('/user', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // }))
  } catch {
    console.error("");
  }
  yield put({ type: "SEND_EMAIL_SUCCESS" });
}

export function* sendEmailWatcher() {
  yield takeEvery("SEND_EMAIL", sendEmailWorker);
}

import { call, put, takeEvery, all } from "redux-saga/effects";

export function* helloSaga() {
  console.log("Hello Sagas!");
}

export const delay = ms => new Promise(res => setTimeout(res, ms));

// this is a worker saga
export function* incrementAsync() {
  yield call(delay, 1000); // call returns an Effect which instructs the middleware to call a given function with the given arguments
  // note that neither call nor put performs any dispatch by themselves. They return plain Javascript objects
  yield put({ type: "INCREMENT" }); // put() instructs the middleware to dispatch an INCREMENT action
}

// this is a watch saga
function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync); // takeEvery() listens for dispatched INCREMENT_ASYNC actions and runs incrementAsync each time
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}

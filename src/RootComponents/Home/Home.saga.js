import { call, put, select } from 'redux-saga/effects';

import axios from "axios";

/** API call to get data */

function getDataFromGitHub(query) {
  return axios.request({
    method: "get",
    url: `https://api.github.com/users/${query}/repos`,
  });
}

/** function to update the reducer based on API resposne  */
function* getData(action) {
    yield put({ type: 'SHOW_LOADER' });
    try {
      let { data } = yield call(getDataFromGitHub,action.data)
      yield put({ type: 'LOAD_DATA', data:data }); 
      yield put({ type: 'HIDE_LOADER' });
    } catch (e) {
       yield put({ type: 'SHOW_ERROR' });
        console.log(e);
    }
}

export default getData;

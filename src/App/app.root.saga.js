import { takeEvery, all } from 'redux-saga/effects';
import getData from '../RootComponents/Home/Home.saga';

export default () => all([takeEvery('GET_DATA', getData)]);

import logger from 'redux-logger';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bluetoothReducer from '../modules/bluetooth.reducer';
import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { bluetoothSaga } from '../modules/bluetooth.saga';

const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* rootSaga() {
  yield all([fork(bluetoothSaga)]);
};

const rootReducer = combineReducers({
  bluetooth: bluetoothReducer.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(logger).concat(sagaMiddleware);
  },
  devTools: process.env.NODE_ENV === 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

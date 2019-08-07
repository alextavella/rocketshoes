import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor,
});

const enhancer = process.env.NODE_ENV === 'development'
  ? compose(
    console.tron.createEnhancer(),
    applyMiddleware(sagaMiddleware)
  )
  : compose(
    applyMiddleware(sagaMiddleware)
  );

const persistConfig = {
  key: 'rocketshoes',
  storage,
  whitelist: ['cart'],
  // blacklist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };

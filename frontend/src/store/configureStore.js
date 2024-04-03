/**
 * Create the store with dynamic reducers
 */

import { createStore, compose } from 'redux';
import createReducer from './../reducers';
import { composeWithDevTools } from 'redux-devtools-extension'

//скопировал с персист стор
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
//import rootReducer from './reducers'
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const configureStore = function configureStore(initialState = {}) {
  //let composeEnhancers = compose;
  const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
   if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    //if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      // composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const rootReducer = createReducer();
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools()
  );

 
  //   store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry


  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./../reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }
  
  return store;
}

export { configureStore};

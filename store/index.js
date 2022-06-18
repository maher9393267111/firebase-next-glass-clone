

import {  applyMiddleware } from "redux"
import { configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from "next-redux-wrapper"
import thunk from "redux-thunk"
import reducers from "./reducer"


let   initialRootState


// const  middleware = getDefaultMiddleware => {
// getDefaultMiddleware({
//   serializableCheck: false,
// }),
// }


const combineMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  } else {
    return reducers(state, action)
  }
}

// const store = configureStore({ reducer: rootReducer })

const initStore = () => {

//  return 
  // configureStore({reducer, middleware:combineMiddleware([thunk])})

  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;



}

export const wrapper = createWrapper(initStore)









// // Import configureStore from redux toolkit 
// import { configureStore } from '@reduxjs/toolkit';

// // Import all of our reducers:
// import globalreducer from './global';

// // For next.js we need to use a wrapper, import it:
// import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// // Create our store using configureStore abstraction over createStore:
// const store = configureStore({ reducer: { global: globalreducer }, devTools: true });

// // The wrapper expects a makeStore function of type makeStore:
// const makeStore = () => store;

// // Create the next-redux-wrapper with our store:
// // We don't have to export the store, but we do have to export the wrapper
// export const wrapper = createWrapper(makeStore);

// // Export our store:
// // export default store;


import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// import { createBrowserHistory } from 'history';

import userReducer from 'store/modules/user/redux'
import videoReducer from './modules/video/redux';

// export const history = createBrowserHistory();

const rootReducer = combineReducers({
	user: userReducer,
	video: videoReducer,
});

// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
	reducer: rootReducer
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// export default function configureStore() {
// 	const store = createStore(rootReducer, applyMiddleware(thunk))

// 	return store;
// }

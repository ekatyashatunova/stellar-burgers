import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from '../services/slices/burgerConstructor';
import { feedReducer } from '../services/slices/feed';
import { authUserReducer } from '../services/slices/authUser';
import { orderReducer } from './slices/orders';
import { newOrderReducer } from '../services/slices/newOrder';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feeds: feedReducer,
  user: authUserReducer,
  orders: orderReducer,
  newOrder: newOrderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

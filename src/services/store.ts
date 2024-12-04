import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients/ingredients';
import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from './slices/burgerConstructor/burgerConstructor';
import { feedReducer } from './slices/feed/feed';
import { authUserReducer } from './slices/authUser/authUser';
import { orderReducer } from './slices/orders/orders';
import { newOrderReducer } from './slices/newOrder/newOrder';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feeds: feedReducer,
  user: authUserReducer,
  orders: orderReducer,
  newOrder: newOrderReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

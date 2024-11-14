import { configureStore } from '@reduxjs/toolkit';
import { IngredientsReducer } from './slices/ingredients';
import { combineReducers } from '@reduxjs/toolkit';
import { ConstructorReducer } from '../services/slices/burgerConstructor';
import { FeedReducer } from '../services/slices/feed';
import { authUserReducer } from '../services/slices/authUser';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: IngredientsReducer,
  burgerConstructor: ConstructorReducer,
  feeds: FeedReducer,
  user: authUserReducer
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

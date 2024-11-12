import { configureStore } from '@reduxjs/toolkit';
import { IngredientsReducer } from '../components/slices/ingredients';
import { combineReducers } from '@reduxjs/toolkit';
import { ConstructorReducer } from '../components/slices/burgerConstructor';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: IngredientsReducer,
  burgerConstructor: ConstructorReducer
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

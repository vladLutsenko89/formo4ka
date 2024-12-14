import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../reducers/form-reducer';

export const store = configureStore({
  reducer: {
    form: formReducer
  }
});
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: '',
  place: '',
  status: '',
  isLoading: false,
  result: {
    show: false,
    success: false,
    message: '',
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateInput: (state, action) => {
      state.input = action.payload;
    },
    updateSelect: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setResult: (state, action) => {
      state.result = {
        show: true,
        success: action.payload.success,
        message: action.payload.message,
      };
    },
    hideResult: (state) => {
      state.result.show = false;
    },
    resetForm: (state) => {
      // Оновлений спосіб скидання форми
      state.input = initialState.input;
      state.place = initialState.place;
      state.status = initialState.status;
      state.isLoading = initialState.isLoading;
      state.result = {
        show: initialState.result.show,
        success: initialState.result.success,
        message: initialState.result.message,
      };
    },
  },
});

export const {
  updateInput,
  updateSelect,
  setLoading,
  setResult,
  hideResult,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;

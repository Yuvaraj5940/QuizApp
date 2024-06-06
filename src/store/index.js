
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizSlice';
import HelperReducer from './slices/helper';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    Helper: HelperReducer,
  },
});

export default store;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuestionIndex: 0,
  score: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    resetQuiz: () => initialState,
  },
});

export const { setCurrentQuestionIndex, setScore, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;

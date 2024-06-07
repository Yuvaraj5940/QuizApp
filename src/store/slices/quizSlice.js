
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuestionIndex: 0,
  score: 0,
  AnswerArray:[],
  QuizArray:[]
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
    setAnswerAtIndex: (state, action) => {
      const { index, option } = action.payload;
      state.AnswerArray[index] = option;
    },
    setQuizArray:(state, action)=>{
      state.QuizArray = action.payload;
    }
  },
});

export const { setCurrentQuestionIndex, setScore, resetQuiz, setAnswerAtIndex, setQuizArray } = quizSlice.actions;

export default quizSlice.reducer;

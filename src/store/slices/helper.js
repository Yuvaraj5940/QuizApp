import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  terms: false,
  privacy: false,
  isCodeSend: false,
};

const HelperSlice = createSlice({
  name: "Helper",
  initialState,
  reducers: {
    HandleTerms: (state, action) => {
      state.terms = action.payload;
    },
    setPrivacy: (state, action) => {
      state.privacy = action.payload;
    },
    checkCodeSend: (state, action) => {(state.isCodeSend = action.payload)},
  },
});

export const { setPrivacy, HandleTerms, checkCodeSend } = HelperSlice.actions;

export default HelperSlice.reducer;

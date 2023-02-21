import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const threadSlice = createSlice({
  name: "thread",
  initialState: {
    value: {
      post: {},
      replies: [],
    },
  },
  reducers: {
    setThread: (state, action) => {
      state.value.post = action.payload[0].data.children[0].data;
      state.value.replies = action.payload[1].data.children;
    },
    clearThread: (state, action) => {
      state.value.post = {};
      state.value.replies = {};
    },
  },
});

export const fetchPostThunk = (permalink) => async (dispatch) => {
  const res = await axios.get(`https://www.reddit.com/${permalink}.json`);
  dispatch(setThread(res.data));
};

export const { setThread, clearThread } = threadSlice.actions;

export default threadSlice.reducer;

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
  },
});

export const fetchPostThunk = (permalink) => async (dispatch) => {
  const res = await axios.get(`https://www.reddit.com/${permalink}.json`);
  dispatch(setThread(res.data));
};

export const { setThread } = threadSlice.actions;

export default threadSlice.reducer;

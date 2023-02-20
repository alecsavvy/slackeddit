import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setPage } from "./pageSlice";

export const feedSlice = createSlice({
  name: "feed",
  initialState: {
    value: {},
  },
  reducers: {
    hydrate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const fetchFrontPageThunk = (sub) => async (dispatch) => {
  const res = await axios.get(
    `https://www.reddit.com/r/${sub}/.json?limit=100`
  );
  // reverse so most recent "message" is first
  res.data.data.children.reverse();
  dispatch(hydrate(res.data));
  dispatch(setPage(sub));
};

export const { hydrate } = feedSlice.actions;

export default feedSlice.reducer;

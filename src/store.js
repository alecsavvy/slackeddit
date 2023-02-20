import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import feedReducer, { fetchFrontPageThunk } from "./feedSlice";
import thunk from "redux-thunk";

export default configureStore(
  {
    reducer: {
      feed: feedReducer,
      page: pageReducer,
    },
  },
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

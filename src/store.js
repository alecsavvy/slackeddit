import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import threadReducer from "./threadSlice";
import feedReducer from "./feedSlice";
import thunk from "redux-thunk";

export default configureStore(
  {
    reducer: {
      feed: feedReducer,
      page: pageReducer,
      thread: threadReducer,
    },
  },
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

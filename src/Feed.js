import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import { useRef, useEffect, useState } from "react";
import { fetchFrontPageThunk } from "./feedSlice";
import { fetchPostThunk } from "./threadSlice";

export default () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) =>
    get(state, "feed.value.data.children", [])
  );
  const sub = useSelector((state) =>
    get(state, "feed.value.data.children[0].data.subreddit", "loading")
  );
  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      dispatch(fetchFrontPageThunk(inputValue, "", ""));
      setInputValue("");
    }
  };
  const onPostClickHandler = (permalink) => {
    dispatch(fetchPostThunk(permalink));
  };
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  return (
    <div className="feed">
      <div className="feed_header">
        <h1 className="feed_header_h1">
          #{sub}
          <input
            type="text"
            placeholder="search"
            onChange={onChangeHandler}
            value={inputValue}
            onKeyDown={onKeyDownHandler}
          />
        </h1>
      </div>
      {posts.map(({ data }) => (
        <div
          key={data.id}
          className="feed_post"
          onClick={() => onPostClickHandler(data.permalink)}
        >
          {!data.is_self && (
            <img
              src={data.thumbnail}
              className="feed_post_image"
              width="40"
              height="40"
            />
          )}
          <span>
            <div>{data.author}</div>
            <div>{data.created_utc}</div>
            <div>{data.title}</div>
          </span>
        </div>
      ))}
      <AlwaysScrollToBottom />
    </div>
  );
};

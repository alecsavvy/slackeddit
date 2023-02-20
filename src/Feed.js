import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import { useRef, useEffect, useState } from "react";
import { fetchFrontPageThunk } from "./feedSlice";

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
      dispatch(fetchFrontPageThunk(inputValue));
      setInputValue("");
    }
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
        <div key={data.id} className="feed_post">
          {data.title} {data.ups} {data.downs}
        </div>
      ))}
      <AlwaysScrollToBottom />
    </div>
  );
};
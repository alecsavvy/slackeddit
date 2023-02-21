import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import { useRef, useEffect, useState } from "react";
import { fetchFrontPageThunk } from "./feedSlice";
import { fetchPostThunk } from "./threadSlice";
import Message from "./Message";

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
    <div className="feed_container">
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
      <div className="feed">
        {posts.map(({ data }) => (
          <Message
            key={data.id}
            className="feed_post"
            onClick={() => onPostClickHandler(data.permalink)}
            author={data.author}
            message={data.title}
            time={data.created_utc}
            img={data.thumbnail}
          />
        ))}
        <AlwaysScrollToBottom />
      </div>
    </div>
  );
};

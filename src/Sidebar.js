import { useDispatch, useSelector } from "react-redux";
import { fetchFrontPageThunk } from "./feedSlice";

export default () => {
  const dispatch = useDispatch();
  const sub = useSelector((state) => state.page.value);
  const onClickHandler = (path, query) => {
    dispatch(fetchFrontPageThunk(sub, path, query));
  };
  return (
    <div className="sidebar">
      <h2>Channels</h2>
      <div className="sidebar_item" onClick={() => onClickHandler("hot", "")}>
        Hot
      </div>
      <div className="sidebar_item" onClick={() => onClickHandler("new", "")}>
        New
      </div>
      <div
        className="sidebar_item"
        onClick={() => onClickHandler("top", "t=hour")}
      >
        Now
      </div>
      <div
        className="sidebar_item"
        onClick={() => onClickHandler("top", "t=day")}
      >
        Today
      </div>
      <div
        className="sidebar_item"
        onClick={() => onClickHandler("top", "t=week")}
      >
        This Week
      </div>
      <div
        className="sidebar_item"
        onClick={() => onClickHandler("top", "t=month")}
      >
        This Month
      </div>
      <div
        className="sidebar_item"
        onClick={() => onClickHandler("top", "t=year")}
      >
        This Year
      </div>
      <div
        className="sidebar_item"
        onClick={() => onClickHandler("top", "t=all")}
      >
        All Time
      </div>
      <div
        className="sidebar_item"
        onClick={() => onClickHandler("rising", "")}
      >
        Rising
      </div>
    </div>
  );
};

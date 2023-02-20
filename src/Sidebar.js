import { useSelector } from "react-redux";

export default () => {
  const count = useSelector((state) => state.counter.value);
  return (
    <div className="sidebar">
      Sidebar!
      <span>{count}</span>
    </div>
  );
};

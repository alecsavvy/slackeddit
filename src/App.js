import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Thread from "./Thread";
import { isEmpty } from "lodash";

export default () => {
  const hasThread = useSelector((state) => !isEmpty(state.thread.value.post));
  return (
    <div className="container">
      <Sidebar />
      <Feed />
      {hasThread && <Thread />}
    </div>
  );
};

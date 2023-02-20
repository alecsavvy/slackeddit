import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Thread from "./Thread";

export default () => {
  return (
    <div className="container">
      <Sidebar />
      <Feed />
    </div>
  );
};

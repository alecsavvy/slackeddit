import { useSelector, useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const {
    post: {
      data: { children },
    },
    replies,
  } = useSelector((state) => state.thread.value);
  const thread = children[0].data;
  console.log(thread);
  return (
    <div className="thread">
      <h1>{thread.title}</h1>
    </div>
  );
};

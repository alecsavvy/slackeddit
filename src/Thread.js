import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const { post, replies } = useSelector((state) => state.thread.value);
  const isVideo = post.is_video;
  const isGifv = post.url.includes(".gifv");
  const isEmbed = !isEmpty(post.media_embed);
  const isImage = !post.is_self && !isVideo && !isEmbed;
  const isText = !isImage && !isVideo;
  console.log(
    `isVideo: ${isVideo} isGifv ${isGifv} isImage: ${isImage} isText: ${isText} isEmbed: ${isEmbed}`
  );
  const url = () => {
    let src;
    if (post.url_overridden_by_dest) {
      src = post.url_overridden_by_dest;
    } else {
      src = post.url;
    }
    return src.replace(".gifv", ".mp4");
  };
  return (
    <div className="thread">
      <h1>{post.title}</h1>
      {isVideo && (
        <video
          src={post.media.reddit_video.fallback_url}
          controls
          height="50%"
          loop
          autoPlay
        />
      )}
      {isGifv && <video src={url()} controls max-height="50%" loop autoPlay />}
      {isImage && <img src={url()} height="50%" />}
      {isText && <div>{post.body}</div>}
      {isEmbed && <iframe src={url()} height="50%" />}
      <Comments />
    </div>
  );
};

const Comments = () => {
  const { post, replies } = useSelector((state) => state.thread.value);
  return replies.map(({ data }) => {
    return <div key={data.id}>{data.body}</div>;
  });
};

export default ({ author, message, time, img, onClick }) => (
  <div onClick={() => onClick()} className="feed_post">
    <img src={img} width="40" height="40" className="feed_post_image" />
    <span>
      <div className="message_author">{author}</div>
      <div className="message_time">{new Date(time).toLocaleTimeString()}</div>
      <div>{message}</div>
    </span>
  </div>
);

import moment from "moment";

const RedditPost = ({ post }) => {
  // Converts Number to string Representation with K and M
  const formatNumber = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num <= 999) {
      return num;
    }
  };

  // Get the Time Since Content was Posted with Moment.js
  const getDate = (date) => {
    const dateTime = new Date(date * 1000);
    return moment(dateTime).fromNow();
  };

  return (
    <div className="box">
      <p className="upvotes">
        <i className="fas fa-angle-double-up arrow"></i>
        <br />
        {formatNumber(post.ups)}
        <br />
        <i className="fas fa-angle-double-down arrow"></i>
      </p>
      <p className="author">
        <span className="posted-by">Posted by</span> u/{post.author}{" "}
        <span className="date">{getDate(post.created_utc)}</span>
      </p>
      <p className="title">
        {post.link_flair_text ? (
          <span className="flair">{post.link_flair_text}</span>
        ) : (
          ""
        )}{" "}
        {post.title}
      </p>
      {post.url.endsWith(".jpg") ||
      post.url.endsWith(".gif") ||
      post.url.endsWith(".png") ? (
        <img src={post.url} className="images" alt="Subreddit Images" />
      ) : (
        ""
      )}
      <div className="gallery">
        {post.is_gallery
          ? post.gallery_data.items.map((item) => (
              <img
                src={`https://i.redd.it/${item.media_id}.jpg`}
                key={item.media_id}
                className="gallery-images"
                alt="Gallery Images"
              />
            ))
          : ""}
      </div>
      {post.is_video ? (
        <video controls className="videos">
          <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        ""
      )}
      <p className="comments">
        {post.num_comments > 1 ? (
          <i className="fas fa-comments"></i>
        ) : (
          <i className="fas fa-comment"></i>
        )}{" "}
        {post.num_comments > 1
          ? `${formatNumber(post.num_comments)} Comments`
          : `${post.num_comments} Comment`}
      </p>
    </div>
  );
};

export default RedditPost;

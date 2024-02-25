import React from "react";
import PropTypes from "prop-types";

const Post = React.forwardRef(({ post }, ref) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </>
  );

  const content = ref ? (
    <article ref={ref} className="post-wrapper">{postBody}</article>
  ) : (
    <article className="post-wrapper">{postBody}</article>
  );

  return content;
});

Post.displayName = "Post";
Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;

import { useCallback, useRef, useState } from "react";
import { usePosts } from "./hooks/usePosts";
import Post from "./Post";

function Example1() {
  const [pageNum, setPageNum] = useState(1);
  const { state } = usePosts(pageNum);
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (postRef) => {
      if (state.isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && state.hasNextPage) {
          console.log("We are near last post");
          setPageNum((prev) => prev + 1);
        }
      });

      if (postRef) intObserver.current.observe(postRef);
    },
    [state.hasNextPage, state.isLoading]
  );

  if (state.isError) return <p className="center">Error: {state.error}</p>;

  const content = state.data.map((post, i) => {
    if (state.data.length === i + 1)
      return <Post key={post.id} ref={lastPostRef} post={post} />;
    return <Post key={post.id} post={post} />;
  });

  return (
    <section className="container">
      <h3 id="top" className="center">
        Using React hooks only!
      </h3>
      <p className="center title">
        <a href="#top">Back to Top</a>
      </p>
      {content}
      {state.isLoading && <h3 className="center">Loading...</h3>}
    </section>
  );
}

export default Example1;

import { useCallback, useRef } from "react";
import { getPostsPerPage } from "./api/api";
import Post from "./Post";
import { useInfiniteQuery } from "react-query";

function Example2() {
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "/posts",
    ({ pageParam = 1 }) => getPostsPerPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length + 1 : undefined,
    }
  );
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (postRef) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near last post");
          fetchNextPage();
        }
      });

      if (postRef) intObserver.current.observe(postRef);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  if (status === "error")
    return <p className="center">Error: {error.message}</p>;

  const content = data?.pages.map((page) => {
    return page.map((post, i) => {
      if (page.length === i + 1)
        return <Post key={post.id} ref={lastPostRef} post={post} />;
      return <Post key={post.id} post={post} />;
    });
  });

  return (
    <section className="container">
      <h3 id="top" className="center">
        Using React Query!
      </h3>
      <p className="center title">
        <a href="#top">Back to Top</a>
      </p>
      {content}
      {isFetchingNextPage && <h3 className="center">Loading...</h3>}
    </section>
  );
}

export default Example2;

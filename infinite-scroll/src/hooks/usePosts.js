import { useEffect, useReducer } from "react";
import { getPostsPerPage } from "../api/api";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: "",
  hasNextPage: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return { ...state, isLoading: action.payload };

    case "Success":
      return {
        ...state,
        data: [...state.data, ...action.payload],
        isError: false,
        error: "",
      };

    case "Fail":
      return { ...state, isError: true, error: action.payload };

    case "NextPage":
      return { ...state, hasNextPage: action.payload };
  }
};

export const usePosts = (page = 1) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "Loading", payload: true });

    const controller = new AbortController();
    const { signal } = controller;

    getPostsPerPage(page, { signal })
      .then((res) => {
        dispatch({
          type: "Success",
          payload: [...res],
        });

        dispatch({
          type: "NextPage",
          payload: Boolean(res.length),
        });
      })
      .catch((error) => {
        if (signal.aborted) return;

        dispatch({
          type: "Fail",
          payload: error.message,
        });
      })
      .finally(() =>
        dispatch({
          type: "Loading",
          payload: false,
        })
      );

    return () => controller.abort();
  }, [page]);

  return { state };
};

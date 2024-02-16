import { useReducer, useEffect } from "react";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "REQUEST_PENDING":
      return { ...state, isLoading: true, error: null };
    case "REQUEST_FULFILLED":
      return { ...state, data: payload, isLoading: false };
    case "REQUEST_REJECTED":
      return { ...state, error: payload, isLoading: false };
    case "REQUEST_FINAL": {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};

const useRequest = (fn, config = {}) => {
  const { isManual = false, deps = [] } = config;
  const [state, dispatch] = useReducer(reducer, initialState);

  const request = async (...params) => {
    try {
      dispatch({ type: "REQUEST_PENDING" });
      const data = await fn(...params);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: "REQUEST_FINAL" });
    }
  };

  useEffect(() => {
    if (!isManual) {
      request()
        .then((data) => {
          dispatch({ type: "REQUEST_FULFILLED", payload: data });
        })
        .catch((error) => {
          dispatch({ type: "REQUEST_REJECTED", payload: error });
        });
    }
  }, deps);

  const result = isManual ? request : state.data;

  return { ...state, data: result };
};

export default useRequest;

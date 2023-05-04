import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: false,
    error: false,
  });
  // const cancelTokenSource = axios.CancelToken.source();

  const fetchData = useCallback(async () => {
    setFetchedData({
      data: [],
      isLoading: true,
      error: false,
    });
    try {
      const response = await axios.get(url);
      const data = await response.data;

      if (data) {
        setFetchedData({
          data: data.results ? data.results : data,
          isLoading: false,
          error: false,
        });
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log("Fetching data aborted");
      } else {
        console.log("Error occured", e);
      }
      setFetchedData({
        data: [],
        isLoading: false,
        error: true,
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  const { data, isLoading, error } = fetchedData;
  return { data, isLoading, error };
};

export default useFetch;

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchContributor = (tagUrl) => {
  const [fetchedData, setFetchedData] = useState({
    tagData: [],
    isLoading: false,
    error: false,
  });
  // const cancelTokenSource = axios.CancelToken.source();

  const fetchData = useCallback(async () => {
    setFetchedData({
        tagData: [],
      isLoading: true,
      error: false,
    });
    try {
      const response = await axios.get(tagUrl);
      const tagData = await response.data;

      if (tagData) {
        setFetchedData({
            tagData: tagData.results ? tagData.results : tagData,
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
        tagData: [],
        isLoading: false,
        error: true,
      });
    }
  }, [tagUrl]);

  useEffect(() => {
    fetchData();
  }, [tagUrl, fetchData]);

  const { tagData, isLoading, error } = fetchedData;
  return { tagData, isLoading, error };
};

export default useFetchContributor;

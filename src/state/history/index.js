import { useEffect, useState } from "react";
import { findLastTransaction } from "../../utils/API";

export const useTransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getPage, setPage] = useState(0);
  const [getSize, setSize] = useState(10);
  const [getHistoryInfo, setHistoryInfo] = useState(null);
  const [hasError, setHasError] = useState(null);

  const fetchData = (page, size) => {
    setIsLoading(true);
    findLastTransaction(page, size)
      .then(result => {
        setHistoryInfo(result);
        setHasError(null);
        setIsLoading(false);
      })
      .catch(reason => {
        setHistoryInfo(null);
        setHasError(reason);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(getPage, getSize);
  }, [getPage, getSize]);

  return [isLoading, getHistoryInfo, setPage, setSize, hasError, fetchData];
};

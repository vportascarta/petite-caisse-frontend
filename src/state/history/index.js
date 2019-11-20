import { useEffect, useState } from "react";
import { findLastTransaction } from "../../utils/API";

export const useTransactionHistory = size => {
  const [isLoading, setIsLoading] = useState(false);
  const [getPage, setPage] = useState(0);
  const [getSize, setSize] = useState(size);
  const [getHistory, setHistory] = useState([]);
  const [hasError, setHasError] = useState(null);

  const fetchData = (page, size) => {
    setIsLoading(true);
    findLastTransaction(page, size)
      .then(result => {
        setHistory(result);
        setHasError(null);
        setIsLoading(false);
      })
      .catch(reason => {
        setHistory([]);
        setHasError(reason);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(getPage, getSize);
  }, [getPage, getSize]);

  return [isLoading, getHistory, getPage, setPage, getSize, setSize, hasError];
};

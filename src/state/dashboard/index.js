import { useEffect, useState } from "react";
import { fetchDashboardInfo } from "../../utils/API";

export const useDashboardInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getInfo, setInfo] = useState(null);
  const [hasError, setHasError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    fetchDashboardInfo()
      .then(result => {
        setInfo(result);
        setHasError(null);
        setIsLoading(false);
      })
      .catch(reason => {
        setInfo(null);
        setHasError(reason);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [isLoading, getInfo, hasError, fetchData];
};

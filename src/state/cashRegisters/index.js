import { useEffect, useState } from "react";
import { fetchAllCashRegisters } from "../../utils/API";

export const useCashRegisters = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getCashRegisters, setCashRegisters] = useState([]);
  const [hasError, setHasError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    fetchAllCashRegisters()
      .then(result => {
        setCashRegisters(result);
        setHasError(null);
        setIsLoading(false);
      })
      .catch(reason => {
        setCashRegisters([]);
        setHasError(reason);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [isLoading, getCashRegisters, hasError, fetchData];
};

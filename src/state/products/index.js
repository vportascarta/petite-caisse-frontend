import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../utils/API";

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getProducts, setProducts] = useState([]);
  const [hasError, setHasError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    fetchAllProducts()
      .then(result => {
        setProducts(result);
        setHasError(null);
        setIsLoading(false);
      })
      .catch(reason => {
        setProducts([]);
        setHasError(reason);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [isLoading, getProducts, hasError, fetchData];
};

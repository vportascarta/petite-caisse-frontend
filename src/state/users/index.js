import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../utils/API";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getUsers, setUsers] = useState([]);
  const [hasError, setHasError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    fetchAllUsers()
      .then(result => {
        setUsers(result);
        setHasError(null);
        setIsLoading(false);
      })
      .catch(reason => {
        setUsers([]);
        setHasError(reason);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [isLoading, getUsers, hasError, fetchData];
};

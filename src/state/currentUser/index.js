import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../utils/API";
import { ACCESS_TOKEN } from "../../constants/API";

export const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [getCurrentUser, setCurrentUser] = useState(null);
  const [hasError, setHasError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    fetchCurrentUser()
      .then(result => {
        setIsAuth(true);
        setIsAdmin(result.roles.includes("ROLE_ADMIN"));
        setCurrentUser(result);
        setHasError(null);
        setIsLoading(false);
      })
      .catch(reason => {
        setIsAuth(false);
        setIsAdmin(false);
        setCurrentUser(null);
        setHasError(reason);
        setIsLoading(false);

        if (reason.status === 401) {
          window.localStorage.removeItem(ACCESS_TOKEN);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [isLoading, isAuth, isAdmin, getCurrentUser, hasError, fetchData];
};

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/AuthContext';

function UnprotectedRoute({ children }) {
  const { isAuthenticated, dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(true);
      const refresh = async () => {
        try {
          const res = await fetch(
            `http://${import.meta.env.VITE_API_DOMAIN}auth/me`,
            {
              method: 'GET',
              origin: true,
              credentials: 'include',
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          const data = await res.json();
          if (data.status === false) throw new Error(data.message);
          setIsLoading(false);
          dispatch({ type: 'LOGIN', payload: data });
          navigate('/app', { replace: true });
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
      };
      refresh();
    } else {
      setIsLoading(false);
      navigate('/app', { replace: true });
    }
  }, [dispatch, navigate, isAuthenticated]);

  return isAuthenticated || isLoading ? null : children;
}
UnprotectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UnprotectedRoute;

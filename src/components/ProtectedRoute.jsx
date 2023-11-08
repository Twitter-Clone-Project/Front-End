import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, dispatch } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}auth/me`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await res.json();
        if (data.status === false) throw new Error(data.message);
        dispatch({ type: 'LOGIN', payload: data });
      } catch (err) {
        dispatch({ type: 'LOGOUT' });
      }
    };
    refresh();
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;

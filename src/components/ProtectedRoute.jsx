import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/AuthContext';

/**
 * A component that renders its children only if the user is authenticated.
 * If the user is not authenticated, it redirects to the home page.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
  /**
   * The children components to be rendered if the user is authenticated.
   */
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

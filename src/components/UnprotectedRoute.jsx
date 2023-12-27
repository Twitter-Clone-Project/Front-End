import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/AuthContext';

/**
 * UnprotectedRoute component is used to render a route that should only be accessible to unauthenticated users.
 * If the user is authenticated, it will redirect to the '/app' route.
 *
 * @component
 * @example
 * ```jsx
 * <UnprotectedRoute>
 *   <LoginPage />
 * </UnprotectedRoute>
 * ```
 */
function UnprotectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [navigate, isAuthenticated]);

  return isAuthenticated ? null : children;
}

UnprotectedRoute.propTypes = {
  /**
   * The content to be rendered inside the UnprotectedRoute component.
   */
  children: PropTypes.node.isRequired,
};

export default UnprotectedRoute;

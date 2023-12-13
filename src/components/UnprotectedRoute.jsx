import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/AuthContext';

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
  children: PropTypes.node.isRequired,
};
export default UnprotectedRoute;

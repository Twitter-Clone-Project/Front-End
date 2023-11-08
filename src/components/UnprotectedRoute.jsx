import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/AuthContext';

function UnprotectedRoute({ children }) {
  const { isAuthenticated, dispatch } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const refresh = async () => {
  //     try {
  //       const res = await fetch(
  //         `http://${import.meta.env.VITE_API_DOMAIN}auth/me`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );
  //       const data = await res.json();
  //       if (data.status === false) throw new Error(data.message);
  //       dispatch({ type: 'LOGIN', payload: data });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   if (!isAuthenticated) refresh();
  // }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? null : children;
}
UnprotectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UnprotectedRoute;

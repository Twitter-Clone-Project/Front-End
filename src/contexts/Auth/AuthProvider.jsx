import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../hooks/AuthContext';
import reducer from './reducer';

const initialState = {
  user: null,
  isAuthenticated: false,
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ user, isAuthenticated, dispatch }),
        [user, isAuthenticated, dispatch],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.defaultProps = {
  children: null,
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;

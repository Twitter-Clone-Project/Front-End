import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../hooks/AuthContext';

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

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

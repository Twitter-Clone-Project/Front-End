import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../hooks/AuthContext';
import reducer from './reducer';

const initialState = {
  user: null,
  isAuthenticated: false,
};

/**
 * Provides authentication context to the application.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 * );
 * ```
 */

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ user, isAuthenticated, dispatch, token }),
        [user, isAuthenticated, dispatch, token],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  /**
   * The child components to be wrapped by the AuthProvider.
   */
  children: PropTypes.node.isRequired,
};
export default AuthProvider;

export default function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', action.payload.username);
      localStorage.setItem('isAuthenticated', true);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      if (state.isAuthenticated) {
        localStorage.setItem('user', null);
        localStorage.setItem('isAuthenticated', 'false');
      }
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

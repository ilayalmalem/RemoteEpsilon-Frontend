const AuthService = {
  isAuthenticated: () => {
    return localStorage.getItem('remote_epsilon_is_auth') == 'true' ? true : false;
  },
  authenticate: (user) => {
    localStorage.setItem('remote_epsilon_is_auth', 'true');
    localStorage.setItem('remote_epsilon_user', JSON.stringify(user))
  },
  getUser: () => JSON.parse(localStorage.getItem('remote_epsilon_user')),
  logout: () => {
    localStorage.removeItem('remote_epsilon_user');
    localStorage.setItem('remote_epsilon_is_auth', 'false')
  }
};

export default AuthService;
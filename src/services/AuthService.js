const AuthService = {
  isAuthenticated: () => {
    return localStorage.getItem('remote_epsilon_is_auth') == 'true' ? true : false;
  },
  authenticate: (user) => {
    const { id, password } = user;
    if(id == '216331470' && password == 'Ilay9876') {
      localStorage.setItem('remote_epsilon_is_auth', 'true');
      localStorage.setItem('remote_epsilon_user', JSON.stringify(user))
      return {
        state: true,
        errors: {
          id: '',
          password: ''
        }
      }
    }
    else {
      return {
        state: false,
        errors: {
          id: id != '216331470' ? 'מספר זהות שגוי.': '',
          password: password != 'Ilay9876' ? 'סיסמה לא נכונה.': ''
        }
      }
    }
  },
  getUser: () => JSON.parse(localStorage.getItem('remote_epsilon_user')),
  logout: () => {
    localStorage.removeItem('remote_epsilon_user');
    localStorage.setItem('remote_epsilon_is_auth', 'false')
  }
};

export default AuthService;
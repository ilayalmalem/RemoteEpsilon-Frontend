import axios from "axios";

const AuthService = {
  isAuthenticated: () => {
    return localStorage.getItem('remote_epsilon_access_token') !== null;
  },
  authenticate: async (user) => {
    const { id, password } = user;
    let response;
    await axios.post('http://127.0.0.1:8000/api/login', {
      uid: id,
      password: password
    }).then(r => {
      // successful
      localStorage.setItem('remote_epsilon_is_auth', 'true');
      localStorage.setItem('remote_epsilon_user', JSON.stringify(r.data.user))
      localStorage.setItem('remote_epsilon_access_token', r.data.token)
      response = {
        state: true,
      }
    }).catch(err => {
        response = {
          state: false,
          errors: {
            id: '',
            password: '',
            all: 'פרטים שגויים'
          }
        }
        return null;
    })

    return response;
  },
  getUser: () => JSON.parse(localStorage.getItem('remote_epsilon_user')),
  logout: () => {
    localStorage.removeItem('remote_epsilon_user');
    localStorage.setItem('remote_epsilon_is_auth', 'false')
    localStorage.removeItem('remote_epsilon_access_token')
  },
  authToken: () => {
    return localStorage.getItem('remote_epsilon_access_token');
  }
};

export default AuthService;
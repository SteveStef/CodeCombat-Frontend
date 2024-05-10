import { useState } from 'react';
import PropTypes from 'prop-types';
const url = 'http://localhost:8081';

LoginSignup.propTypes = {
  status: PropTypes.bool.isRequired,
  socket: PropTypes.object.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

const LoginSignup = (props) => {
  const [isLogin, setIsLogin] = useState(props.status);
  const [password2, setPassword2] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setError('Please fill in all fields');
        return;
      }

      let un = username.trim().toLowerCase();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: un, password }),
      };

      const response = await fetch(url + '/login', requestOptions);
      if (!response.ok) {
        if(response.status === 401) setError('Invalid credentials');
        else setError('Internal server error');
        return;
      }

      const data = await response.json();
      const { id } = data;

      document.cookie = `sessionid=${id}; path=/`;
      console.log(data);
      setError('');

      props.socket.send(JSON.stringify({type: "login", ...data}));
      props.setLoggedIn(true);
      props.setPage('username');
      props.setUser(data);

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password || !password2) {
        setError('Please fill in all fields');
        return;
      }
      if (password !== password2) {
        setError('Passwords do not match');
        return;
      }
      if(password.length < 6) {
        setError('Password too short');
        return;
      }
      let un = username.trim().toLowerCase();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: un, password }),
      };
      const response = await fetch(url + '/signup', requestOptions);
      if(!response.ok) {
        setError('Internal server error');
        return;
      } else {
        const data = await response.json();
        if(data.error) {
          setError("Username already exists");
          return;
        }

        setError('');
        console.log(data);

      }
    } catch (error) {
      console.error(error);
      setError("Internal server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
            {isLogin ? 'Login' : 'Sign Up'}
          </h1>
          <p className="text-red-500 p-2" style={{marginLeft: "20%"}}> {error} </p>
        </div>
        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="username">
              {
                isLogin
                  ? 'Username'
                  : 'Create Username'
              }
            </label>
            <input
              type="text"
              id="username"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="password">
              {
                isLogin
                  ? 'Password'
                  : 'Create Password'
              }
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {
            !isLogin && (
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="password2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )
          }

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
            <a
              href="#!"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => setIsLogin(!isLogin)}
            >
              { isLogin ? 'Need an account? Sign Up' : 'Have an account? Log In' }
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;


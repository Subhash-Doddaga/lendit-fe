import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { login, logout } from '../features/auth/authSlice'

const Login = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)

  const handleLogin = () => {
    const fakeUser = {
      id: '1',
      name: 'Lokesh',
      email: 'lokesh@example.com',
      token: 'abc123',
    }
    dispatch(login(fakeUser))
  }

  const handleLogout = () => dispatch(logout())

  return (
    <div>
      {auth.isAuthenticated ? (
        <div>
          <p>Welcome, {auth.user?.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}

export default Login;

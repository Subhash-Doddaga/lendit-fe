import { useSelector, useDispatch } from "react-redux";
import {logout} from '../features/auth/authSlice';
import type { RootState } from "../store";

export const Home = () => {
    const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user?.name}!</h1>
          <p>Email: {user?.email}</p>
          <button onClick={() => {
            dispatch(logout())
          }}>Logout</button>
        </div>
      ) : (
        <h1>Please login to access this page.</h1>
        
      )}
    </div>
  );
};

import { useSelector } from "react-redux";
import { useLogout } from "../api/auth/auth.hooks";
import type { RootState } from "../store";

export const Home = () => {
  const logoutMutation = useLogout();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user?.firstName} {user?.lastName}</h1>
          <p>Email: {user?.email}</p>
          <button onClick={() => {
            logoutMutation.mutate();
          }}>Logout</button>
        </div>
      ) : (
        <h1>Please login to access this page.</h1>
      )}
    </div>
  );
};

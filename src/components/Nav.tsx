import { NavLink, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import userSlice from "../redux/slices/userSlice";

  export default function Nav() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userSlice.actions.logout());
    
    navigate("/login");
  }

  return (
    <div className="nav">
      {user.user ? (
        <>
          <NavLink to={"/votes"}>Votes</NavLink>
          {user.user.isAdmin && (
            <NavLink to={"/statistics"}>Statistics</NavLink>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/register"}>Register</NavLink>
        </>
      )}
    </div>
  );
}
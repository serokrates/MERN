import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetUser } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    navigate("/");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Menu
      </a>
      <div id="navbarNavDropdown">
        <ul class="navbar-nav">
          {user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <Link to="/login">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    login <span class="sr-only">(current)</span>
                  </a>
                </li>
              </Link>
              <Link to="/register">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    register <span class="sr-only">(current)</span>
                  </a>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

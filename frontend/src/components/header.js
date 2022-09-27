import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Menu
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
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
          {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

import React from "react";
import { useState, useEffect } from "react";
// useSelector is used to select something from the state, if we want to dispatch a function as register, async thunk function or recent dunction in our reducer we use this
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2, status } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,

      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("passwords dont match");
    } else {
      const userData = {
        name,
        email,
        password,
        status: "active",
      };
      console.log(userData);
      dispatch(register(userData));
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2 class="text-center text-dark mt-5">Login Form</h2>
          <div class="text-center mb-5 text-dark">Made with bootstrap</div>
          <div class="card my-5">
            <form class="card-body cardbody-color p-lg-5" onSubmit={onSubmit}>
              <div class="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="name"
                  onChange={onChange}
                />
              </div>
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password2"
                  placeholder="confirm password"
                  value={password2}
                  onChange={onChange}
                />
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-color px-5 mb-5 w-100">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

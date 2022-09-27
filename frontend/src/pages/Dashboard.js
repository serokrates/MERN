import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import UsersForm from "../components/UsersForm";
import { getUsers, reset } from "../features/users/usersSlice";
import UserComponent from "../components/UserComponent";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getUsers());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log(users);
  return (
    <>
      <div>
        <h1>Welcome {user && user.name}</h1>
        <div>Dashboard - users</div>
      </div>
      <UsersForm />
      <div>
        <div class="form-check">
          {users.map(({ user }, key) => (
            <UserComponent key={key} user={users[key]} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

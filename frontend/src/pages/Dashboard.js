import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
      </div>
      <div>
        <div class="form-check">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">check</th>
                <th scope="col">createdAt</th>
                <th scope="col">email</th>
                <th scope="col">status</th>
                <th scope="col">updatedAt</th>
                <th scope="col">_id</th>
                <th scope="col">delete User</th>
                <th scope="col">unblock</th>
                <th scope="col">block</th>
              </tr>
            </thead>
            {users.map(({ user }, key) => (
              <UserComponent key={key} user={users[key]} index={key} />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

import React from "react";
import { useDispatch } from "react-redux";
import block from "../images/block.svg";
import unblock from "../images/unblock.svg";
import { deleteUser, changeStatus } from "../features/users/usersSlice";

function UserComponent({ user }) {
  const dispatch = useDispatch();
  return (
    <div class="container">
      <div class="row" style={{ border: "1px solid black" }}>
        <div class="col-sm">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </div>
        <div class="col-sm" align="center">
          {user.createdAt}
        </div>
        <div class="col-sm" align="center">
          {user.email}
        </div>
        <div class="col-sm" align="center">
          {user.status}
        </div>
        <div class="col-sm" align="center">
          {user.updatedAt}
        </div>
        <div class="col-sm" align="center">
          {user._id}
        </div>
        <div class="col-sm" align="center">
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => dispatch(deleteUser(user._id))}
          >
            Delete
          </button>
        </div>
        <div class="col-sm">
          <img
            src={block}
            style={{ width: "40px", minWidth: "40px" }}
            class="img-thumbnail"
            onClick={() => dispatch(changeStatus([user._id, "blocked"]))}
          />
        </div>
        <div class="col-sm">
          <img
            src={unblock}
            style={{ width: "40px", minWidth: "40px" }}
            class="img-thumbnail"
            onClick={() => dispatch(changeStatus([user._id, "active"]))}
          />
        </div>
      </div>
    </div>
  );
}

export default UserComponent;

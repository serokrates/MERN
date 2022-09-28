import React from "react";
import { useDispatch } from "react-redux";
import block from "../images/block.svg";
import unblock from "../images/unblock.svg";
import { deleteUser, changeStatus } from "../features/users/usersSlice";
import { useState, useEffect } from "react";

function UserComponent({ user, index }) {
  const [stateCustomer, setCustomerState] = useState([]);
  const dispatch = useDispatch();

  return (
    <tbody>
      <tr>
        <th scope="row">{index}</th>
        <td>
          <input type="checkbox" value="" id="flexCheckDefault" />
        </td>
        <td>{user.createdAt}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
        <td>{user.updatedAt}</td>
        <td>{user._id}</td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => dispatch(deleteUser(user._id))}
          >
            Delete
          </button>
        </td>
        <td>
          <img
            src={unblock}
            style={{ width: "40px", minWidth: "40px" }}
            class="img-thumbnail"
            onClick={() => dispatch(changeStatus([user._id, "active"]))}
          />
        </td>
        <td>
          <img
            src={block}
            style={{ width: "40px", minWidth: "40px" }}
            class="img-thumbnail"
            onClick={() => dispatch(changeStatus([user._id, "blocked"]))}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default UserComponent;

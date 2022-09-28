import React from "react";
import { useDispatch } from "react-redux";
import block from "../images/block.svg";
import unblock from "../images/unblock.svg";
import { deleteUser, changeStatus } from "../features/users/usersSlice";
import { useState, useEffect } from "react";

function UserComponent({ user, index }) {
  const [stateCustomer, setCustomerState] = useState([]);
  const dispatch = useDispatch();
  const deleteCustomerByIds = () => {
    let arrayids = [];
    stateCustomer.forEach((d) => {
      if (d.select) {
        arrayids.push(d.id);
      }
    });
  };

  return (
    <tbody>
      <tr>
        <th scope="row">{index}</th>
        <td>
          <input
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={(e) => {
              let value = e.target.checked;
              setCustomerState(
                stateCustomer.map((d) => {
                  d.select = value;
                  console.log(d);
                  return d;
                })
              );
            }}
          />
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

    // <div class="container">
    //   <div class="row" style={{ border: "1px solid black" }}>
    //     <div class="col-sm">
    //       <input
    //         class="form-check-input"
    //         type="checkbox"
    //         value=""
    //         id="flexCheckDefault"
    //       />
    //     </div>
    //     <div class="col-sm" align="center">
    //       {user.createdAt}
    //     </div>
    //     <div class="col-sm" align="center">
    //       {user.email}
    //     </div>
    //     <div class="col-sm" align="center">
    //       {user.status}
    //     </div>
    //     <div class="col-sm" align="center">
    //       {user.updatedAt}
    //     </div>
    //     <div class="col-sm" align="center">
    //       {user._id}
    //     </div>
    //     <div class="col-sm" align="center">
    //       <button
    //         type="button"
    //         class="btn btn-danger"
    //         onClick={() => dispatch(deleteUser(user._id))}
    //       >
    //         Delete
    //       </button>
    //     </div>
    //     <div class="col-sm">
    //       <img
    //         src={block}
    //         style={{ width: "40px", minWidth: "40px" }}
    //         class="img-thumbnail"
    //         onClick={() => dispatch(changeStatus([user._id, "blocked"]))}
    //       />
    //     </div>
    //     <div class="col-sm">
    //       <img
    //         src={unblock}
    //         style={{ width: "40px", minWidth: "40px" }}
    //         class="img-thumbnail"
    //         onClick={() => dispatch(changeStatus([user._id, "active"]))}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default UserComponent;

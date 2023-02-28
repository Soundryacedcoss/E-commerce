import React, { useEffect, useState } from "react";
// Only admin can access this page
export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("AllAccounts")) !== null) {
      setUsers(JSON.parse(localStorage.getItem("AllAccounts")));
    }
    setUsers(JSON.parse(localStorage.getItem("AllAccounts")));
  }, [users.length]);
  // delete data by admin
  const DeleteHandler = (e) => {
    users.forEach((element) => {
      if (e === element.id) {
        users.splice(element, 1);
        setUsers([...users]);
      }
      localStorage.setItem("AllAccounts", JSON.stringify(users));
    });
  };
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((val) => (
            <tr>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.userName}</td>
              <td>
                {
                  <button
                    className="btn btn-outline-warning button"
                    onClick={() => DeleteHandler(val.id)}
                  >
                    Delete
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

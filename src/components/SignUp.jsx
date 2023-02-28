import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addData } from "../Slice/DataSlice";
export const SignUp = () => {
  // using navigate to navigate other page
  const navigate = useNavigate();
  // useSelecer for using redux state data
  const outputData = useSelector((state) => state.dataSlice);
  // using usedispatch hook for dispaching action
  const dispatch = useDispatch();
  // ref for input box
  const NameRef = useRef();
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const UserNameRef = useRef();
  const RoleRef = useRef();
  var arr = [];
  // Sign up button functinality
  const SignUpHandler = () => {
    // validation
    if (NameRef.current.value === "") {
      alert("Please write name");
      NameRef.current.focus();
    } else if (EmailRef.current.value === "") {
      alert("Please write email");
      EmailRef.current.focus();
    } else if (PasswordRef.current.value === "") {
      alert("Please write Password");
      PasswordRef.current.focus();
    } else if (RoleRef.current.value === "") {
      alert("Please write role");
      RoleRef.current.focus();
    } else {
      var obj = {
        name: NameRef.current.value,
        email: EmailRef.current.value,
        password: PasswordRef.current.value,
        role: RoleRef.current.value,
        userName: UserNameRef.current.value,
        id: Math.random(),
      };
      arr.push(obj);
      // dispaching add data action
      dispatch(addData(obj));
      alert("Account created succesfully");
      // navigating to login page
      navigate("/Login");
    }
  };
  return (
    <div className="Login_container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          aria-label="name"
          aria-describedby="basic-addon1"
          ref={NameRef}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter your Email"
          aria-label="email"
          aria-describedby="basic-addon1"
          ref={EmailRef}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref={UserNameRef}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          aria-label="password"
          aria-describedby="basic-addon1"
          ref={PasswordRef}
        />
      </div>
      <select
        class="form-select"
        aria-label="Default select example"
        ref={RoleRef}
      >
        <option selected>Role</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Manager">Manager</option>
      </select>
      <div class="d-grid gap-2 mt-3">
        <button
          class="btn btn-warning"
          type="button"
          onClick={SignUpHandler}
        >
          Sign Up
        </button>
      </div>
      <Link to="/Login" className="mt-5">Already account</Link>
    </div>
  );
};

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export const Login = () => {
  // ref for input box
  const PasswordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  // login button function
  const LoginHandler = () => {
    // TAking users account data from local storage
    var Allaccount = JSON.parse(localStorage.getItem("AllAccounts"));
    // validation
    if (emailRef.current.value === "") {
      setMsg("PLease enter your email");
    } else if (PasswordRef.current.value === "") {
      setMsg("PLese enter your password");
    } else {
      Allaccount.forEach((element) => {
        if (
          element.email === emailRef.current.value &&
          element.password === PasswordRef.current.value &&
          element.role !== "Admin"
        ) {
          navigate("/ProductPage");
          localStorage.setItem("CurrentUser", JSON.stringify(element));
        } else if (
          element.email === emailRef.current.value &&
          element.password === PasswordRef.current.value &&
          element.role === "Admin"
        ) {
          alert("Dashboard will open");
          localStorage.setItem("CurrentUser", JSON.stringify(element));
          navigate("/AdminDashboard");
        } else if (
          element.email !== emailRef.current.value &&
          element.password !== PasswordRef.current.value
        ) {
          setMsg("credential Not matched!");
        }
      });
    }
  };
  const closeHandler = () => {
    setMsg("");
  };
  console.log(msg);
  return (
    <div className="Login_container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your Email"
          aria-label="email"
          aria-describedby="basic-addon1"
          ref={emailRef}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          aria-label="password"
          aria-describedby="basic-addon1"
          ref={PasswordRef}
        />
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-warning" type="button" onClick={LoginHandler}>
          Login
        </button>
      </div>
      <div style={{ marginTop: "5%" }}>
        <Link to={"/"}>don't have an account? create here</Link>
      </div>
      {msg === "" ? (
        ""
      ) : (
        <div
          class="alert alert-warning alert-dismissible fade show mt-3"
          role="alert"
        >
          {msg}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={closeHandler}
          ></button>
        </div>
      )}
    </div>
  );
};

import React, { useRef } from "react";
import { useNavigate } from "react-router";
export const CheckoutForm = () => {
  // ref for input box
  const firstName = useRef();
  const lastName = useRef();
  const contactNo = useRef();
  const address = useRef();
  const streetAddres = useRef();
  const navigate = useNavigate();
  // bill button function
  const BillHandler = () => {
    // validation
    if (firstName.current.value === "") {
      alert("Please enter your first name ");
      firstName.current.focus();
    } else if (contactNo.current.value === "") {
      alert("Please enter your mobile number ");
      contactNo.current.focus();
    } else if (contactNo.current.value.length < 10) {
      alert("Please enter write mobile number ");
      contactNo.current.focus();
    } else if (address.current.value === "") {
      alert("Please write your address ");
      address.current.focus();
    } else if (streetAddres.current.value === "") {
      alert("Please write your street address ");
      streetAddres.current.focus();
    } else {
      navigate("/Bill");
      let obj = {
        fullname: `${firstName.current.value} ${lastName.current.value}`,
        contact: contactNo.current.value,
        address: address.current.value,
        streetAddres: streetAddres.current.value,
      };
      localStorage.setItem("Customer", JSON.stringify(obj));
    }
  };
  return (
    <div className="Checkoutform_container">
      <div className="Userdetail_container">
        <h2 className="Cart_heading">Customer detail:</h2>
        <div>
          <span style={{ display: "flex", columnGap: "15%" }}>
            <input
              type="email"
              className="form-control w-75"
              placeholder="First name"
              aria-label="First Name"
              aria-describedby="basic-addon1"
              ref={firstName}
            />
            <input
              type="email"
              className="form-control w-75"
              placeholder="Last name"
              aria-label="Last name"
              aria-describedby="basic-addon1"
              ref={lastName}
            />
          </span>
        </div>
        <div className="form-floating mt-3">
          <span>
            <input
              type="text"
              className="form-control"
              placeholder="Conatct no"
              aria-label="Conatct no"
              aria-describedby="basic-addon1"
              ref={contactNo}
              minLength={10}
              maxLength={10}
            />
          </span>
        </div>
        <div className="form-floating mt-3">
          <span>
            <input
              type="email"
              className="form-control"
              placeholder="Address"
              aria-label="Address"
              aria-describedby="basic-addon1"
              ref={address}
            />
          </span>
        </div>
        <div className="form-floating mt-3">
          <span>
            <input
              type="email"
              className="form-control"
              placeholder="Street Address"
              aria-label="Street Address"
              aria-describedby="basic-addon1"
              ref={streetAddres}
            />
          </span>
        </div>
        <div class="d-grid gap-2">
          <button
            class="btn btn-outlined checkOut_button mt-4"
            type="button"
            onClick={BillHandler}
          >
            <i
              class="fas fa-file-invoice-dollar"
              style={{ fontSize: "26px" }}
            ></i>{" "}
            Bill
          </button>
        </div>
      </div>
    </div>
  );
};

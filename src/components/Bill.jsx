import React, { useEffect, useState } from "react";
export const Bill = () => {
  const [product, setProduct] = useState([]);
  let user = JSON.parse(localStorage.getItem("Customer"));
  let price = JSON.parse(localStorage.getItem("totalPrice"));
  useEffect(() => {
    // taking cart data
    let products = JSON.parse(localStorage.getItem("Cart"));
    setProduct([...products]);
  }, []);
  // printing bill
  const printHandler = () => {
    window.print();
  };
  return (
    <div className="Bill_container">
      <div className="row1">
        <h2>invoice</h2>
        <b style={{ color: "white" }}>
          Our Conatct: 1267291820 <br />
          Our email: zanodo.co.zo.com
        </b>
        <b style={{ color: "white" }}>
          Our address <br /> Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </b>
      </div>
      <div className="OrderDetail_container">
        <b>
          send to: <br />
          {user.fullname}
          <br />
          {user.address} <br /> {user.streetAddres}
          <p>{user.contact}</p>{" "}
        </b>
        <p>
          Invoice number: <br />
          00000{Math.floor(Math.random() * 10)}
        </p>
        <p>
          Total price: <br /> {price}
        </p>
      </div>
      <hr style={{ color: "#f88456" }} />
      <div className="Product_Container">
        <table class="table table-striped">
          <thead className="px-3">
            <th>Products</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </thead>
          <tbody>
            {product.map((val) => (
              <tr>
                <td className="w-25">
                  <img src={val.image} alt="" className="w-50" />
                </td>
                <td>{val.name}</td>
                <td>{val.quantity}</td>
                <td>{val.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-outline"
          style={{ float: "right" }}
          onClick={printHandler}
        >
          {" "}
          <i class="fa fa-print" style={{ fontSize: "36px" }}></i>
        </button>
      </div>
    </div>
  );
};

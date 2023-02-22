import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import removeIcon from "../Image/delete.png";
export const Cart = () => {
  // useing useNavigate hook for redirecting to other page
  const navigate = useNavigate();
  // state array
  const [cartArr, setCartArr] = useState([]);
  console.log(cartArr);
  // state for keep the total price
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    // taking data from local storage
    var cartItem = JSON.parse(localStorage.getItem("Cart"));
    setCartArr(cartItem);
  }, [dispatch]);
  var price = 0;
  useEffect(() => {
    if (cartArr !== null) {
      // culculating price
      cartArr.forEach((element) => {
        price += element.price * element.quantity;
        setTotalPrice(price);
      });
    }
  }, [cartArr]);
  // increse quantity function
  const IncreseHandler = (e) => {
    cartArr.forEach((element) => {
      if (element.id === parseInt(e.target.value)) {
        element.quantity = element.quantity + 1;
        setCartArr([...cartArr]);
      }
      localStorage.setItem("Cart", JSON.stringify(cartArr));
    });
  };
  // idecrese quantity function
  const DecreseHandler = (e) => {
    cartArr.forEach((element) => {
      if (element.id === parseInt(e.target.value) && element.quantity > 1) {
        element.quantity = element.quantity - 1;
        setCartArr([...cartArr]);
      }
      localStorage.setItem("Cart", JSON.stringify(cartArr));
    });
  };
  // remove item function
  const RemoveItemHandler = (e) => {
    cartArr.forEach((element) => {
      if (parseInt(e) === element.id) {
        cartArr.splice(element, 1);
        setCartArr([...cartArr]);
      }
    });
    localStorage.setItem("Cart", JSON.stringify(cartArr));
  };
  // checkout Function
  const CheckoutHandler = () => {
    navigate("/CheckoutForm");
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  };
  return (
    <>
      {cartArr.length === 0 ? (
        <div className="cart_Empty">
          <h3 style={{ alignItem: "center" }} className="Cart_heading">
            CART IS EMPTY
          </h3>
        </div>
      ) : (
        <div className="Card_container">
          <div className="Cart_product_container">
            <h2 className="Cart_heading">My Cart({cartArr.length})</h2>
            {cartArr !== null
              ? cartArr.map((val) => (
                  <>
                    <div className="Cart_products">
                      <div style={{ width: "45%" }}>
                        <img src={val.image} className="w-50 mx-4" alt="" />
                        <div>
                          <button
                            className="btn btn-outline w-25"
                            onClick={(e) => RemoveItemHandler(val.id)}
                          >
                            <img
                              src={removeIcon}
                              className="RemoveIcon"
                              alt=""
                              srcset=""
                            />
                          </button>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "20%",
                          marginTop: "5%",
                          fontSize: "1.9vw",
                        }}
                      >
                        <p>{val.name}</p>
                      </div>
                      <div
                        style={{
                          marginLeft: "10%",
                          marginTop: "5%",
                          fontSize: "1.9vw",
                          width: "30%",
                        }}
                      >
                        <p>₹{val.price}</p>
                        <button
                          className="btn btn-outline rounded-pill quantity_button"
                          value={val.id}
                          onClick={IncreseHandler}
                        >
                          +
                        </button>
                        {val.quantity}
                        <button
                          className="btn btn-outline rounded-pill quantity_button"
                          value={val.id}
                          onClick={DecreseHandler}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <hr />
                  </>
                ))
              : " "}
          </div>
          <div className="Summery_container">
            <h3 className="Cart_heading">Cart summery</h3>
            <hr />
            <p style={{ textAlign: "center", fontSize: "1.7vw" }}>
              Total Price:₹{totalPrice}
            </p>
            <p style={{ textAlign: "center", fontSize: "1.7vw" }}>
              shipping charge : ₹0{" "}
            </p>
            <hr />
            <h4 style={{ textAlign: "center" }}>Subtotal:₹{totalPrice}</h4>
            <div class="d-grid gap-2">
              <button
                class="btn btn-outlined checkOut_button mt-4"
                type="button"
                onClick={CheckoutHandler}
              >
                <i class="fa fa-shopping-bag" style={{ fontSize: "26px" }}></i>{" "}
                CheckOut
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

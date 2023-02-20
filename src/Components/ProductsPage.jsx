import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, clearSearch, fetchProducts } from "../Slice/DataSlice";
import "../Styling/ProductPage.css";
import { Navbar } from "./Navbar";
export const ProductsPage = () => {
  // taking product data from redux
  const data = useSelector((state) => state.DataSlice);
  const outputData = useSelector((state) => state.DataSlice.products.products);
  // taking search data from redux state
  const searchData = useSelector((state) => state.DataSlice.search);
  // state for keepoing cart data
  const [cartArr, setCartArr] = useState([]);
  // state for product data
  const [product, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  // dispatch for dispaching action
  const dispatch = useDispatch();
  const [stock, setStock] = useState("");
  const OrderRef = useRef();
  const sortByRef = useRef();
  let cart = JSON.parse(localStorage.getItem("Cart"));
  useEffect(() => {
    dispatch(fetchProducts());
    if (JSON.parse(localStorage.getItem("Cart")) !== null) {
      setCartArr(JSON.parse(localStorage.getItem("Cart")));
    }
    setCurrentUser(JSON.parse(localStorage.getItem("CurrentUser")));
  }, []);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Products")) !== null) {
      setProducts(JSON.parse(localStorage.getItem("Products")));
    } else if (outputData !== undefined) {
      var temp = [];
      outputData.forEach((element) => {
        var obj = {
          id: element.id,
          image: element.thumbnail,
          price: element.price,
          rating: element.rating,
          stock: element.stock,
          name: element.title,
        };
        temp.push(obj);
        setProducts(temp);
        localStorage.setItem("Products", JSON.stringify(temp));
      });
    }
  }, [outputData]);
  // Add button function
  const AddtoCartHandler = (e) => {
    if (cart.length !== 0) {
      cart.forEach((element) => {
        if (parseInt(e.target.value) === element.id) {
          alert("Item already in cart");
          cartArr.splice(element, 1);
          setCartArr([cartArr]);
        }
      });
    }
    //
    outputData.forEach((element) => {
      if (element.id === parseInt(e.target.value)) {
        console.log("hd");
        var obj = {
          name: element.title,
          id: element.id,
          stock: element.stock,
          price: element.price,
          image: element.thumbnail,
          quantity: 1,
        };
        cartArr.push(obj);
        setCartArr([...cartArr]);
        dispatch(addCart(cartArr));
      }
    });
  };
  // setting stock by manager
  const StockHandler = (e) => {
    setStock(e.target.value);
  };
  const UpdateStockHandler = (e) => {
    product.forEach((element) => {
      if (element.id === e) {
        element.stock = stock;
      }
      setProducts([...product]);
      localStorage.setItem("Products", JSON.stringify(product));
    });
  };
  // clear serch data fucntion
  const ClearSearchHandler = () => {
    dispatch(clearSearch());
  };
  // filter data
  const FilterHandler = () => {
    if (OrderRef.current.value === "") {
      alert("Please chose sorting order");
      OrderRef.current.focus();
    } else if (sortByRef.current.value === "") {
      alert("Please choose sort by");
      sortByRef.current.focus();
    } else {
      if (
        OrderRef.current.value === "Decending" &&
        sortByRef.current.value === "Price"
      ) {
        product.sort(function (a, b) {
          return a.price - b.price;
        });
        setProducts([...product]);
        sortByRef.current.value = "";
        OrderRef.current.value = "";
      } else if (
        OrderRef.current.value === "Accending" &&
        sortByRef.current.value === "Price"
      ) {
        product.sort(function (a, b) {
          return b.price - a.price;
        });
        setProducts([...product]);
        sortByRef.current.value = "";
        OrderRef.current.value = "";
      } else if (
        OrderRef.current.value === "Decending" &&
        sortByRef.current.value === "Rating"
      ) {
        product.sort(function (a, b) {
          return a.rating - b.rating;
        });
        setProducts([...product]);
        sortByRef.current.value = "";
        OrderRef.current.value = "";
      } else if (
        OrderRef.current.value === "Accending" &&
        sortByRef.current.value === "Rating"
      ) {
        product.sort(function (a, b) {
          return b.rating - a.rating;
        });
        setProducts([...product]);
        sortByRef.current.value = "";
        OrderRef.current.value = "";
      }
    }
  };
  // clear filter data
  const ClearHanlder = () => {
    setProducts(JSON.parse(localStorage.getItem("Products")));
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div style={{ paddingTop: "7.5%" }}>
        {data.loader === true ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                columnGap: "2%",
                marginLeft: "7%",
                marginRight: "10%",
                marginTop: "-5%",
              }}
              className="mt-5"
            >
              <select
                class="form-select w-25"
                aria-label="Default select example"
                ref={OrderRef}
              >
                <option selected value="">
                  Sort by
                </option>
                <option value="Decending"> Low to High</option>
                <option value="Accending">High to low</option>
              </select>
              <select
                class="form-select w-25"
                aria-label="Default select example"
                ref={sortByRef}
              >
                <option selected value="">
                  sort according to
                </option>
                <option value="Price">Price</option>
                <option value="Rating">Rating</option>
              </select>
              <button
                className="btn btn-outline-warning button w-25"
                onClick={FilterHandler}
              >
                Filter
              </button>
              <button
                className="btn btn-outline-warning button w-25"
                onClick={ClearHanlder}
              >
                Clear filter
              </button>
            </div>
            {searchData.length !== 0 ? (
              <div style={{ display: "flex" }}>
                {searchData.map((val) => (
                  <div className="Product_card" style={{ marginLeft: "8%" }}>
                    <img
                      src={val.image}
                      alt=""
                      srcset=""
                      className="Product_img"
                    />
                    <h3
                      style={{
                        height: "20%",
                        marginBottom: "4%",
                        marginLeft: "4%",
                      }}
                    >
                      {val.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        columnGap: "30%",
                        height: "5%",
                        width: "100%",
                        marginLeft: "4%",
                      }}
                    >
                      <p>STOCK:{val.stock}</p>
                      <p style={{ align: "right", marginLeft: "30%" }}>
                        {val.rating}⭐
                      </p>
                    </div>
                    <p style={{ marginLeft: "4%" }}>PRICE:₹{val.price}</p>
                    {currentUser.role === "User" ? (
                      <button
                        className="btn btn-outline-warning button"
                        style={{ margin: "0% 34%" }}
                        onClick={AddtoCartHandler}
                        value={val.id}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <div class="input-group mb-3 ms-5 w-75">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                          onChange={StockHandler}
                        />

                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={() => UpdateStockHandler(val.id)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              " "
            )}
            {searchData.length !== 0 ? (
              <div>
                <button
                  className="btn btn-outline-warning button"
                  onClick={ClearSearchHandler}
                  fullwidth
                >
                  Clear search
                </button>
              </div>
            ) : (
              " "
            )}
            <div className="Productpage_container">
              {product.map((val) => (
                <div className="Product_card">
                  <img
                    src={val.image}
                    alt=""
                    srcset=""
                    className="Product_img"
                  />
                  <h3
                    style={{
                      height: "20%",
                      marginBottom: "4%",
                      marginLeft: "4%",
                    }}
                  >
                    {val.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      columnGap: "30%",
                      height: "5%",
                      width: "100%",
                      marginLeft: "4%",
                    }}
                  >
                    <p>STOCK:{val.stock}</p>
                    <p style={{ align: "right", marginLeft: "30%" }}>
                      {val.rating}⭐
                    </p>
                  </div>
                  <p style={{ marginLeft: "4%" }}>PRICE:₹{val.price}</p>
                  {currentUser.role === "User" ? (
                    <button
                      className="btn btn-outline-warning button"
                      style={{ margin: "0% 34%" }}
                      onClick={AddtoCartHandler}
                      value={val.id}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <div class="input-group mb-3 ms-5 w-75">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={StockHandler}
                      />

                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          id="button-addon2"
                          onClick={() => UpdateStockHandler(val.id)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

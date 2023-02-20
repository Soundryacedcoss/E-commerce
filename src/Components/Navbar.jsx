import React, { useEffect, useRef, useState } from "react";
import logo from "../Image/logo.png";
import { Link } from "react-router-dom";
import { fetchProducts, searchData } from "../Slice/DataSlice";
import { useDispatch, useSelector } from "react-redux";
export const Navbar = () => {
  const dispatch = useDispatch();
  const SearchInput = useRef();
  const [products, setProducts] = useState([]);
  const outputData = useSelector((state) => state.DataSlice);
  let cartData = JSON.parse(localStorage.getItem("Cart"));
  let user = JSON.parse(localStorage.getItem("CurrentUser"));
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("Products")));
  }, [outputData.products.products]);
  const SearchHandler = (e) => {
    e.preventDefault();
    let temp = [];
    if (SearchInput.current.value === "") {
      alert("please type something..");
    } else {
      products.forEach((element) => {
        let temp1 = SearchInput.current.value;
        let name = element.name.toLowerCase();
        if (name.startsWith(temp1)) {
          temp.push(element);
        }
      });
      dispatch(searchData(temp));
      SearchInput.current.value = "";
    }
  };

  return (
    <>
      <div className="Navbar_container fixed-top">
        <nav className="navbar navbar-expand-lg navbar-light navbar_Container ">
          <div className="container-fluid">
            <a className="navbar-brand" href="//">
              <img src={logo} alt="" srcset="" className="w-50" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    ref={SearchInput}
                  />
                  <button
                    className="btn btn-outline-warning button"
                    type="submit"
                    onClick={SearchHandler}
                  >
                    Search
                  </button>
                </form>

                <li className="mx-5 mt-2">
                  Hey ,{" "}
                  <i
                    class="fas fa-user-circle"
                    style={{ fontSize: "20px", color: "#ffc107" }}
                  ></i>{" "}
                  {user.name}
                </li>
                <li style={{ float: "right" }}>
                  {user.role === "User" ? (
                    <Link className="nav-link" to="/Cart">
                      <i
                        class="fa fa-shopping-cart"
                        style={{ fontSize: "36px", color: "#ffc107" }}
                      ></i>
                      {/* <img src={cart} className="cart_logo" alt="" /> */}
                      {cartData !== null ? (
                        <b style={{ fontSize: "1.5vw", color: "white" }}>
                          {cartData.length}
                        </b>
                      ) : (
                        " "
                      )}
                    </Link>
                  ) : (
                    " "
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

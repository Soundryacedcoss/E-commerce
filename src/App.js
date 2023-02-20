import "./App.css";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/SignUp";
import "./Styling/Login.css";
import "./Styling/Navbar.css";
import "./Styling/Cart.css";
import "./Styling/CheckoutForm.css";
import "./Styling/Bill.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./Store";
import { ProductsPage } from "./Components/ProductsPage";
import { Cart } from "./Components/Cart";
import { CheckoutForm } from "./Components/CheckoutForm";
import { Bill } from "./Components/Bill";
import { useEffect } from "react";
import { fetchProducts } from "./Slice/DataSlice";
import { AdminDashboard } from "./Components/AdminDashboard";
let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/ProductPage" element={<ProductsPage />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/CheckoutForm" element={<CheckoutForm />} />
      <Route path="/Bill" element={<Bill />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </>
  )
);

function App() {
  // const dispatch = useDispatch();

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;

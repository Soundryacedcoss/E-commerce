import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slice/DataSlice";
const store = configureStore({
  reducer: {
    DataSlice: dataReducer,
  },
});
export default store

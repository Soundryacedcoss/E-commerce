const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const fetchProducts = createAsyncThunk("Product/fetch", async () => {
  return await fetch("https://dummyjson.com/products")
    .then((resp) => resp.json())
    .catch((err) => console.log(err.message));
});
const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    products: [],
    cart: [],
    search: [],
    users: [],
  },
  reducers: {
    addData: (state, action) => {
      if (JSON.parse(localStorage.getItem("AllAccounts") !== null)) {
        state.users = JSON.parse(localStorage.getItem("AllAccounts"));
      }
      state.users.push(action.payload);
      localStorage.setItem("AllAccounts", JSON.stringify(state.users));
    },
    addCart: (state, action) => {
      //   state.cart=action.payload;
      localStorage.setItem("Cart", JSON.stringify(action.payload));
    },
    searchData: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state, action) => {
      state.search = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {});
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {});
  },
});
export const { addData, addCart, searchData, clearSearch } = DataSlice.actions;
export default DataSlice.reducer;

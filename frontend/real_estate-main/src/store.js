import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "./redux/SearchBox/SearchSlice";
import SearchModalSlice from "./redux/SearchModal/SearchModalSlice";

export const store = configureStore({
  reducer: {
    search: SearchSlice,
    searchModal: SearchModalSlice,
  },
});

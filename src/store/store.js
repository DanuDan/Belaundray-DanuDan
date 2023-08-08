import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sidebarSlice from "./slices/sidebarSlice";
import categorySlice from "./slices/categorySlice";
import chartSlice from "./slices/chartSlice";
import productSlice from "./slices/productSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        sidebar : sidebarSlice,
        category : categorySlice,
        chart : chartSlice,
        product: productSlice

    }
})

export default store
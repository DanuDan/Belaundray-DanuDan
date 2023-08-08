import axios from "../../library/axios";
import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");


const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        master: {
            loading: false,
            source: [],
            detail: {
                source: [],
                loading: false
            }
        },
    },
    reducers: {
        setLoading(state, { payload }) {
            state.master.loading = payload
        },
        setSource(state, { payload }) {
            state.master.source = payload
        },
        setDetail(state, { payload }) {
            state.master.detail.source = payload
        },
        setDetailLoading(state, { payload }) {
            state.master.detail.loading = payload
        },
    }
})

export const getProductDetail = (payload) => async (dispatch) => {
    dispatch(setDetailLoading(true))
    await axios.get(`/platform/product/${payload}`).then(({ data }) => {
        dispatch(setDetailLoading(false))
        dispatch(setDetail(data?.response))
    }).catch(({ response }) => {
        dispatch(setDetailLoading(false))
    })
}

export const getProduct = () => async (dispatch, state) => {
    dispatch(setLoading(true))
    await axios.get(`platform/product`).then(({ data }) => {
        console.log(data.response)
        dispatch(setLoading(false))
        dispatch(setSource(data.response))
    }).catch(({ response }) => {
        dispatch(setLoading(false))
        toast.error(response?.data?.message)
    })
}

export const createProduct = (payload) => async (dispatch) => {
    return new Promise(async (resolve, _) => {
        await axios.post(`platform/product`, payload).then(({ data }) => {
            // dispatch(getSalesList())
            toast.success(data?.message)
            resolve()
        }).catch(({ response }) => {
            toast.error(response?.data?.message)
        })
    })
}


export const { setSource, setLoading, setDetail, setDetailLoading } = productSlice.actions
export default productSlice.reducer
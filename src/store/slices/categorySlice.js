import axios from "../../library/axios";
import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");


const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        master: {
            loading: false,
            source: [],
        },
    },
    reducers: {
        setLoading(state, { payload }) {
            state.master.loading = payload
        },
        setSource(state, { payload }) {
            state.master.source = payload
        },
    }
})

// export const getPartnerCategoryList = () => async (dispatch, state) => {
//     dispatch(setLoading(true))
//     const master = state().masterPartnerCategory.master
//     const pagination = master.meta.page
//     const query = {
//         ...master.query,
//         ...pagination
//     }
//     const params = Object.keys(query).map(key => key + '=' + query[key]).join('&');
//     await axios.get(`/master/api/v1/service-master/partner-category?${params}`).then(({ data }) => {
//         dispatch(setLoading(false))
//         dispatch(setSource(data.response.data))
//         dispatch(setMeta(data.response.meta.page))
//         dispatch(setLinks(data.response.links))
//     }).catch(({ response }) => {
//         dispatch(setLoading(false))
//         toast.error(response?.data?.message)
//     })
// }

export const getCategory = () => async (dispatch, state) => {
    dispatch(setLoading(true))
    await axios.get(`platform/product/categories`).then(({ data }) => {
        console.log(data.response)
        dispatch(setLoading(false))
        dispatch(setSource(data.response))
    }).catch(({ response }) => {
        dispatch(setLoading(false))
        toast.error(response?.data?.message)
    })
}


export const { setSource, setLoading } = categorySlice.actions
export default categorySlice.reducer
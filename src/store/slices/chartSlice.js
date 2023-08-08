import axios from "../../library/axios";
import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const chartSlice = createSlice({
    name: "chartSlice",
    initialState: {
        master: {
            loading: false,
            source: null,
        },
    },
    reducers: {
        setChart(state, { payload }) {
            state.master.source = payload
        },
    }
})

export const getChart = () => async (dispatch) => {
    await axios.get(`platform/product/report`).then(({ data }) => {
        dispatch(setChart(data))
    }).catch(({ response }) => {

        toast.error(response?.message)
    })
}

export const { setChart } = chartSlice.actions
export default chartSlice.reducer
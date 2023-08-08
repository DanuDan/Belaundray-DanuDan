import axios from "../../library/axios";
import { signOut } from "next-auth/react";

const { createSlice } = require("@reduxjs/toolkit");


const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        id: null,
        name: null,
        token: null,
    },
    reducers: {
        setUser(state, { payload }) {
            state.id = payload.id
            state.name = payload.name
        },
        setToken(state, { payload }) {
            state.token = payload.token
        }
    }
})

export const loginUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        await axios.post("platform/user/sign-in", payload).then(({ data }) => {
            resolve(data)
        }).catch(({ response }) => {
            reject(response)
        })
    })
}

export const logoutUser= () => (dispatch) => {
    dispatch(setUser({}))
}

export const getInfoUser = () => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(`platform/user/info`).then(({ data }) => {
            dispatch(setUser(data.response))
            resolve(data.response)
        }).catch(({ response }) => {
            reject(response)
            // toast.error(response?.data?.message)
        })
    })
}



export const { setUser, setToken } = userSlice.actions
export default userSlice.reducer
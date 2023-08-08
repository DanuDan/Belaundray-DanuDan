

const { createSlice } = require("@reduxjs/toolkit");

const sidebarSlice = createSlice({
    name: "sidebarSlice",
    initialState: {
        show: false
    },
    reducers: {
        setShow(state, { payload }) {
            state.show = payload
        },
    }
})

export const changeShow = (payload) => (dispatch) => {
    dispatch(setShow(payload))
}

export const { setShow } = sidebarSlice.actions
export default sidebarSlice.reducer
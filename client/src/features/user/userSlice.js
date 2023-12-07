import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { token: undefined },
    reducers: {
        setCredentials: (state, action) => {    
            state.token = action.payload;
            // console.log(state.token);
        },
        logout: (state, action) => {
            state.token = null
        },
        setWallet: (state, action) => {
            state.wallet = action.payload;
            console.log(state.wallet);
        }
    }
});

export const { setCredentials, logout, setWallet } = userSlice.actions;

export default userSlice.reducer;


export const selectCurrentToken = (state) => state.user.token 
export const selectCurrentWallet = (state) => state.user.wallet 
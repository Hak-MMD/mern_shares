import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
    name: 'stock',
    initialState: { price: undefined },
    reducers: {
        setBuyStockPrice: (state, action) => {    
            state.price = action.payload;
            // console.log(state.prize);
        },
    }
});

export const { setBuyStockPrice } = stockSlice.actions;

export default stockSlice.reducer;


export const selectCurrentBuyStockPrice = (state) => state.stock.price
// export const selectCurrentWallet = (state) => state.user.wallet 
import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
    name: 'stock',
    initialState: { price: undefined, avPrice: undefined, newPrice: undefined },
    reducers: {
        setBuyStockPrice: (state, action) => {    
            state.price = action.payload;
            // console.log(state.prize);
        },
        setSellStockAvPrice: (state, action) => {    
            state.avPrice = action.payload;
            // console.log(state.prize);
        },
        setSellStockNewPrice: (state, action) => {    
            state.newPrice = action.payload;
            // console.log(state.prize);
        },
    }
});

export const { setBuyStockPrice, setSellStockAvPrice, setSellStockNewPrice } = stockSlice.actions;

export default stockSlice.reducer;


export const selectCurrentBuyStockPrice = (state) => state.stock.price
// export const selectCurrentWallet = (state) => state.user.wallet 
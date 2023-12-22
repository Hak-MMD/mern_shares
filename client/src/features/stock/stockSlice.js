import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
    name: 'stock',
    initialState: { price: 0, avPrice: 0, newPrice: 0, amount: 0 },
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
        setSellStockAmount: (state, action) => {    
            state.amount = action.payload;
            // console.log(state.prize);
        },
    }
});

export const { setBuyStockPrice, setSellStockAvPrice, setSellStockNewPrice, setSellStockAmount } = stockSlice.actions;

export default stockSlice.reducer;


export const selectCurrentBuyStockPrice = (state) => state.stock.price
// export const selectCurrentWallet = (state) => state.user.wallet 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
    type: string;
}

interface TransactionState {
    transactions: Transaction[];
}

const initialState: TransactionState = {
    transactions: [],
}

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.transactions.push(action.payload);
        },
        removeTransaction: (state, action: PayloadAction<string>) => {
            state.transactions = state.transactions.filter(
                (transaction) => transaction.id !== action.payload
            )
        },
    }
})


export const selectTransactions = (state: {transactions: TransactionState}) => state.transactions.transactions;
export const {addTransaction, removeTransaction} = transactionSlice.actions;
export default transactionSlice.reducer; 


import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "../utils/_axios";

export const stockSlice = createSlice({
	name: "stock",
	initialState: {
		isFetching: true,
		tee1: {},
		tee2: {},
	},
	reducers: {
		fillStock: (stock, { payload: stockData }) => {
			stock.tee1 = stockData.tee1;
			stock.tee2 = stockData.tee2;
			stock.isFetching = false;
		},
	},
});

const { fillStock } = stockSlice.actions;
export const fillStockAsync = () => async (dispatch) => {
	try {
		const res = await axios.get("/products");
		const { data } = res.data;

		dispatch(fillStock(data));
	} catch (error) {
		console.log(error);
	}
};

export default stockSlice.reducer;

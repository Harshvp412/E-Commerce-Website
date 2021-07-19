import { createSlice } from "@reduxjs/toolkit";
import React from "react";

function getItemIndex(id, items) {
	const [key, size] = id.split("-");
	const itemIndex = items.findIndex((_item) => _item.size === size && _item.key === key);
	return itemIndex;
}

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
	},
	reducers: {
		incrementQuantityByAmount: ({ items }, { payload: { id, amount } }) => {
			const itemIndex = getItemIndex(id, items);
			let item = items[itemIndex];

			item.quantity += amount;
		},
		decrementQuantityByAmount: ({ items }, { payload: { id, amount } }) => {
			const itemIndex = getItemIndex(id, items);
			let item = items[itemIndex];

			item.quantity = Math.max(item.quantity - amount, 0);
		},
		removeItem: ({ items }, { payload: id }) => {
			const itemIndex = getItemIndex(id, items);
			items.splice(itemIndex, 1);
		},
		addItem: ({ items }, { payload: item }) => {
			items.push(item);
		},
		clearCart: ({ items }) => {
			items.splice(0, items.length);
		},
	},
});

export const {
	incrementQuantityByAmount,
	decrementQuantityByAmount,
	addItem,
	removeItem,
	clearCart,
} = cartSlice.actions;
export const selectItemsCount = ({ cart }) => cart.items.reduce((acc, { quantity }) => acc + quantity, 0);
export const selectTotalPrice = ({ cart }) =>
	cart.items.reduce((acc, { quantity, price }) => acc + quantity * price, 0);

export default cartSlice.reducer;

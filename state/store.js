import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartReducer";
import stockReducer from "./stockReducer";

const persistConfig = {
	key: "esummit-cart",
	storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
	reducer: {
		cart: persistedReducer,
		stock: stockReducer,
	},
	middleware: (getDefaultMiddleware) => {
		const middlewares = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [PERSIST],
			},
		});
		return middlewares;
	},
});
const persistor = persistStore(store);

export { store, persistor };

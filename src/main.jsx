import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

//////////////////////////////////////////////////////////////// REDUX STORE

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import backendEndpointReducer from "./slices/backendEndpointSlice";

export const Store = configureStore({
  reducer: {
    backendEndpoint: backendEndpointReducer,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

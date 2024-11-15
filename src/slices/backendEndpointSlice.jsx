import { createSlice } from "@reduxjs/toolkit";

const isProduction = true;
const localhost = "http://192.168.1.6:8000";
const production = "https://spyneassessment.pythonanywhere.com";

export const backendEndpointSlice = createSlice({
  name: "backendEndpoint",
  initialState: {
    isProduction: isProduction,
    endpoint: isProduction ? production : localhost,
    localhost: localhost,
    production: production,
  },
  reducers: {
    setLocalhost: (state) => {
      state.endpoint = localhost;
    },
    setProduction: (state) => {
      state.endpoint = production;
    },
  },
});

export const { setLocalhost, setProduction } = backendEndpointSlice.actions;

export default backendEndpointSlice.reducer;

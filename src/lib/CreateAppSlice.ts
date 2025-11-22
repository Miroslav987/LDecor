import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

// `BuildCreateslice` позволяет нам создать кусочек с асинхронными толчками.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

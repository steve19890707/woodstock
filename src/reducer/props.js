import { createSlice } from "@reduxjs/toolkit";

const props = createSlice({
  name: "props",
  initialState: {
    imgsdomain: `/mock/hfyali`,
  },
  reducers: {
    setImgsDomain: (state, actions) => {
      state.imgsdomain = actions.payload;
    },
  },
});
export default props.reducer;
export const { setImgsDomain } = props.actions;

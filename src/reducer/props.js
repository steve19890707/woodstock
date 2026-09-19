import { createSlice } from "@reduxjs/toolkit";

const props = createSlice({
  name: "props",
  initialState: {
    imgsdomain: `${process.env.PUBLIC_URL || ""}/mock/hfyali`,
  },
  reducers: {
    setImgsDomain: (state, actions) => {
      state.imgsdomain = actions.payload;
    },
  },
});
export default props.reducer;
export const { setImgsDomain } = props.actions;

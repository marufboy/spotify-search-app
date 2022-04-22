import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  profilImg: string;
  spotifyUrl: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  profilImg: "",
  spotifyUrl: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.profilImg = action.payload.profilImg;
      state.spotifyUrl = action.payload.spotifyUrl
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;

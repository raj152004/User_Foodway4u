// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   user: null, // Yahan user ki details aayengi (jaise name, phone, etc.)
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload; // Example: { name: "Raaj", phone: "9876543210" }
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//     updateProfile: (state, action) => {
//       if (state.user) {
//         state.user = { ...state.user, ...action.payload };
//       }
//     }
//   }
// });

// export const { login, logout, updateProfile } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// === API BASE URL ===
const API_URL = 'http://localhost:5000/api/v1/auth';

// === ASYNC THUNK (Axios yahan use ho raha hai) ===
export const loginViaAPI = createAsyncThunk(
  'auth/loginViaAPI',
  async ({ idToken }, { rejectWithValue }) => {
    try {
      // Axios POST request to Backend
      const response = await axios.post(`${API_URL}/verify-otp`, { idToken });
      
      // Backend se jo user data aur token aayega wo return hoga
      return response.data; 
    } catch (error) {
      // Error handle karne ke liye
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong with Backend"
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userLoggedIn');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginViaAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginViaAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginViaAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
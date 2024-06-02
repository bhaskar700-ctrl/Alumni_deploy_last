import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to request password reset
export const requestPasswordReset = createAsyncThunk(
  'passwordReset/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://alumni-deploy-last.onrender.com/api/users/request-reset-password', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to reset password
export const resetPassword = createAsyncThunk(
  'passwordReset/resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://alumni-deploy-last.onrender.com/api/users/reset-password/${token}`, { newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = passwordResetSlice.actions;

export default passwordResetSlice.reducer;

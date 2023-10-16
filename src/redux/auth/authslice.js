import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
import { BASE_URL, setToken, setUserId } from "../../common/common";

const initialState = {
  isLoading: false,
  userDetails: {},
};

export const LoginWithEmail = createAsyncThunk(
  "counter/LoginWithEmail",
  async (data, thunkAPI) => {
    const param = data.form;
    const navigate = data.navigate;
    try {
      const res = await axios.post(`${BASE_URL}/customer-login`, param);
      if (!(res.status === 200 || res.status === 201)) {
        return thunkAPI.rejectWithValue(res.data.message);
      } else {
        setToken(res.data.token);
        setUserId(res.data.body[0].id);
        toast.success("User Logged in successfully");
        navigate("/");
        return res.data.response;
      }
    } catch (error) {
      toast.error("Please login with correct username password");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "counter/registerUser",
  async (data, thunkAPI) => {
    const param = data.userDetails;
    const navigate = data.navigate;

    try {
      const res = await axios.post(`${BASE_URL}/customer-register`, param);
      if (!(res.status === 200 || res.status === 201)) {
        return thunkAPI.rejectWithValue(res.data.message);
      } else {
        toast.success("User Register Successfully");
        setUserId(res?.data?.id);
        return res.data.response;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutApi = createAsyncThunk(
  "counter/logoutApi",
  async (data, thunkAPI) => {
    const navigate = data?.navigate;
    const token = data?.tokenn;

    try {
      const response = await axios.post(
        `${BASE_URL}/customer-logout?user_token=${token}`
      );
      if (response.data.error) {
        toast.error(response.data.message);
        return { ...response.data, error: true };
      } else {
        if (response?.data?.status === 400) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          localStorage.clear("");
          navigate("/");
          return { ...response.data, error: false };
        }
      }
    } catch (err) {
      toast.warning(err.message);
    }
  }
);

export const getSuccessApi = createAsyncThunk(
  "counter/getSuccessApi",
  async (data, thunkAPI) => {
    const navigate = data?.navigate;
    try {
      const response = await axios.post(
        `${BASE_URL}/success?user_id=${data?.data}`
      );
      if (response.data.error) {
        // toast.error("error");
        return { ...response.data, error: true };
      } else {
        toast.success("Payment Completed");
        navigate("/");
        return { ...response.data, error: false };
      }
    } catch (err) {
      toast.warning(err.message);
    }
  }
);

export const getCancelApi = createAsyncThunk(
  "counter/getCancelApi",
  async (data, thunkAPI) => {
    const navigate = data?.navigate;
    const token = localStorage.getItem("token");
    const requestOptions = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/cancle-subscription?user_id=${data?.data}`,
        null,
        requestOptions
      );
      if (response.data.error) {
        toast.success(response.data.error);
        return { ...response.data, error: true };
      } else {
        navigate("/");
        toast.success(response.data.message);
        return { ...response.data, error: false };
      }
    } catch (err) {
      toast.warning(err.message);
    }
  }
);

export const postPaymentApi = createAsyncThunk(
  "counter/postPaymentApi",
  async (data, thunkAPI) => {
    // const dispatch = data.dispatch;
    const token = localStorage.getItem("token");
    const requestOptions = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/create-checkout-session`,
        // data
        null,
        requestOptions
      );
      if (response.data.error) {
        return { ...response.data, error: true };
      } else {
        window.location.href = response?.data?.session_url;
        return { ...response.data, error: false };
      }
    } catch (err) {
      toast.warning(err.message);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    categoryadd: (state, action) => {
      state.category = action.payload;
    },
  },

  extraReducers: {
    [LoginWithEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [LoginWithEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
    },
    [LoginWithEmail.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [postPaymentApi.pending]: (state) => {
      state.isLoading = true;
    },
    [postPaymentApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      //state.allAddedCartNft = action?.payload?.body
    },
    [postPaymentApi.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [getSuccessApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getSuccessApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.getSpacialOffer = action?.payload?.body
    },
    [getSuccessApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getCancelApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getCancelApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.getSpacialOffer = action?.payload?.body
    },
    [getCancelApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [logoutApi.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutApi.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [logoutApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { categoryadd } = counterSlice.actions;

export default counterSlice.reducer;

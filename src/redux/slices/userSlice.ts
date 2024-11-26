import { DataStatus, userState } from "../../types/redux";
import { IUser } from "../../types/user";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: userState = {
    user: null,
    status: DataStatus.IDLE,
    error: null
}

const fetchLogin = createAsyncThunk("user/login",
    async (user: { username: string, password: string }, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.BASE_URL || "http://localhost:2222/api"}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (response.status !== 200) {
                thunkAPI.rejectWithValue("Failed to login")
            }
            const data = await response.json()
            localStorage.setItem("token", data.token)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

const fetchRegister = createAsyncThunk("user/register",
    async (user: { username: string, password: string, isAdmin: boolean }, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.BASE_URL || "http://localhost:2222/api"}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (response.status !== 200) {
                thunkAPI.rejectWithValue("Failed to register")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchProfileUpdate = createAsyncThunk(
  "user/profile",
  async (id: string, thunkApi) => {
    try {
      const res = await fetch(`${import.meta.env.BASE_URL || "http://localhost:2222/api"}/api/users/profile`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage["token"]!,
        },
        body: JSON.stringify({ id }),
      });
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't update profile, please try again");
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      thunkApi.rejectWithValue("Can't login, please try again");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
        state.user = null
        localStorage.removeItem("token")
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
    builder.addCase(fetchLogin.pending, (state)=>{
        state.status = DataStatus.LOADING
        state.error = null
        state.user = null
    }).addCase(fetchLogin.fulfilled, (state, action)=>{
        state.status = DataStatus.SUCCESS
        state.error = null
        state.user = action.payload as unknown as IUser
    }).addCase(fetchLogin.rejected, (state, action)=>{
        state.status = DataStatus.FAILED
        state.error = action.error as string
        state.user = null
    }).addCase(fetchProfileUpdate.fulfilled, (state, action) => {
        state.user = {...state.user, ...action.payload};
      });
  },
});

export { fetchLogin, fetchRegister }
export default userSlice

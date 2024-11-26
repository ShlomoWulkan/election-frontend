import { candidateState, DataStatus } from "../../types/redux";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICandidate } from "../../types/candidate";


const initialState: candidateState = {
    candidates: [],
    status: DataStatus.IDLE,
    error: null
}

export const fetchCandidates = createAsyncThunk("candidates/getList",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.BASE_URL || "http://localhost:2222/api"}/api/candidates/`, {
                headers: {
                    "authorization": localStorage.getItem("token")! 
                }
            }
            )
            if (response.status !== 200) {
                thunkAPI.rejectWithValue("Failed to login")
            }
            const data = await response.json()            
            return data
        } catch (error) {
            console.log(error);
        }
    }
)


const candidateSlice = createSlice({
    name: "candidates",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<candidateState >) => {
    builder.addCase(fetchCandidates.pending, (state)=>{
        state.status = DataStatus.LOADING
        state.error = null
        state.candidates = []
    }).addCase(fetchCandidates.fulfilled, (state, action)=>{
        state.status = DataStatus.SUCCESS
        state.error = null
        state.candidates = action.payload as unknown as ICandidate[]
    }).addCase(fetchCandidates.rejected, (state, action)=>{
        state.status = DataStatus.FAILED
        state.error = action.error as string
        state.candidates = []
    })
  },
});

export default candidateSlice

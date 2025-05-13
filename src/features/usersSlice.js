import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await new Promise((resolve) =>
        setTimeout(async () => resolve(await axios.get('https://jsonplaceholder.typicode.com/users')), 2000)
    );
    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { deleteUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;
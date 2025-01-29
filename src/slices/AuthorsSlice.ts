import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Author } from "../api/Api";
import { api } from "../api"; 
import { AUTHORS_MOCK } from "../modules/Mock";
import { setConferenceId, setAuthorsInConfCount } from './conferenceSlice';

interface AuthorsState{
    SearchValue: string,
    Authors: Author[],
    loading: boolean,
    error: string | null
}

const initialState: AuthorsState = {
    SearchValue: '',
    Authors: [],
    loading: false,
    error: null
}

export const getAuthorsList = createAsyncThunk(
    'authors/getAuthorsList',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const state = getState() as RootState;
        const authorsState = state.authors;
        try{
            const response = await api.authors.authorsList({
                search_author: authorsState.SearchValue,
            });

            const DraftConfId = response.data.draft_conference_id;
            const AuthorsInConfCount = response.data.draft_conference_authors_count;

            dispatch(setConferenceId(DraftConfId));
            dispatch(setAuthorsInConfCount(AuthorsInConfCount));

            return response.data;
        }catch (error: any){
            return rejectWithValue(error.response.data.error || 'Ошибка при загрузке авторов');
        }
    }
)

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    
    reducers: {
        setSearchValue(state, {payload}) {
            state.SearchValue = payload
        },
        resetAuthorsState(state) {
            state.SearchValue = '';
            state.Authors = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAuthorsList.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAuthorsList.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.Authors = payload.authors;
        });
        builder.addCase(getAuthorsList.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload as string;
            state.Authors = AUTHORS_MOCK.authors.filter((author) => author.name.toLowerCase().includes(state.SearchValue.toLowerCase()) || 
                author.department.toLowerCase().includes(state.SearchValue.toLowerCase()));
        });
    }
})

export const useSearchValue = () => useSelector((state: RootState) => state.authors.SearchValue)
export const useAuthors = () => useSelector((state: RootState) => state.authors.Authors)
export const {
    setSearchValue: setSearchValueAction,
    resetAuthorsState: resetAuthorsStateAction,
} = authorsSlice.actions

export default authorsSlice.reducer
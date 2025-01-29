import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { api } from '../api';
import { RootState } from '../store';

interface Conference {
    conference_id: number,
    status: string,
    date_created: string,
    creator: string,
    date_formed: string,
    moderator: string,
    date_ended: string,
    conf_start_date: string,
    conf_end_date: string,
    members_count: number,
    review_result: number,
}

interface ConferencesState {
    conferences: Conference[],
    ConferencesSearchValues: {
        status: string,
        min_date_formed: string,
        max_date_formed: string
    },
    loading: boolean,
    error: string | null
}

const initialState: ConferencesState = {
    conferences: [],
    ConferencesSearchValues: {
        status: '',
        min_date_formed: '',
        max_date_formed: ''
    },
    loading: false,
    error: null,
};

export const getConferences = createAsyncThunk(
    'Conferences/getConferences',
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const conferencesState = state.conferences;
        try {
            const response = await api.conferences.conferencesList({
                status: conferencesState.ConferencesSearchValues.status,
                min_date_formed: conferencesState.ConferencesSearchValues.min_date_formed,
                max_date_formed: conferencesState.ConferencesSearchValues.max_date_formed
            });
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

const ConferencesSlice = createSlice({
    name: 'Conferences',
    initialState,
    reducers: {
        setSearchConferencesValues(state, { payload }) {
            if (payload.status != undefined) state.ConferencesSearchValues.status = payload.status;

            if (payload.min_date_formed != undefined) state.ConferencesSearchValues.min_date_formed = payload.min_date_formed;
            if (payload.max_date_formed != undefined) state.ConferencesSearchValues.max_date_formed = payload.max_date_formed;
        },
        resetConferencesState(state) {
            state.ConferencesSearchValues = initialState.ConferencesSearchValues;
            state.conferences = initialState.conferences;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConferences.pending, (state) => {
                state.loading = true;
            })
            .addCase(getConferences.fulfilled, (state, { payload }) => {
                state.conferences = payload;
                state.loading = false;
            })
            .addCase(getConferences.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = (payload as string) || 'Ошибка при получении данных';
            });
    }
});
export const useConferences = () => useSelector((state: RootState) => state.conferences.conferences);
export const useConfSearchValues = () => useSelector((state: RootState) => state.conferences.ConferencesSearchValues);

export const { setSearchConferencesValues, resetConferencesState } = ConferencesSlice.actions;

export default ConferencesSlice.reducer;

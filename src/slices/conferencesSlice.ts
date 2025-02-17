import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { api } from '../api';
import { RootState } from '../store';
import { apiCallWithRefresh } from './userSlice';

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
    qr: string
}

interface ConferencesState {
    conferences: Conference[],
    ConferencesSearchValues: {
        status: string,
        min_date_formed: string,
        max_date_formed: string,
        creator: string
    },
    loading: boolean,
    error: string | null
}

const initialState: ConferencesState = {
    conferences: [],
    ConferencesSearchValues: {
        status: '',
        min_date_formed: '',
        max_date_formed: '',
        creator: '',
    },
    loading: false,
    error: null,
};

export const getConferences = createAsyncThunk(
    'Conferences/getConferences',
    async (_, { dispatch, getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const conferencesState = state.conferences;
        try {
            const response = await apiCallWithRefresh(dispatch, () => api.conferences.conferencesList({
                status: conferencesState.ConferencesSearchValues.status,
                min_date_formed: conferencesState.ConferencesSearchValues.min_date_formed,
                max_date_formed: conferencesState.ConferencesSearchValues.max_date_formed
            }));
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

export const confirmConference = createAsyncThunk(
    'Conferences/confirmConference',
    async (id: number, { dispatch, rejectWithValue }) => {
        try {
            const response = await apiCallWithRefresh(dispatch, () => api.conference.conferenceConfirmUpdate(id.toString(),  {"is_confirmed": 1}));
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при подтверждении конференции');
        }
    }
);

export const rejectConference = createAsyncThunk(
    'Conferences/rejectConference',
    async (id: number, { dispatch, rejectWithValue }) => {
        try {
            const response = await apiCallWithRefresh(dispatch, () => api.conference.conferenceConfirmUpdate(id.toString(),  {"is_confirmed": 0}));
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при отклонении конференции');
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
            if (payload.creator != undefined) state.ConferencesSearchValues.creator = payload.creator
        },
        resetConferencesState(state) {
            state.ConferencesSearchValues = initialState.ConferencesSearchValues;
            state.conferences = initialState.conferences;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConferences.pending, (state) => {
                state.loading = false;
            })
            .addCase(getConferences.fulfilled, (state, { payload }) => {
                state.conferences = payload;
                state.loading = false;
            })
            .addCase(getConferences.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = (payload as string) || 'Ошибка при получении данных';
            })

            .addCase(confirmConference.pending, (state) => {
            state.loading = true;
            })
            .addCase(confirmConference.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.conferences = state.conferences.map(conference =>
                conference.conference_id === payload.conference_id ? { ...conference, status: 'confirmed' } : conference
            );
            })
            .addCase(confirmConference.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = (payload as string) || 'Ошибка при подтверждении конференции';
            })

            .addCase(rejectConference.pending, (state) => {
            state.loading = true;
            })
            .addCase(rejectConference.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.conferences = state.conferences.map(conference =>
                conference.conference_id === payload.conference_id ? { ...conference, status: 'rejected' } : conference
            );
            })
            .addCase(rejectConference.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = (payload as string) || 'Ошибка при отклонении конференции';
            });
    }
});
export const useConferences = () => useSelector((state: RootState) => state.conferences.conferences);
export const useConfSearchValues = () => useSelector((state: RootState) => state.conferences.ConferencesSearchValues);

export const { setSearchConferencesValues, resetConferencesState, setError } = ConferencesSlice.actions;

export default ConferencesSlice.reducer;

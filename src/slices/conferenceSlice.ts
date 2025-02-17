import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { api } from '../api';
import { apiCallWithRefresh } from './userSlice';

interface ConferenceState {
    conf_id?: number;
    authors_in_conf_count: number | undefined;

    authors: Author[];
    conf_start_date?: string | null;
    conf_end_date?: string | null;
    members_count?: number | null;
    review_result?: number | null;

    error: string | null;
    isDraft: boolean;
    loading: boolean
}

interface Author {
    author?: { 
        author_id?: number | undefined; 
        name: string
        url: string
        department: string
    } | undefined;
    is_corresponding: boolean;  

}

const initialState: ConferenceState = {
    conf_id: undefined,
    authors_in_conf_count: undefined,

    authors: [],
    conf_start_date: null,
    conf_end_date: null,
    members_count: null,
    review_result: null,

    error: null,
    isDraft: false,
    loading: false
};

export const getConf = createAsyncThunk(
    'Conference/getConference',
    async (ConferenceId: string, { dispatch }) => {
        const response = await apiCallWithRefresh(dispatch, () => api.conference.conferenceRead(ConferenceId));
        return response.data;
    }
);

export const addAuthorToConference = createAsyncThunk(
    'Conference/addAuthorToConference',
    async (authorId: number, { dispatch }) => {
        const response = await apiCallWithRefresh(dispatch, () => api.author.authorAddToConferenceCreate(authorId.toString()));
        return response.data;
    }
);

export const deleteConference = createAsyncThunk(
    'Conference/deleteConference',
    async (ConferenceId: string, { dispatch }) => {
        const response = await apiCallWithRefresh(dispatch, () => api.conference.conferenceDelete(ConferenceId));
        return response.data;
    }
);

export const updateConferenceFields = createAsyncThunk(
    'Conference/updateConference',
    async ({ ConferenceId, conf_start_date, conf_end_date, review_result }: { ConferenceId: string; conf_start_date: string; conf_end_date:string; review_result: number }, { dispatch }) => {
      const response = await apiCallWithRefresh(dispatch, () => api.conference.conferenceUpdate(ConferenceId, { conf_start_date: conf_start_date, conf_end_date: conf_end_date, review_result }));
      return response.data;
    }
);

export const saveConference = createAsyncThunk(
    'Conference/saveConference',
    async (ConferenceId: string, { dispatch }) => {
        const response = await apiCallWithRefresh(dispatch, () => api.conference.conferenceFormUpdate(ConferenceId));
        return response.data;
    }
);

export const deleteAuthorFromConference = createAsyncThunk(
    'Conference/deleteAuthorFromConference',
    async ({ ConferenceId, authorId }: { ConferenceId: number; authorId: number }, { dispatch }) => {
      await apiCallWithRefresh(dispatch, () => api.authorInConf.authorInConfDelete(
        ConferenceId.toString(),
        authorId.toString()
      )); 
    }
);

export const updateAuthorDetails = createAsyncThunk(
    'Conference/updateAuthorDetails',
    async ({ ConferenceId, authorId, is_corresponding }: { ConferenceId: number; authorId: number; is_corresponding: boolean }, { dispatch }) => {
        await apiCallWithRefresh(dispatch, () => api.authorInConf.authorInConfUpdate(
            ConferenceId.toString(),
            authorId.toString(),
            { is_corresponding }
        ));
    }
);

const ConferenceSlice = createSlice({
    name: 'Conference',
    initialState,
    reducers: {
        setConferenceId: (state, action) => {
            state.conf_id = action.payload;
        },
        setAuthorsInConfCount: (state, action) => {
            state.authors_in_conf_count = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setConfStartDate: (state, action) => {
            state.conf_start_date = action.payload;
        },
        setConfEndDate: (state, action) => {
            state.conf_end_date = action.payload;
        },
        setMembersCount: (state, action) => {
            state.members_count = action.payload;
        },
        setReviewResult: (state, action) => {
            state.review_result = action.payload;
        },
        setAuthors: (state, action) => {
            state.authors = action.payload;
        },
        resetConferenceState: (state) => {
            state.authors = initialState.authors;
            state.conf_id = initialState.conf_id;
            state.conf_start_date = initialState.conf_start_date;
            state.conf_end_date = initialState.conf_end_date;
            state.members_count = initialState.members_count;
            state.review_result = initialState.review_result;
            state.isDraft = initialState.isDraft;
            state.authors_in_conf_count = initialState.authors_in_conf_count
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConf.pending, (state) => {
            state.loading = true;
            })
            .addCase(getConf.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                
                state.isDraft = action.payload.status === 'draft';
                state.conf_id = action.payload.conference_id;
                state.conf_start_date = action.payload.conf_start_date ? action.payload.conf_start_date.slice(0, -4) : null;
                state.conf_end_date = action.payload.conf_end_date ? action.payload.conf_end_date.slice(0, -4) : null;
                state.members_count = action.payload.members_count;
                state.review_result = action.payload.review_result;
                state.authors = action.payload.authors || [];
            }
            })
            .addCase(getConf.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при загрузке данных';
            })

            .addCase(deleteConference.pending, (state) => {
            state.loading = true;
            })
            .addCase(deleteConference.fulfilled, (state) => {
            state.loading = false;
            state = initialState;
            })
            .addCase(deleteConference.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при удалении конференции';
            })

            .addCase(updateConferenceFields.pending, (state) => {
            state.loading = true;
            })
            .addCase(updateConferenceFields.fulfilled, (state) => {
            state.loading = false;
            })
            .addCase(updateConferenceFields.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при обновлении данных';
            })

            .addCase(saveConference.pending, (state) => {
            state.loading = true;
            })
            .addCase(saveConference.fulfilled, (state) => {
            state.loading = false;
            state = initialState;
            })
            .addCase(saveConference.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при сохранении данных';
            })

            .addCase(deleteAuthorFromConference.pending, (state) => {
            state.loading = true;
            })
            .addCase(deleteAuthorFromConference.fulfilled, (state, action) => {
            state.loading = false;
            state.authors = state.authors.filter((author) => author.author?.author_id !== action.meta.arg.authorId);
            })
            .addCase(deleteAuthorFromConference.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при удалении автора';
            })

            .addCase(updateAuthorDetails.pending, (state) => {
            state.loading = true;
            })
            .addCase(updateAuthorDetails.fulfilled, (state, action) => {
            state.loading = false;
            const { authorId, is_corresponding } = action.meta.arg;
            const author = state.authors.find((author) => author.author?.author_id === authorId);
            if (author) {
                author.is_corresponding = is_corresponding;
            }
            })
            .addCase(updateAuthorDetails.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при обновлении данных автора';
            });
    }
});

export const useConfId = () => useSelector((state: RootState) => state.conference.conf_id);
export const useAuthorsInConfCount = () => useSelector((state: RootState) => state.conference.authors_in_conf_count);
export const useSearchValue = () => useSelector((state: RootState) => state.authors.SearchValue);
export const useAuthors = () => useSelector((state: RootState) => state.conference.authors);
export const useIsDraft = () => useSelector((state: RootState) => state.conference.isDraft);

export const useConfStartDate = () => useSelector((state: RootState) => state.conference.conf_start_date);
export const useConfEndDate = () => useSelector((state: RootState) => state.conference.conf_end_date);
export const useMembersCount = () => useSelector((state: RootState) => state.conference.members_count);
export const useReviewResult = () => useSelector((state: RootState) => state.conference.review_result);

export const {setError, setAuthorsInConfCount, setConferenceId, setConfStartDate, setConfEndDate, setReviewResult, setMembersCount, setAuthors, resetConferenceState} = ConferenceSlice.actions;
export default ConferenceSlice.reducer;
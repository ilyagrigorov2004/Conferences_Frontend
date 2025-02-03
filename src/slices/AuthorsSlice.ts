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

export const updateAuthor = createAsyncThunk(
    'authors/updateAuthor',
    async (author: Author, {rejectWithValue}) => {
        try{
            const response = await api.author.authorUpdate(author.author_id?.toString() || '', author);
            return response.data;
        }catch (error: any){
            return rejectWithValue(error.response.data.error || 'Ошибка при обновлении данных');
        }
    }
)

export const addAuthor = createAsyncThunk(
    'authors/addAuthor',
    async (author: Author, { rejectWithValue }) => {
        try {
            const response = await api.authors.authorsCreate(author);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Ошибка при добавлении автора');
        }
    }
)

interface UploadImagePayload {
    id: string;
    file: File | null;
  }

export const uploadImage = createAsyncThunk(
    'images/upload',
    async ({ id, file }: UploadImagePayload) => {
        if (!file) {
          throw new Error("Пожалуйста, выберите изображение для загрузки");
        }
    
        const formData = new FormData();
        formData.append('image', file); 
    
        const response = await api.author.authorImgUploadCreate(id, {
          body: formData,
        });
        return response.data;
      }
  );

  export const getAuthor = createAsyncThunk(
    'authors/getAuthor',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.author.authorRead(id.toString());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Ошибка при загрузке данных автора');
        }
    }
);
;

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
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
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

        builder.addCase(updateAuthor.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateAuthor.fulfilled, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(updateAuthor.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });

        builder.addCase(addAuthor.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addAuthor.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.Authors.push(payload);
        });
        builder.addCase(addAuthor.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });

        builder.addCase(uploadImage.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(uploadImage.fulfilled, (state, { payload }) => {
            state.loading = false;
            const index = state.Authors.findIndex(author => author.author_id === payload.author_id);
            if (index !== -1) {
                state.Authors[index].url = payload.url; // Обновление URL изображения
            }
        });
        builder.addCase(uploadImage.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });
    }
})

export const useSearchValue = () => useSelector((state: RootState) => state.authors.SearchValue)
export const useAuthors = () => useSelector((state: RootState) => state.authors.Authors)
export const {
    setSearchValue: setSearchValueAction,
    resetAuthorsState: resetAuthorsStateAction,
    setError,
} = authorsSlice.actions

export default authorsSlice.reducer
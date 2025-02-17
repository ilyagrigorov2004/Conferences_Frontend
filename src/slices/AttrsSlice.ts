import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from '../api';
import { AUTHORS_MOCK } from '../modules/Mock';
import { apiCallWithRefresh } from './userSlice';

export interface Attrib{
    attr_id: number,
    author_id: number,
    name: string
    value: string
    id: number
}

interface AttrsState{
    attributes: Attrib[],
    error: string,
    loading: boolean
    openCardId: number | null,
}

const initialState: AttrsState = {
    attributes: [],
    error: '',
    loading: false,
    openCardId: null,
}   

export const getAuthorsAttrs = createAsyncThunk(
    'attributes/getAuthorsAttrs',
    async ({ authorId }: { authorId: number }, { dispatch }) => {
        const response = await apiCallWithRefresh(dispatch, () => api.attribute.attributeGetAuthorsAttrList(
            authorId.toString(),
        ));
        return response.data;
    }
);

export const addAttribute = createAsyncThunk(
    'attributes/addAttribute',
    async ({ name }: { name: string }, { dispatch, rejectWithValue }) => {
        try {
            const response = await apiCallWithRefresh(dispatch, () => api.attribute.attributeAddCreate({
                name,
            }));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Ошибка при добавлении атрибута');
        }
    }
);

export const editAttribute = createAsyncThunk(
    'attributes/editAttribute',
    async ({ authorId, attrId, value}: { authorId: number, attrId: number, value: string}, { dispatch, rejectWithValue }) => {
        try {
            const response = await apiCallWithRefresh(dispatch, () => api.attribute.attributeAddAuthorsAttrUpdate(
                authorId.toString(),
                attrId.toString(),
                { value }
            ));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Ошибка при изменении атрибута');
        }
    }
);

export const deleteAttribute = createAsyncThunk(
    'attributes/deleteAttribute',
    async ({ attrId }: { attrId: number }, { dispatch, rejectWithValue }) => {
        try {
            const response = await apiCallWithRefresh(dispatch, () => api.attribute.attributeDelete(
                attrId.toString()
            ));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Ошибка при удалении атрибута');
        }
    }
);

const AttrsSlice = createSlice({
    name: 'attributes',
    initialState,
    reducers: {
        setAttributes(state, action){
            state.attributes = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        setOpenCardId(state, { payload }) {
            state.openCardId = payload;
        },
        setAttr(state, { payload }) {
            state.attributes = state.attributes.map((attr) => {
                if (attr.id === payload.id) {
                    return payload;
                }
                return attr;
            })
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthorsAttrs.pending, (state) => {
            state.loading = true 
            })
            .addCase(getAuthorsAttrs.fulfilled, (state, { payload }) => {
            state.attributes = payload;
            state.error = ''
            state.loading = false 
            })
            .addCase(getAuthorsAttrs.rejected, (state, { payload }) => {
            state.error = (payload as string) || 'Ошибка при получении данных';
            state.loading = false;
            state.attributes = AUTHORS_MOCK.attrs.filter(attr => attr.author_id === state.openCardId) || [];
            })
            
            .addCase(addAttribute.pending, (state) => {
            state.loading = true;
            })
            .addCase(addAttribute.fulfilled, (state) => {
            state.error = '';
            state.loading = false;
            })
            .addCase(addAttribute.rejected, (state, { payload }) => {
            state.error = (payload as string) || 'Ошибка при добавлении атрибута';
            state.loading = false;
            })
            
            .addCase(editAttribute.pending, (state) => {
            state.loading = true;
            })
            .addCase(editAttribute.fulfilled, (state) => {
                state.error = '';
                state.loading = false;
            })
            .addCase(editAttribute.rejected, (state, { payload }) => {
            state.error = (payload as string) || 'Ошибка при изменении атрибута';
            state.loading = false;
            })
            
            .addCase(deleteAttribute.pending, (state) => {
            state.loading = true;
            })
            .addCase(deleteAttribute.fulfilled, (state) => {
            state.error = '';
            state.loading = false;
            })
            .addCase(deleteAttribute.rejected, (state, { payload }) => {
            state.error = (payload as string) || 'Ошибка при удалении атрибута';
            state.loading = false;
            });            
    }
})

export const useAttrs = () => useSelector((state: RootState) => state.attributes.attributes); 

export const { setError, setOpenCardId, setAttributes, setAttr } = AttrsSlice.actions;


export default AttrsSlice.reducer;
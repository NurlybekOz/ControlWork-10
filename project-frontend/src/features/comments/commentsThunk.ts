import {createAsyncThunk} from "@reduxjs/toolkit";
import {IComment, ICommentMutation} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchCommentsByNewsId = createAsyncThunk<IComment[], string>(
    'comments/fetchCommentsByNews',
    async (newsId) => {
        const response = await axiosApi<IComment[]>('/commentaries?news_id=' + newsId)
        return response.data || [];
    }
)
export const createComment = createAsyncThunk<void, ICommentMutation>(
    'comments/createComment',
    async (commentToAdd) => {
        await axiosApi.post('/commentaries', commentToAdd);
    }
);
export const deleteComment = createAsyncThunk<void, string>(
    'comments/deleteComment',
    async (commentId) => {
        await axiosApi.delete(`/commentaries/${commentId}`);
    }
);
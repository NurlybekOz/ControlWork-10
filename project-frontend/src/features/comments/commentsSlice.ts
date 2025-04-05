import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createComment, deleteComment, fetchCommentsByNewsId} from "./commentsThunk.ts";
import {IComment} from "../../types";

interface CommentState {
    items: IComment[];
    fetchLoading: boolean;
}

const initialState: CommentState = {
    items: [],
    fetchLoading: false,
}

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCommentsByNewsId.pending, (state) => {
            state.fetchLoading = true;
        }).addCase(fetchCommentsByNewsId.fulfilled, (state, {payload: comments}) => {
            state.items = comments;
            state.fetchLoading = false;
        })

            .addCase(createComment.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.fetchLoading = false;
            }).addCase(createComment.rejected, (state) => {
            state.fetchLoading = false;
        })

            .addCase(deleteComment.pending, (state) => {
                state.fetchLoading = true;
            }).addCase(deleteComment.fulfilled, (state) => {
            state.fetchLoading = false;
        }).addCase(deleteComment.rejected, (state) => {
            state.fetchLoading = false;
        })
    }
})

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;

import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {IPost, IPostMutation} from "../../types";

export const fetchAllPosts = createAsyncThunk<IPost[], void>(
    'posts/fetchAllPosts',
    async () => {
        const response = await axiosApi.get<IPost[]>('/news');
        return response.data;
    }
);

export const fetchPostById = createAsyncThunk<IPost, string>(
    'posts/fetchPostById',
    async (post_id) => {
        const response = await axiosApi.get<IPost>('/news/' + post_id);
        return response.data || null;
    }
);


export const createPost = createAsyncThunk<void, IPostMutation>(
    'posts/createPost',
    async (postToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(postToAdd) as (keyof IPostMutation)[];

        keys.forEach(key => {
            const value = postToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/news', formData);
    }
);

export const deletePost = createAsyncThunk<void, string>(
    'posts/deletePost',
    async (postId) => {
        await axiosApi.delete(`/news/${postId}`);
    }
)
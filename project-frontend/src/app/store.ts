import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "../features/news/newsSlice.ts";
import {commentsReducer} from "../features/comments/commentsSlice.ts";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
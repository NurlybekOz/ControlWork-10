export interface IPostMutation {
    title: string;
    content: string;
    image: string | null;
}
export interface IPost {
    id: string;
    title: string;
    content: string;
    image: string;
    datetime: string;
}
export interface IComment {
    id: string;
    news_id: string;
    author: string;
    description: string;
}
export interface ICommentMutation {
    author: string;
    description: string;
}
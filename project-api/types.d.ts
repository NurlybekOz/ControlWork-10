export interface NewsWithoutId {
    title: string;
    content: string;
    image: string | null;
}
export interface NewsWithId {
    id: string;
    title: string;
    content: string;
    image: string | null;
    datetime: string;
}
export interface CommentaryWithId {
    id: string;
    news_id: string;
    author: string;
    description: string;
}
export interface CommentaryWithoutId {
    news_id: string;
    author: string;
    description: string;
}
export interface DataDb  {
    news: NewsWithId[],
    commentaries: CommentaryWithId[],
}
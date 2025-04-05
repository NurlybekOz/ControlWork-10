import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Button, Container, Grid, ListItem, TextField, Typography} from "@mui/material";
import {selectOnePost, selectPostsLoading} from "./newsSlice.ts";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import {fetchPostById} from "./newsThunk.ts";
import dayjs from "dayjs";
import {ICommentMutation} from "../../types";
import {createComment, deleteComment, fetchCommentsByNewsId} from "../comments/commentsThunk.ts";
import {selectComments, selectCommentsLoading} from "../comments/commentsSlice.ts";
import {toast} from "react-toastify";

const FullPost = () => {
    const {id} = useParams();
    const [form, setForm] = useState<ICommentMutation>({
        author: '',
        description: '',
    })
    const dispatch = useAppDispatch()
    const post = useAppSelector(selectOnePost)
    const fetchLoading = useAppSelector(selectPostsLoading)
    const comments = useAppSelector(selectComments)
    const commentsLoading = useAppSelector(selectCommentsLoading)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.description.trim()) {
            toast.error('message cannot be empty')
            return;
        }

        const commentToCreate = {
            author: form.author,
            description: form.description,
            news_id: id,
        }

        await dispatch(createComment(commentToCreate))
        toast.success("Created new comment")
        if (id) {
            dispatch(fetchCommentsByNewsId(id))
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const onDeleteComment = async (comment_id: string) => {
        await dispatch(deleteComment(comment_id))
        toast.error("Deleted comment")
        if (id) {
            dispatch(fetchCommentsByNewsId(id))
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id))
            dispatch(fetchCommentsByNewsId(id))
        }
    }, [id, dispatch])

    return (
        <Container>

            {!fetchLoading && post ?
                <>
                    <Grid mt='20px' mb='20px'>
                       <Typography variant='h4'>
                           {post.title}
                       </Typography>
                        <Typography variant='body1' color='textDisabled'>
                           At {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')}
                        </Typography>
                        <Typography variant='body1'>
                            {post.content}
                        </Typography>
                    </Grid>
                    <Typography variant='h4' mb='10px'>Comments</Typography>
                        {commentsLoading ? <Spinner/> :
                            <>
                                {comments.length === 0 ? <Typography color='textDisabled'>No comments yet</Typography> :
                                    <Grid container direction='row' spacing={1}>
                                        {comments.map((comment, index) => (
                                            <ListItem key={index} style={{ display: "flex", width: "100%", border: '1px solid', gap: '20px' }}>
                                                <Grid sx={{flexGrow: '1', display: "flex", justifyContent: "space-between", alignItems: "center"}} >
                                                    <Typography>
                                                        <b>{comment.author}</b> wrote:  {comment.description}
                                                    </Typography>
                                                    <Grid sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                                        <Button onClick={() => onDeleteComment(comment.id)}>Delete</Button>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>

                                        ))}
                                    </Grid>
                                }
                            </>
                        }
                    {fetchLoading ? <Spinner /> : null}
                    <Grid>
                        <form onSubmit={onSubmit} style={{ width: "50%", marginTop: '30px'}}>
                            <Grid container spacing={2} direction="column">
                                <Typography variant='h4'>
                                    Add a comment
                                </Typography>
                                <Grid size={12} >
                                    <TextField
                                        style={{width:'100%'}}
                                        id='author'
                                        label="Author"
                                        name="author"
                                        value={form.author}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <TextField
                                        style={{width:'100%'}}
                                        multiline rows={3}
                                        id='description'
                                        label="Comment"
                                        name="description"
                                        value={form.description}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <Button style={{width:'100%'}} type="submit" color="primary" variant="contained">
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </>
                :
                <Typography variant="h4" mt='20px'>Not found post</Typography>
            }
        </Container>
    );
};

export default FullPost;
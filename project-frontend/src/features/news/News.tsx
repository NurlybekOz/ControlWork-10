
import {Button, Grid, ListItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectPosts, selectPostsLoading} from "./newsSlice.ts";
import {deletePost, fetchAllPosts} from "./newsThunk.ts";
import { useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner.tsx";
import dayjs from "dayjs";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { toast } from "react-toastify";
import {apiUrl} from "../../../globalConstants.ts";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const postsFetchLoading = useAppSelector(selectPostsLoading);

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [dispatch])

    const onClickDeletePost = async (id: string) => {
        await dispatch(deletePost(id))
        toast.error('Post was successfully deleted.')
        await dispatch(fetchAllPosts())
    }

    return (
        <Grid container direction='column' sx={{marginTop: "20px"}} spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Posts
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" variant='contained' component={Link} to='/posts/new'>
                        Add new post
                    </Button>
                </Grid>
            </Grid>


            {postsFetchLoading ? <Spinner/> :
                <>
                    {posts.length === 0 ? <Typography variant='h4' color='textDisabled'>No posts yet</Typography> :
                        <Grid container direction='row' spacing={1}>
                            {posts.map((post, index) => (
                                <ListItem key={index} style={{ display: "flex", width: "100%", border: '1px solid', marginBottom: '10px', gap: '20px' }}>
                                    {post.image ?  <Grid sx={{width: '75px', height: '75px'}}>
                                        <img src={apiUrl + '/' + post.image} alt={post.title} style={{width: '100%', height: '100%'}}/>
                                    </Grid> : null}

                                    <Grid sx={{flexGrow: '1'}} >
                                        <Typography variant='h4'>
                                            {post.title}
                                        </Typography>
                                        <Grid sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <Typography color='textDisabled'>{dayjs(post.datetime).format('DD.MM.YYYY HH:mm')}</Typography>
                                            <Button  component={Link} to={`/posts/${post.id}`}>Read Full Post <KeyboardDoubleArrowRightIcon/></Button>
                                            <Button onClick={() => onClickDeletePost(post.id)}>Delete</Button>

                                        </Grid>
                                    </Grid>
                                </ListItem>

                            ))}
                        </Grid>
                    }
                </>
            }

        </Grid>
    );
};

export default Posts;
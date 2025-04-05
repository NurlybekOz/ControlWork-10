import express from 'express';
import fileDb from "../fileDb";
import crypto from "node:crypto";
import {CommentaryWithoutId} from "../types";

const CommentariesRouter = express.Router();

CommentariesRouter.get('/', async (req, res) => {
    const queryNewsId = req.query.news_id as string;
    let commentaries = await fileDb.getAllCommentaries()
    if (queryNewsId) {
        commentaries = commentaries.filter(commentary => commentary.news_id === queryNewsId);
    }
    res.send(commentaries);
})

CommentariesRouter.post('/', async (req, res) => {

    if (!req.body.news_id || !req.body.description) {
        res.status(400).send({error: "news_id, description is required"});
        return;
    }
    const newsAll = await fileDb.getAllNews()
    const newsId = newsAll.find(item => item.id === req.body.news_id);
    if (!newsId) {
        res.status(400).send({error: "This news does not exist, comment cannot be published"});
        return;
    }
    const newCommentary: CommentaryWithoutId = {
        news_id: req.body.news_id,
        author: req.body.author ? req.body.author : 'Anonymous',
        description: req.body.description,
    }

    const savedNewCommentary = await fileDb.addNewCommentary(newCommentary);
    res.send(savedNewCommentary);
})
CommentariesRouter.delete('/:id', async (req, res) => {
    const commentary_id = req.params.id;
    await fileDb.deleteCommentary(commentary_id)
    res.send('commentary was deleted successfully.')
})
export default  CommentariesRouter
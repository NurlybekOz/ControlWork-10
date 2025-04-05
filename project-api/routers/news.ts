import express from "express";
import fileDb from "../fileDb";
import {NewsWithoutId} from "../types";
import {imagesUpload} from "../multer";

const NewsRouter = express.Router();

NewsRouter.get("/", async (req, res) => {
    const News = await fileDb.getAllNews();
    const definedValues = News.map(info => ({
        id: info.id,
        title: info.title,
        image: info.image,
        datetime: info.datetime,
    }))
    res.send(definedValues)
})

NewsRouter.get("/:id", async (req, res) => {
    const NewsInfo = await fileDb.getNewsById(req.params.id);
    res.send(NewsInfo);
})

NewsRouter.post("/", imagesUpload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).send({error: "news name, content is required"});
        return;
    }
    const newInfo: NewsWithoutId = {
        title: req.body.title,
        content: req.body.content,
        image: req.file ? 'images/' + req.file.filename : null,
    }

    const savedNewInfo = await fileDb.addNewInfo(newInfo);
    res.send(savedNewInfo);
})

NewsRouter.delete("/:id", async (req, res) => {
    const news_id = req.params.id;
    await fileDb.deleteNews(news_id);
    res.send('News was successfully deleted.');
})

export default NewsRouter;
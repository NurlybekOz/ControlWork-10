import express from "express";
import cors from "cors";
import fileDb from "./fileDb";
import NewsRouter from "./routers/news";
import CommentariesRouter from "./routers/commentaries";


const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use('/news', NewsRouter)
app.use('/commentaries', CommentariesRouter)

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })
}
run().catch(console.error);
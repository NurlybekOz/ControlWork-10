
import './App.css'
import AppToolbar from "./UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import News from "./features/news/News.tsx";
import NewPost from "./features/news/NewPost.tsx";
import {Container} from "@mui/material";
import FullPost from "./features/news/FullNews.tsx";

const App = () => {
    return (
        <>
        <header>
            <AppToolbar></AppToolbar>
        </header>
            <Container>
                <Routes>
                    <Route path="/" element={<News />} />
                    <Route path="/posts" element={<News />} />
                    <Route path="/posts/new" element={<NewPost />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </Container>
        </>
    )
};

export default App

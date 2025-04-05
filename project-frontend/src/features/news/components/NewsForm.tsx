import {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {IPostMutation} from "../../../types";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import {toast} from "react-toastify";

interface Props {
    onSubmitNews: (post: IPostMutation) => void;
}

const NewsForm: React.FC<Props> = ({onSubmitNews}) => {
    const [form, setForm] = useState<IPostMutation>({
        title: '',
        content: '',
        image: '',
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title.trim() || !form.content.trim()) {
            toast.error('Title and content cannot be empty')
            return;
        }
        onSubmitNews({...form})
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target

        if (files) {
            setForm(prevState => ({...prevState, [name]: files[0]}))
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ width: "25%", margin: "0 auto"}}>
            <Grid container spacing={2} direction="column">
                <Grid size={12} >
                    <TextField
                        style={{width:'100%'}}
                        id='title'
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        style={{width:'100%'}}
                        multiline rows={3}
                        id='content'
                        label="content"
                        name="content"
                        value={form.content}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={12}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                    ></FileInput>
                </Grid>
                <Grid size={12}>
                    <Button style={{width:'100%'}} type="submit" color="primary" variant="contained">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewsForm;
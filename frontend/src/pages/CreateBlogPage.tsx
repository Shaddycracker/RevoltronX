import { Typography, Box } from "@mui/material"
import BlogEditor from "../components/BlogEditor"

export default function CreateBlogPage() {
    return (
        <Box>
            <Typography variant="h5" component="h1" gutterBottom>
                Create New Blog
            </Typography>
            <BlogEditor blog={null} autoSaveInterval={600000} /> {/* 10 minutes = 600000 ms */}
        </Box>
    )
}

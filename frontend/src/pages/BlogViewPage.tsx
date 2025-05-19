import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Paper, CircularProgress } from "@mui/material";
import type { Blog } from "../types";
import {viewBlogById} from "../api/blogApi.ts";

const BlogViewPage: React.FC = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            viewBlogById(id)
                .then((data) => setBlog(data))
                .catch((err) => console.error("Error loading blog:", err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!blog) {
        return <Typography variant="h6" sx={{ mt: 5, textAlign: "center" }}>Blog not found.</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", p: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {blog.title}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Created on: {new Date(blog.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Last updated: {new Date(blog.updatedAt).toLocaleString()}
                </Typography>

                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {blog.content}
                    </Typography>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Tags:
                    </Typography>
                    {blog.tags.length > 0 ? (
                        blog.tags.map((tag, idx) => (
                            <Chip key={idx} label={tag} sx={{ mr: 1, mb: 1 }} color="primary" variant="outlined" />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">No tags</Typography>
                    )}
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Status:{" "}
                        <Chip
                            label={blog.status}
                            color={blog.status === "published" ? "success" : "default"}
                            size="small"
                        />
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default BlogViewPage;

import { useState, useEffect } from "react"
import { Typography, Box, Grid, Card, CardContent, CardActions, Button, Chip, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getBlogs, deleteBlog } from "../api/blogApi"
import { useToast } from "../hooks/useToast"
import type { Blog } from "../types"

export default function DraftBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { showToast } = useToast()

    useEffect(() => {
        fetchDraftBlogs()
    }, [])

    const fetchDraftBlogs = async () => {
        try {
            setLoading(true)
            const data = await getBlogs()
            setBlogs(data.filter((blog) => blog.status === "draft"))
        } catch (error) {
            console.error("Error fetching blogs:", error)
            showToast("Failed to load draft blogs", "error")
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (id: string) => {
        navigate(`/blog/${id}`)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteBlog(id)
            showToast("Draft deleted successfully", "success")
            fetchDraftBlogs()
        } catch (error) {
            console.error("Error deleting draft:", error)
            showToast("Failed to delete draft", "error")
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box>
            <Typography variant="h5" component="h1" gutterBottom>
                Draft Blogs
            </Typography>

            {blogs.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
                    No drafts found.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {blogs.map((blog) => (
                        <Grid item xs={12} sm={6} md={4} key={blog._id}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {blog.title || "Untitled"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Last edited: {new Date(blog.updatedAt).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
                                    </Typography>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        {blog.tags.map((tag, index) => (
                                            <Chip key={index} label={tag} size="small" />
                                        ))}
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleEdit(blog._id)}>
                                        Continue Editing
                                    </Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(blog._id)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}

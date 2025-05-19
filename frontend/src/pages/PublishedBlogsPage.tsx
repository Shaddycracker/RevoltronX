import { useState, useEffect } from "react"
import { Typography, Box, Card, CardContent, CardActions, Button, Chip, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import {deleteBlog, userBlogs} from "../api/blogApi"
import { useToast } from "../hooks/useToast"
import type { Blog } from "../types"

export default function PublishedBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { showToast } = useToast()

    useEffect(() => {
        fetchPublishedBlogs()
    }, [])

    const fetchPublishedBlogs = async () => {
        try {
            setLoading(true)
            const data = await userBlogs()
            setBlogs(data.filter((blog) => blog.status === "published"))
        } catch (error) {
            console.error("Error fetching blogs:", error)
            showToast("Failed to load published blogs", "error")
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
            showToast("Blog deleted successfully", "success")
            await fetchPublishedBlogs()
        } catch (error) {
            console.error("Error deleting blog:", error)
            showToast("Failed to delete blog", "error")
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
                Published Blogs
            </Typography>

            {blogs.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
                    No published blogs found.
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                    }}
                >
                    {blogs.map((blog) => (
                        <Box
                            key={blog._id}
                            sx={{
                                width: {
                                    xs: "100%", // 1 column on extra-small screens
                                    sm: "calc(50% - 12px)", // 2 columns on small screens
                                    md: "calc(33.333% - 16px)", // 3 columns on medium+ screens
                                },
                                flexGrow: 1,
                            }}
                        >
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {blog.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Published: {new Date(blog.updatedAt).toLocaleDateString()}
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
                                        Edit
                                    </Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(blog._id)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}

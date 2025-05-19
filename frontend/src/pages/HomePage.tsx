import { useState, useEffect } from "react"
import { Typography, Box, Card, CardContent, CardActions, Button, Chip, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getBlogs, deleteBlog } from "../api/blogApi"
import { useToast } from "../hooks/useToast"
import {useUser} from "../hooks/useUser"
import type { Blog } from "../types"

export default function HomePage() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { showToast } = useToast()
    const { user } = useUser()

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            const data = await getBlogs()
            setBlogs(data.filter((blog)=>blog.status==="published"))
        } catch (error) {
            console.error("Error fetching blogs:", error)
            showToast("Failed to load blogs", "error")
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
            fetchBlogs()
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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h5" component="h1">
                    All Blogs
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate("/create")}>
                    Create New Blog
                </Button>
            </Box>

            {blogs.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
                    No blogs found. Create your first blog!
                </Typography>
            ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    {blogs.map((blog) => (
                        <Box
                            key={blog._id}
                            sx={{
                                flex: "1 1 calc(33.333% - 24px)",
                                minWidth: "280px",
                                boxSizing: "border-box",
                                cursor:'pointer',
                            }}
                        >
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardContent sx={{ flexGrow: 1 }} onClick={()=>navigate(`/view/${blog._id}`)}>
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
                                {user && user.id==blog.userId && <CardActions sx={{zIndex:50}}>
                                    <Button size="small" onClick={() => handleEdit(blog._id)}>
                                        Edit
                                    </Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(blog._id)}>
                                        Delete
                                    </Button>
                                </CardActions>
                               }
                            </Card>
                        </Box>
                    ))}
                </Box>

            )}
        </Box>
    )
}

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Typography, Box, CircularProgress, Button } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import BlogEditor from "../components/BlogEditor"
import { getBlogById } from "../api/blogApi"
import { useToast } from "../hooks/useToast"
import type { Blog } from "../types"

export default function EditBlogPage() {
    const { id } = useParams<{ id: string }>()
    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            fetchBlog(id)
        }
    }, [id])

    const fetchBlog = async (blogId: string) => {
        try {
            setLoading(true)
            const data = await getBlogById(blogId)
            setBlog(data)
        } catch (error) {
            console.error("Error fetching blog:", error)
            showToast("Failed to load blog", "error")
            navigate("/")
        } finally {
            setLoading(false)
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
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                    Back
                </Button>
                <Typography variant="h5" component="h1">
                    Edit Blog
                </Typography>
            </Box>
            {blog && <BlogEditor blog={blog} autoSaveInterval={600000} />} {/* 10 minutes = 600000 ms */}
        </Box>
    )
}

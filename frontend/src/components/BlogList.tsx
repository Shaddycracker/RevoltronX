"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
    Box,
    Typography,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Chip,
    Paper,
    Divider,
    CircularProgress,
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { useToast } from "../hooks/useToast"
import { getBlogs, deleteBlog } from "../api/blogApi"
import type { Blog } from "../types"

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`blog-tabpanel-${index}`}
            aria-labelledby={`blog-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    )
}

interface BlogListProps {
    onEditBlog: (blog: Blog) => void
}

export default function BlogList({ onEditBlog }: BlogListProps) {
    const [value, setValue] = useState(0)
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()

    const fetchBlogs = async () => {
        try {
            setLoading(true)
            const data = await getBlogs()
            setBlogs(data)
        } catch (error) {
            console.error("Error fetching blogs:", error)
            showToast("Failed to load blogs", "error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const handleEdit = (blog: Blog) => {
        onEditBlog(blog)
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

    const publishedBlogs = blogs.filter((blog) => blog.status === "published")
    const draftBlogs = blogs.filter((blog) => blog.status === "draft")

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
                Your Blogs
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="blog tabs">
                    <Tab label={`Published (${publishedBlogs.length})`} />
                    <Tab label={`Drafts (${draftBlogs.length})`} />
                </Tabs>
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <TabPanel value={value} index={0}>
                        {publishedBlogs.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                                No published blogs yet.
                            </Typography>
                        ) : (
                            <List>
                                {publishedBlogs.map((blog) => (
                                    <Box key={blog._id}>
                                        <ListItem
                                            secondaryAction={
                                                <Box>
                                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(blog)}>
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(blog._id)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            }
                                        >
                                            <ListItemText
                                                primary={blog.title}
                                                secondary={
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                            {new Date(blog.updatedAt).toLocaleDateString()}
                                                        </Typography>
                                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                            {blog.tags.map((tag, index) => (
                                                                <Chip key={index} label={tag} size="small" />
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                ))}
                            </List>
                        )}
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        {draftBlogs.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                                No drafts available.
                            </Typography>
                        ) : (
                            <List>
                                {draftBlogs.map((blog) => (
                                    <Box key={blog._id}>
                                        <ListItem
                                            secondaryAction={
                                                <Box>
                                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(blog)}>
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(blog._id)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            }
                                        >
                                            <ListItemText
                                                primary={blog.title || "Untitled"}
                                                secondary={
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                            Last edited: {new Date(blog.updatedAt).toLocaleDateString()}
                                                        </Typography>
                                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                            {blog.tags.map((tag, index) => (
                                                                <Chip key={index} label={tag} size="small" />
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                ))}
                            </List>
                        )}
                    </TabPanel>
                </>
            )}
        </Paper>
    )
}

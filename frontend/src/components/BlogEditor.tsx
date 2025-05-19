"use client"

import { useState, useEffect, useCallback } from "react"
import { Box, TextField, Button, Paper, Typography, Chip, Stack, CircularProgress } from "@mui/material"
import debounce from "lodash.debounce"
import { useToast } from "../hooks/useToast"
import { saveDraft, publishBlog } from "../api/blogApi"
import type { Blog } from "../types"
import { useNavigate } from "react-router-dom"

interface BlogEditorProps {
    blog?: Blog | null
    autoSaveInterval?: number
}

export default function BlogEditor({ blog, autoSaveInterval = 5000 }: BlogEditorProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState("")
    const [saving, setSaving] = useState(false)
    const [publishing, setPublishing] = useState(false)
    const [blogId, setBlogId] = useState<string | null>(null)
    const { showToast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (blog) {
            setTitle(blog.title)
            setContent(blog.content)
            setTags(blog.tags.join(", "))
            setBlogId(blog._id)
        } else {
            setTitle("")
            setContent("")
            setTags("")
            setBlogId(null)
        }
    }, [blog])

    // Auto-save functionality with debounce
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSave = useCallback(
        debounce(async (blogData: Partial<Blog>) => {
            if (!title && !content) return

            try {
                setSaving(true)
                const response = await saveDraft(blogData)
                if (response._id && !blogId) {
                    setBlogId(response._id)
                }
                showToast("Draft saved automatically", "success")
            } catch (error) {
                showToast("Failed to save draft", "error")
                console.error("Auto-save error:", error)
            } finally {
                setSaving(false)
            }
        }, autoSaveInterval), // Use the provided autoSaveInterval
        [blogId],
    )

    useEffect(() => {
        if (title || content) {
            const blogData: Partial<Blog> = {
                title,
                content,
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
            }

            if (blogId) {
                blogData._id = blogId
            }

            debouncedSave(blogData)
        }

        return () => {
            debouncedSave.cancel()
        }
    }, [title, content, tags, blogId, debouncedSave])

    const handleSaveDraft = async () => {
        if (!title && !content) {
            showToast("Please add some content before saving", "warning")
            return
        }

        try {
            setSaving(true)
            const blogData: Partial<Blog> = {
                title,
                content,
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
            }

            if (blogId) {
                blogData._id = blogId
            }

            const response = await saveDraft(blogData)
            if (response._id && !blogId) {
                setBlogId(response._id)
            }
            showToast("Draft saved successfully", "success")
        } catch (error) {
            showToast("Failed to save draft", "error")
            console.error("Save draft error:", error)
        } finally {
            setSaving(false)
        }
    }

    const handlePublish = async () => {
        if (!title) {
            showToast("Please add a title before publishing", "warning")
            return
        }

        if (!content) {
            showToast("Please add some content before publishing", "warning")
            return
        }

        try {
            setPublishing(true)
            const blogData: Partial<Blog> = {
                title,
                content,
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
            }

            if (blogId) {
                blogData._id = blogId
            }

            const publishedBlog = await publishBlog(blogData)
            showToast("Blog published successfully", "success")

            // Reset form if it's a new blog and navigate to the published blog
            if (!blog) {
                setTitle("")
                setContent("")
                setTags("")
                setBlogId(null)
                navigate("/published")
            } else {
                navigate(`/blog/${publishedBlog._id}`)
            }
        } catch (error) {
            showToast("Failed to publish blog", "error")
            console.error("Publish error:", error)
        } finally {
            setPublishing(false)
        }
    }

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                />

                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog content here..."
                />

                <TextField
                    label="Tags (comma-separated)"
                    variant="outlined"
                    fullWidth
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="technology, programming, web development"
                    helperText="Optional: Add tags separated by commas"
                />

                {tags && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {tags
                            .split(",")
                            .map(
                                (tag, index) =>
                                    tag.trim() && <Chip key={index} label={tag.trim()} size="small" color="primary" variant="outlined" />,
                            )}
                    </Box>
                )}

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleSaveDraft}
                        disabled={saving || publishing}
                        startIcon={saving && <CircularProgress size={20} />}
                    >
                        {saving ? "Saving..." : "Save as Draft"}
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePublish}
                        disabled={saving || publishing}
                        startIcon={publishing && <CircularProgress size={20} />}
                    >
                        {publishing ? "Publishing..." : "Publish"}
                    </Button>
                </Stack>

                {saving && (
                    <Typography variant="caption" color="text.secondary">
                        Auto-saving...
                    </Typography>
                )}
            </Box>
        </Paper>
    )
}

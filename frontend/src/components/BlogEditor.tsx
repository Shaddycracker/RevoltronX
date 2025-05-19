import {useState, useEffect} from "react"
import {Box, TextField, Button, Paper, Typography, Chip, Stack, CircularProgress} from "@mui/material"
import {useToast} from "../hooks/useToast"
import {saveDraft, publishBlog} from "../api/blogApi"
import type {Blog} from "../types"
import {useNavigate} from "react-router-dom"

interface BlogEditorProps {
    blog?: Blog | null
    autoSaveInterval?: number
}

export default function BlogEditor({blog,autoSaveInterval=5000}: BlogEditorProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState("")
    const [saving, setSaving] = useState(false)
    const [publishing, setPublishing] = useState(false)
    const {showToast} = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (blog) {
            setTitle(blog.title)
            setContent(blog.content)
            setTags(blog.tags.join(", "))
        } else {
            setTitle("")
            setContent("")
            setTags("")
        }
    }, [blog])

    useEffect(() => {
        if (!title && !content) return; // Exit early if nothing to save

        const timeout = setTimeout(async () => {
            try {

                if(blog && blog?._id) {
                    const blogData: Partial<Blog> = {
                        _id: blog._id,
                        title,
                        content,
                        tags: tags
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== ""),
                    };
                     await saveDraft(blogData);

                }else{
                    const blogData2: Partial<Blog> = {
                        title,
                        content,
                        tags: tags
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== ""),
                    };
                    await saveDraft(blogData2);

                }
                showToast("Draft saved automatically", "success");
            } catch (error) {
                console.error("Auto-save failed", error);
                showToast("Failed to auto-save draft", "error");
            } finally {
                setSaving(false);
            }
        },autoSaveInterval);

        return () => {
            clearTimeout(timeout); // Cancel previous timeout on title/content change
        };
    }, [title, content, tags]);

    const handleSaveDraft = async () => {
        if (!title && !content) {
            showToast("Please add some content before saving", "warning")
            return
        }

        try {
            const blogData: Partial<Blog> = {
                title,
                content,
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
            }
            await saveDraft(blogData)

            showToast("Draft saved successfully", "success")
        } catch (error) {
            showToast("Failed to save draft", "error")
            console.error("Save draft error:", error)
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
            await publishBlog(blogData)
            showToast("Blog published successfully", "success")

            // Reset form if it's a new blog and navigate to the published blog

                setTitle("")
                setContent("")
                setTags("")
                navigate("/published")
        } catch (error) {
            showToast("Failed to publish blog", "error")
            console.error("Publish error:", error)
        } finally {
            setPublishing(false)
        }
    }

    return (
        <Paper elevation={2} sx={{p: 3}}>
            <Box component="form" noValidate autoComplete="off" sx={{display: "flex", flexDirection: "column", gap: 3}}>
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
                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                        {tags
                            .split(",")
                            .map(
                                (tag, index) =>
                                    tag.trim() && <Chip key={index} label={tag.trim()} size="small" color="primary"
                                                        variant="outlined"/>,
                            )}
                    </Box>
                )}

                <Stack direction="row" spacing={2} sx={{mt: 2}}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleSaveDraft}
                        disabled={saving || publishing}
                        startIcon={saving && <CircularProgress size={20}/>}
                    >
                        {saving ? "Saving..." : "Save as Draft"}
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePublish}
                        disabled={saving || publishing}
                        startIcon={publishing && <CircularProgress size={20}/>}
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

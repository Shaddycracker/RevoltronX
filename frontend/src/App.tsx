"use client"

import { useEffect, useState } from "react"
import { Container, Box, Typography, Button, CircularProgress } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import BlogEditor from "./components/BlogEditor"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import { ToastContainer } from "./components/ToastContainer"
import { useToast } from "./hooks/useToast"
import { theme } from "./theme"
import type { Blog } from "./types"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
    const { showToast } = useToast()

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
        setLoading(false)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        showToast("Logged out successfully", "success")
    }

    const handleEditBlog = (blog: Blog) => {
        setSelectedBlog(blog)
    }

    const handleNewBlog = () => {
        setSelectedBlog(null)
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Blog Editor
                        </Typography>
                        {isLoggedIn && (
                            <Button variant="outlined" color="primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </Box>

                    {!isLoggedIn ? (
                        <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                    <Typography variant="h6" component="h2">
                                        {selectedBlog ? "Edit Blog" : "New Blog"}
                                    </Typography>
                                    {selectedBlog && (
                                        <Button variant="contained" color="primary" onClick={handleNewBlog}>
                                            New Blog
                                        </Button>
                                    )}
                                </Box>
                                <BlogEditor blog={selectedBlog} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <BlogList onEditBlog={handleEditBlog} />
                            </Box>
                        </Box>
                    )}
                </Box>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    )
}

export default App

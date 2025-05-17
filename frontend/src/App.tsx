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
import { useUser } from "./hooks/useUser";
function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    // const [Loading, setLoading] = useState<boolean>(true)
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
    const { showToast } = useToast()
    const { user, isAuthenticated ,setUser,setIsAuthenticated,setLoading,Loading } = useUser();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token")
        if (token) {
            setIsAuthenticated(true)
        }
        setLoading(false)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setUser(null)
        showToast("Logged out successfully", "success")
    }

    const handleEditBlog = (blog: Blog) => {
        setSelectedBlog(blog)
    }

    const handleNewBlog = () => {
        setSelectedBlog(null)
    }

    if (Loading) {
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
                        <Typography variant="h4" component="h1" gutterBottom>
                            {user?.email}
                        </Typography>
                        {isAuthenticated && (
                            <Button variant="outlined" color="primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </Box>

                    {!isAuthenticated ? (
                        <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
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

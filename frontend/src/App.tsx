import {useEffect} from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import { Box, CircularProgress} from "@mui/material"
import {ToastContainer} from "./components/ToastContainer"
import {useUser} from "./hooks/useUser"
import LoginForm from "./components/LoginForm"
import HomePage from "./pages/HomePage"
import CreateBlogPage from "./pages/CreateBlogPage"
import EditBlogPage from "./pages/EditBlogPage"
import PublishedBlogsPage from "./pages/PublishedBlogsPage"
import DraftBlogsPage from "./pages/DraftBlogsPage"
import Layout from "./components/Layout.tsx"
import {isVerify} from "./api/authApi.ts";
import BlogViewPage from "./pages/BlogViewPage.tsx";

function App() {
    const {setUser,isAuthenticated, setIsAuthenticated, setLoading, Loading} = useUser()

    useEffect(() => {
        fetchUser()
    }, [setIsAuthenticated, setLoading])

    const fetchUser = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem("token")
            if (!token){
                setUser(null)
                setIsAuthenticated(false)
                setLoading(false)
                localStorage.removeItem("token")
                return
            }
            const raw = await isVerify(token)
            setUser({ ...raw, id: raw._id })
            setIsAuthenticated(true)
        } catch (err) {
            console.error("Failed to fetch user:", err)
            localStorage.removeItem("token")
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    if (Loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (

        <>

            {isAuthenticated ? (
                <>


                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="create" element={<CreateBlogPage/>}/>
                            <Route path="blog/:id" element={<EditBlogPage/>}/>
                            <Route path="published" element={<PublishedBlogsPage/>}/>
                            <Route path="drafts" element={<DraftBlogsPage/>}/>
                            <Route path="view/:id" element={<BlogViewPage />}/>
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>




                </>
            ) : (
                <LoginForm onLoginSuccess={() => setIsAuthenticated(true)}/>
            )}
            <ToastContainer/>
        </>

    )
}

export default App

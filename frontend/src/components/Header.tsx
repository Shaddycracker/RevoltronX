import {AppBar, Toolbar, Typography, Button, Box, IconButton} from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import {Brightness4, Brightness7} from "@mui/icons-material"
import {useToast} from "../hooks/useToast"
import {useUser} from "../hooks/useUser"

export default function Header({toggleTheme, currentMode}: { toggleTheme: () => void; currentMode: "light" | "dark" }) {
    const navigate = useNavigate()
    const {showToast} = useToast()
    const {user, setUser, setIsAuthenticated} = useUser()

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setUser(null)
        showToast("Logged out successfully", "success")
        navigate("/")
    }

    return (
        <AppBar position="static" sx={{mb: 4,borderRadius:'0px'}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1,cursor:'pointer'}} onClick={()=>navigate("/")}>
                    Blog Editor
                </Typography>

                <Box sx={{display: "flex", gap: 2}}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/create">
                        New Blog
                    </Button>
                    <Button color="inherit" component={Link} to="/published">
                        Published
                    </Button>
                    <Button color="inherit" component={Link} to="/drafts">
                        Drafts
                    </Button>
                </Box>

                <Box sx={{display: "flex", alignItems: "center", ml: 2}}>
                    {user && (
                        <Typography variant="body2" sx={{mr: 2}}>
                            Hi ,{user.name}
                        </Typography>
                    )}
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {currentMode === "dark" ? <Brightness7/> : <Brightness4/>}
                    </IconButton>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

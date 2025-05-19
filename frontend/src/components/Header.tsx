import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {Brightness4, Brightness7, Menu, Close} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {useToast} from "../hooks/useToast";
import {useUser} from "../hooks/useUser";

export default function Header({
                                   toggleTheme,
                                   currentMode
                               }: {
    toggleTheme: () => void;
    currentMode: "light" | "dark";
}) {
    const navigate = useNavigate();
    const {showToast} = useToast();
    const {user, setUser, setIsAuthenticated} = useUser();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        showToast("Logged out successfully", "success");
        navigate("/");
        setDrawerOpen(false);
    };

    const menuItems = [
        {label: "Home", path: "/"},
        {label: "New Blog", path: "/create"},
        {label: "Published", path: "/published"},
        {label: "Drafts", path: "/drafts"}
    ];

    const handleMenuClick = (path: string) => {
        navigate(path);
        setDrawerOpen(false); // Auto-close drawer on selection
    };

    return (
        <>
        <AppBar position="static" sx={{mb: 4, borderRadius: "0px"}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{cursor: "pointer"}}
                    onClick={() => navigate("/")}
                >
                    Blog Editor
                </Typography>

                {isMobile ? (
                    <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                        <Menu/>
                    </IconButton>
                ) : (
                    <>
                        <Box sx={{display: "flex", gap: 2}}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.label}
                                    color="inherit"
                                    component={Link}
                                    to={item.path}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", ml: 2}}>
                            {user && (
                                <Typography variant="body2" sx={{mr: 2}}>
                                    Hi, {user.name}
                                </Typography>
                            )}
                            <IconButton color="inherit" onClick={toggleTheme}>
                                {currentMode === "dark" ? <Brightness7/> : <Brightness4/>}
                            </IconButton>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                    </>
                )}
            </Toolbar>
        </AppBar>

        {/* Fullscreen Drawer for Mobile */}
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
                sx: {
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.palette.background.default

                }
            }}
        >
            <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
                <Typography variant="h6">Menu</Typography>
                <IconButton onClick={() => setDrawerOpen(false)}>
                    <Close/>
                </IconButton>
            </Box>
            <List sx={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',cursor:'pointer'}}>
                {menuItems.map((item) => (
                    <ListItem key={item.label} onClick={() => handleMenuClick(item.path)}>
                        <ListItemText primary={item.label}/>
                    </ListItem>
                ))}
                {user && (
                    <ListItem>
                        <ListItemText primary={`Hi, ${user.name}`}/>
                    </ListItem>
                )}
            <ListItem>
            <IconButton color="inherit" onClick={toggleTheme}>
                {currentMode === "dark" ? <Brightness7/> : <Brightness4/>}
            </IconButton>
        </ListItem>
        <ListItem>
            <Button color="inherit" onClick={handleLogout}>
                Logout
            </Button>
        </ListItem>

        </List>
</Drawer>
</>
)
    ;
}

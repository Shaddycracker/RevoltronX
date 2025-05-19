import { useState } from "react"
import { Outlet } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import { Container, Box } from "@mui/material"
import { lightTheme, darkTheme } from "../theme"
import Header from "./Header"
import { CssBaseline } from "@mui/material"
import { ToastContainer } from "./ToastContainer"

const Layout = () => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme")
        return storedTheme === "dark" ? darkTheme : lightTheme
    })

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev.palette.mode === "light" ? darkTheme : lightTheme
            localStorage.setItem("theme", newTheme.palette.mode)
            return newTheme
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header toggleTheme={toggleTheme} currentMode={theme.palette.mode} />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Outlet />
                </Box>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    )
}

export default Layout

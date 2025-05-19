"use client"

import type React from "react"

import { useState } from "react"
import { Box, TextField, Button, Paper, CircularProgress, Tabs, Tab } from "@mui/material"
import { useToast } from "../hooks/useToast"
import { login, register } from "../api/authApi"
import {useUser} from "../hooks/useUser"

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
            id={`auth-tabpanel-${index}`}
            aria-labelledby={`auth-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

interface LoginFormProps {
    onLoginSuccess: () => void
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [tabValue, setTabValue] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const { showToast } = useToast()
    const {setUser,setIsAuthenticated,Loading,setLoading} = useUser()

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setEmail("")
        setName("")
        setPassword("")
        setTabValue(newValue)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            showToast("Please fill in all fields", "warning")
            return
        }

        try {
            setLoading(true)
            const data = await login({ email, password })
            localStorage.setItem("token", data.data.token)
            console.log("token after login ",)
            setUser(data.data.user)
            setIsAuthenticated(true)
            showToast("Logged in successfully", "success")
            onLoginSuccess()
        } catch (error) {
            showToast("Invalid email or password", "error")
            console.error("Login error:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !email || !password) {
            showToast("Please fill in all fields", "warning")
            return
        }

        try {
            setLoading(true)
            const data = await register({ name, email, password })
            localStorage.setItem("token", data.token)
            showToast("Registered successfully", "success")
            setTabValue(1)
        } catch (error) {
            showToast("Registration failed", "error")
            console.error("Registration error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Paper elevation={3} sx={{ maxWidth: 500, mx: "auto", mt: 8 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="auth tabs">
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={Loading}>
                        {Loading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={Loading}>
                        {Loading ? <CircularProgress size={24} /> : "Register"}
                    </Button>
                </Box>
            </TabPanel>
        </Paper>
    )
}

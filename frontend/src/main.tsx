import React from "react"
import ReactDOM from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { ToastProvider } from "./hooks/useToast"
import { UserProvider } from "./hooks/useUser.tsx"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <CssBaseline />
        <BrowserRouter>
            <ToastProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </ToastProvider>
        </BrowserRouter>
    </React.StrictMode>,
)

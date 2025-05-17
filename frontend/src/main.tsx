import React from "react"
import ReactDOM from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import App from "./App"
import { ToastProvider } from "./hooks/useToast"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <CssBaseline />
        <ToastProvider>
            <App />
        </ToastProvider>
    </React.StrictMode>,
)

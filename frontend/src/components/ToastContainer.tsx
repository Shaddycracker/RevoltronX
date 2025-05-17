"use client"

import { Alert, Snackbar } from "@mui/material"
import { useToast } from "../hooks/useToast"

export function ToastContainer() {
    const { toast, hideToast } = useToast()

    if (!toast) return null

    return (
        <Snackbar
            open={!!toast}
            autoHideDuration={6000}
            onClose={hideToast}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert onClose={hideToast} severity={toast.type} variant="filled" sx={{ width: "100%" }}>
                {toast.message}
            </Alert>
        </Snackbar>
    )
}

"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
    message: string
    type: ToastType
}

interface ToastContextType {
    toast: Toast | null
    showToast: (message: string, type: ToastType) => void
    hideToast: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<Toast | null>(null)

    const showToast = (message: string, type: ToastType) => {
        setToast({ message, type })
    }

    const hideToast = () => {
        setToast(null)
    }

    return <ToastContext.Provider value={{ toast, showToast, hideToast }}>{children}</ToastContext.Provider>
}

export function useToast() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

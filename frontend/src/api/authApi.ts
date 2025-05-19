import { API_URL } from "../config"
import { handleResponse } from "./apiUtils"
import type {LoginResponse} from "../types"
export async function login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })

    return handleResponse<LoginResponse>(response)
}

export async function register(userData: { name: string; email: string; password: string }): Promise<{
    token: string
}> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })

    return handleResponse<{ token: string }>(response)
}
export async function isVerify(token:string): Promise<{_id:string,name:string,email:string}> {
    const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    return handleResponse<{_id:string,name:string,email:string}>(response)
}

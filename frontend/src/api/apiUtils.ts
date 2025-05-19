export async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "An error occurred")
    }
    return response.json()
}

export async function authFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token")

    if (!token) {
        throw new Error("Authentication required")
    }
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers,
    }

    return fetch(url, { ...options, headers })
}

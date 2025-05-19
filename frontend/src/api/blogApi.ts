import type {Blog} from "../types"
import { API_URL } from "../config"
import { authFetch, handleResponse } from "./apiUtils"

// Blog API
export async function getBlogs(): Promise<Blog[]> {
    const response = await authFetch(`${API_URL}/api/blog`)
    return handleResponse<Blog[]>(response)
}

export async function getBlogById(id: string): Promise<Blog> {
    const response = await authFetch(`${API_URL}/api/blog/${id}`)
    return handleResponse<Blog>(response)
}
export async function viewBlogById(id: string): Promise<Blog> {
    const response = await authFetch(`${API_URL}/api/blog/view/${id}`)
    return handleResponse<Blog>(response)
}

export async function saveDraft(blogData: Partial<Blog>): Promise<Blog> {
    const response = await authFetch(`${API_URL}/api/blog/save-draft`, {
        method: "POST",
        body: JSON.stringify(blogData),
    })

    return handleResponse<Blog>(response)
}

export async function publishBlog(blogData: Partial<Blog>): Promise<Blog> {
    const response = await authFetch(`${API_URL}/api/blog/publish`, {
        method: "POST",
        body: JSON.stringify(blogData),
    })

    return handleResponse<Blog>(response)
}

export async function deleteBlog(id: string): Promise<void> {
    const response = await authFetch(`${API_URL}/api/blog/${id}`, {
        method: "DELETE",
    })

    return handleResponse<void>(response)
}
export async function userBlogs(): Promise<Blog[]>{
    const response =await authFetch(`${API_URL}/api/blog/user/blog`)
    return handleResponse<Blog[]>(response)
}
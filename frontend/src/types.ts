export interface Blog {
    _id: string
    title: string
    content: string
    tags: string[]
    status: "draft" | "published"
    createdAt: string
    updatedAt: string
}

export interface User {
    _id: string
    name: string
    email: string
}

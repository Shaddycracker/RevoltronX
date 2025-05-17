export interface Blog {
    _id: string
    author: string
    title: string
    content: string
    tags: string[]
    status: "draft" | "published"
    createdAt: string
    updatedAt: string
}

export interface User {
    id: string
    name: string
    email: string
}

export interface LoginResponse {
    message: string,
    data: {
        token: string,
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

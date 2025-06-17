interface Token {
    access: string
    refresh: string
}

interface ErrorResponse {
    message: string
    code: string
    status: number
    details?: any
    timestamp: string
}

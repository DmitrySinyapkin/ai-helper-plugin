interface Message {
    role: string
    content: string | null
    url?: string
}

interface Choice {
    finish_reason: string
    message: Message
}

interface ChatCompletion {
    id: string
    model: string
    choices: Choice[]
}

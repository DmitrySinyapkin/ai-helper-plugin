interface Message {
    role: string
    content: string
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

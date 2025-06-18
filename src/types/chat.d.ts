interface Message {
    role: string
    content: string | null
    url?: string
    isError?: boolean
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

interface ModelArchitecture {
    modality: string
    input_modalities: string[]
    output_modalities: string[]
    tokenizer: string
    instruct_type: string | null
}

interface ModelPricing {
    prompt: string
    completion: string
    request: string
    image: string
    web_search: string
    internal_reasoning: string
}

interface ModelTopProvider {
    context_length: number
    max_completion_tokens: number
    is_moderated: boolean
}

interface OpenRouterModel {
    id: string
    canonical_slug: string
    hugging_face_id: string
    name: string
    created: number
    description: string
    context_length: number
    architecture: ModelArchitecture
    pricing: ModelPricing
    top_provider: ModelTopProvider
    per_request_limits: any
    supported_parameters: string[]
}

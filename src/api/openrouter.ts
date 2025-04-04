import OpenAI from "openai"
import { ChatCompletion } from "openai/resources.mjs"

export const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export const MODELS = [
    'google/gemini-2.5-pro-exp-03-25:free',
    'qwen/qwen2.5-vl-72b-instruct:free',
    'deepseek/deepseek-r1-distill-llama-70b:free',
    'deepseek/deepseek-r1:free'
]

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    dangerouslyAllowBrowser: true
})

export const getChatCompletion = async (prompt: string, model: string = MODELS[0]): Promise<Partial<ChatCompletion> | null> => {
    try {
        openai.baseURL = getBaseURL(model)

        const  completion = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    
        if (completion.id) {
            return completion
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

const getBaseURL = (model: string) => {
    return model.includes('google') && process.env.OPENROUTER_PROXY_BASE_URL
        ? import.meta.env.VITE_OPENROUTER_PROXY_BASE_URL
        : OPENROUTER_BASE_URL
}

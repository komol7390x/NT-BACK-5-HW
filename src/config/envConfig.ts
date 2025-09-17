import dotenv from 'dotenv'
dotenv.config()

export type envConfig = {
    PORT: number,
    API_URL: string,
API_VERSION:string,

    DATABASE: {
        NAME: string
        PORT: number
        USER: string
        PASS: string
        HOST: string
    }
}

export const config: envConfig = {
    PORT: Number(process.env.PORT),
    API_URL:String(process.env.API_URL),
    API_VERSION:String(process.env.API_VERSION),
    
    DATABASE: {
        NAME: String(process.env.DB_NAME),
        PORT: Number(process.env.DB_PORT),
        USER: String(process.env.DB_USER),
        PASS: String(process.env.DB_PASS),
        HOST: String(process.env.DB_HOST),
    }
}
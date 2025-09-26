import dotenv from 'dotenv'
dotenv.config()

export const config = {
    PORT: Number(process.env.PORT),
    API_URL: String(process.env.API_URL),
    API_VERSION: String(process.env.API_VERSION),

    DATABASE_URL: String(process.env.DATABASE_URL),
}
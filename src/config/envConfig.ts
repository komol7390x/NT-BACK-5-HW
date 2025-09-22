import dotenv from 'dotenv'
dotenv.config()

export interface IConfig {
    PORT: number,
    API_URL: string,

    DB: {
        USER: string
        PASS: string
        HOST: string
        PORT: number
        NAME: string
    },
    API_VERSION:string
}

export const config: IConfig = {
    PORT: Number(process.env.PORT),
    API_URL: String(process.env.API_URL),

    DB: {
        USER: String(process.env.DB_USER),
        PASS: String(process.env.DB_PASS),
        HOST: String(process.env.DB_HOST),
        PORT: Number(process.env.DB_PORT),
        NAME: String(process.env.DB_NAME),
    },
    API_VERSION:String(process.env.API_VERSION)
}
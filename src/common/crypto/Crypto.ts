import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

@Injectable()
export class CryptoService {
    async encrypt(data: string) {
        return await hash(data, 7)
    }

    async decrypt(password: string, hash_password: string) {
        return await compare(password, hash_password)
    }
}
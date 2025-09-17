import {Injectable} from '@nestjs/common'
import {compare, hash} from 'bcrypt'

@Injectable()
export class CryptoService{
    async encrypt(password:string):Promise<string>{
        const result=await hash(password,7)
        return result
    }

    async decrypt(password:string,hashed_password:string):Promise<boolean>{
        return await compare(password,hashed_password)
    }
}
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '../../generated/prisma'
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
    async onModuleInit() {
        await this.$connect()
        console.log('User database connect ✅');
    }
    async onModuleDestroy() {
        await this.$disconnect()
        console.log('User database disconnect ❌');
    }
}
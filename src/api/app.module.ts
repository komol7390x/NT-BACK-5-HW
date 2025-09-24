import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostModule } from './post/post.module';

@Module({

  imports: [UserModule, PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // graphiql: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    }),
    PostModule
  ]
})
export class AppModule { } 
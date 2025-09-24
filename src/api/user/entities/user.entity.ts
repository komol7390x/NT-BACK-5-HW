import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/api/post/entities/post.entity';

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => Int)
    age: number;

    @Field()
    password: string;

    @Field(() => [Post], { nullable: true })
    post?: Post[];
}

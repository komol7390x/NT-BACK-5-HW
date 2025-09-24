// src/api/post/entities/post.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/api/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => User, { nullable: true })
  User?: User;
}

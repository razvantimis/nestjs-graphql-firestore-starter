import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './types/UserType';
import { UserService } from './user.service';
import { UserInput } from './types/UserInput';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from './auth.middleware';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType, { nullable: true })
  async UserInstance(@DecodedIdToken() decodedIdToken: auth.DecodedIdToken) {
    const user = await this.userService.findById(decodedIdToken.uid);
    return user;
  }

  @Mutation(() => UserType)
  async UserCreate(@Args('resource') resource: UserInput) {
    return this.userService.create(resource);
  }
}

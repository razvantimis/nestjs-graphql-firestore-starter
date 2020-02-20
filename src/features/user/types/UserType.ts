import { ObjectType, Field, Int, ID, registerEnumType } from 'type-graphql';
import { Collection } from 'fireorm';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
@ObjectType()
@Collection("user")
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  readonly fullName: string;

  @Field()
  readonly email: string;

  @Field(() => UserRole)
  readonly role: UserRole;
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

import { Field, InputType, ID } from "type-graphql";
import { UserRole } from "./UserType";

@InputType()
export class UserInput {
  @Field()
  readonly fullName: string;
  
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field(() => UserRole)
  readonly role: UserRole;
}
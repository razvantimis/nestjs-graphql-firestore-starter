import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserType, UserRole } from './types/UserType';
import { CurrentFirebaseUser } from './user.decorator';
import { UserInput } from './types/UserInput';
import { getFireStore, getFirebaseApp } from 'src/utils/firebase';
import { auth } from 'firebase-admin';

@Resolver()
export class UserResolver {
  constructor() {}

  @Query(() => UserType, { nullable: true })
  async UserInstanceByToken(@CurrentFirebaseUser() user) {
    const userResult = {
      id: user.uid,
      fullName: user.name,
      email: user.email,
      role: UserRole.User,
    };
    return userResult;
  }

  @Mutation(() => UserType)
  async UserCreate(@Args('resource') resource: UserInput) {
    const { email, password, fullName } = resource;
    let saveUser;
    let userFirebase: auth.UserRecord | null;

    try {
      // save to firebase
      userFirebase = await getFirebaseApp()
        .auth()
        .createUser({
          email,
          emailVerified: false,
          password,
          displayName: fullName,
          disabled: false,
        });
      // save local
      await getFireStore()
        .collection('users')
        .doc(userFirebase.uid)
        .set({
          ...resource,
          id: userFirebase.uid,
        });
    } catch (err) {
      console.log(err);
      if (userFirebase) {
        await getFirebaseApp()
          .auth()
          .deleteUser(userFirebase.uid);
      }
      throw err;
    }
    return { ...resource, id: userFirebase.uid };
  }
}

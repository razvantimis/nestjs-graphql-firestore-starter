import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { getRepository, BaseFirestoreRepository } from 'fireorm';
import { UserType } from './types/UserType';
import { getFirebaseApp } from 'src/utils/firebase';
import { UserInput } from './types/UserInput';

@Injectable()
export class UserService {
  userRepository: BaseFirestoreRepository<UserType>;
  constructor() {
    this.userRepository = getRepository(UserType);
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  async create(resource: UserInput) {
    const { email, password, fullName } = resource;
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
      return await this.userRepository.create({
        ...resource,
        id: userFirebase.uid,
      });
    } catch (err) {
      if (userFirebase) {
        await getFirebaseApp()
          .auth()
          .deleteUser(userFirebase.uid);
      }
      throw err;
    }
  }
}

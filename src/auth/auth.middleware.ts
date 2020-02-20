import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { Request, Response } from 'express'
import { getFirebaseApp } from 'src/utils/firebase'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, _: Response, next: Function) {
    const { authorization } = req.headers
    if(!authorization) {
        next();
        return;
    }
    const token = authorization.replace("Bearer ", "")

    const user = await getFirebaseApp()
      .auth()
      .verifyIdToken(token)
      .catch(err => {
        throw new HttpException({ message: 'Input data validation failed', err }, HttpStatus.UNAUTHORIZED)
      })

    req.firebaseUser = user
    next()
  }
}
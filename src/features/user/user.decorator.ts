import { createParamDecorator } from '@nestjs/common';

export const CurrentFirebaseUser = createParamDecorator(
  (data, [root, args, ctx, info]) =>  ctx.req.firebaseUser,
);

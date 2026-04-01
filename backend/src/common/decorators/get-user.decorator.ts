import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../../users/schemas/user.schema';

/**
 * Custom decorator to extract authenticated user from request
 * Usage: @GetUser() user: UserDocument
 * Usage: @GetUser('email') email: string
 */
export const GetUser = createParamDecorator(
  (data: keyof UserDocument | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserDocument;

    return data ? user?.[data] : user;
  },
);

/** @format */

import getPayLoadClient from '../get-payload';
import { publicProcedure, router } from './trpc';
import { AuthCredentialsValidator } from '../lib/validators/account-creadentials-validator';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayLoadClient();

      //check if user already exits
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: { equals: email },
        },
      });
      if (users.length !== 0) {
        throw new TRPCError({ code: 'CONFLICT' });
      }

      await payload.create({
        collection: 'users',
        data: { email, password, role: 'user' },
      });
      return { success: true, sentToEmail: email };
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const payload = await getPayLoadClient();
      const { res } = ctx;
      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        });
        return { seccess: true };
      } catch (error) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayLoadClient();
      const isVerified = payload.verifyEmail({
        collection: 'users',
        token,
      });
      if (!isVerified) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return { success: true };
    }),
});

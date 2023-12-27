/** @format */

import { z } from 'zod';
import { authRouter } from './auth-router';
import { publicProcedure, router } from './trpc';
import { QueryValidator } from '../lib/validators/query-validator';
import getPayLoadClient from '../get-payload';
import { paymentRouter } from './payment-router';

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const parsedQueryOpts: Record<string, { equal: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = { equal: value };
      });
      const page = cursor || 1;
      const payload = await getPayLoadClient();
      const {
        docs: items,
        nextPage,
        hasNextPage,
      } = await payload.find({
        collection: 'products',
        where: {
          approvedForSale: {
            equals: 'approved',
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });
      return { items, nextPage: hasNextPage ? nextPage : null };
    }),
});

export type AppRouter = typeof appRouter;

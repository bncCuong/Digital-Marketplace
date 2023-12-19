/** @format */

import { appRouter } from '@/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const hanler = (req: Request) => {
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,

    // @ts-expect-error context alrd passed
    createContext: () => ({}),
  });
};

export { hanler as GET, hanler as POST };

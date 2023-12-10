/** @format */
'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/Icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-creadentials-validator';
import { trpc } from '@/trpc/client';

const Page = () => {
  // const { data } = trpc.anyApiRouter.useQuery();
  const submitHanler = ({ email, password }: TAuthCredentialsValidator) => {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    //value nhan dc se cos kieu AuthCredentialsValidator
    resolver: zodResolver(AuthCredentialsValidator),
  });
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create Account</h1>
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1',
              })}
            >
              Already have an acount? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(submitHanler)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    placeholder="you@examole.com"
                    className={cn({
                      'focus-visible: ring-red-500': errors.email,
                    })}
                  />
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    {...register('password')}
                    placeholder="Password"
                    className={cn({
                      'focus-visible: ring-red-500': errors.password,
                    })}
                  />
                </div>

                <Button>Sign-up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

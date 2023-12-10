/** @format */

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';

const perks = [
  {
    name: 'Instant Devlivery',
    icon: ArrowDownToLine,
    description:
      'Get your assets delevered to your emal in seconds and download them right now',
  },
  {
    name: 'Guaranteed Quality',
    icon: CheckCircle,
    description:
      'Every platform is veryfied by  our team to ensure out highest quality standards.',
  },
  {
    name: 'For the Planet',
    icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural",
  },
];
export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{' '}
            <span className="text-blue-600"> digital assets</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to DigitalWebside. Every asset on your platform is veryfied
            by our team to ensure our high-quality standards
          </p>
          <div className="flex flex-col sm:flex-grow gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr; </Button>
          </div>
        </div>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((item) => (
              <div
                key={item.name}
                className="text-center md:flex md:items-start lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 items-center flex justify-center rounded-full bg-blue-100 text-blue-900">
                    {<item.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium to-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}

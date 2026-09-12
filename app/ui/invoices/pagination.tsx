'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { generatePagination, cn } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = cn(
    'flex size-10 items-center justify-center text-sm border border-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    (position === 'first' || position === 'single') && 'rounded-l-md',
    (position === 'last' || position === 'single') && 'rounded-r-md',
    isActive && 'z-10 bg-primary border-primary text-primary-foreground font-medium',
    !isActive && position !== 'middle' && 'hover:bg-gray-100',
    position === 'middle' && 'text-gray-300',
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = cn(
    'flex size-10 items-center justify-center rounded-md border border-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    isDisabled && 'pointer-events-none text-gray-300',
    !isDisabled && 'hover:bg-gray-100',
    direction === 'left' ? 'mr-2 md:mr-4' : 'ml-2 md:ml-4',
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="size-4" />
    ) : (
      <ArrowRightIcon className="size-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

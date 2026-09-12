import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { cn } from '@/app/lib/utils';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={cn(lusitana.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? 'page' : undefined}
            className={cn(
              'transition-colors',
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
            )}
          >
            <Link
              href={breadcrumb.href}
              className="rounded focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block text-gray-400">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

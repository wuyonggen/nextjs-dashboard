import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { cva } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
  {
    variants: {
      status: {
        pending: 'bg-gray-100 text-gray-500',
        paid: 'bg-green-500 text-white',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  },
);

export default function InvoiceStatus({ status }: { status: string }) {
  const isPaid = status === 'paid';

  return (
    <span className={cn(statusBadgeVariants({ status: isPaid ? 'paid' : 'pending' }))}>
      {isPaid ? (
        <>
          Paid
          <CheckIcon className="size-4 text-white" />
        </>
      ) : (
        <>
          Pending
          <ClockIcon className="size-4 text-gray-500" />
        </>
      )}
    </span>
  );
}

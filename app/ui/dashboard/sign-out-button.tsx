'use client';

import { signOut } from '@/app/lib/auth-client';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    setIsPending(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
          router.refresh();
        },
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="flex h-12 w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium transition-colors hover:bg-sky-100 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-50 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="size-6" />
      <div className="hidden md:block">{isPending ? 'Signing Out...' : 'Sign Out'}</div>
    </button>
  );
}

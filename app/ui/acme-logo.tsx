import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { cn } from '@/app/lib/utils';

export default function AcmeLogo() {
  return (
    <div className={cn(lusitana.className, 'flex flex-row items-center leading-none text-white')}>
      <GlobeAltIcon className="size-12 rotate-15" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}

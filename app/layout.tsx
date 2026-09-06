import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import { cn } from './lib/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased')}>{children}</body>
    </html>
  );
}

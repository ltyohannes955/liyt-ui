'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isPublicPage = pathname?.startsWith('/track') || pathname?.startsWith('/customers/confirmation');

  if (isDashboard || isAuthPage || isPublicPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

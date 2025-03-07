
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all",
        isMobile ? "ml-0" : "ml-64"
      )}>
        <Header />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

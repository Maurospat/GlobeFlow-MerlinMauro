
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { 
  LayoutDashboard, 
  FileText, 
  ArrowRightLeft, 
  Wallet, 
  UserCircle, 
  ShieldCheck,
  Globe,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const isPublicPage = pathname === '/';
  if (isPublicPage) return <>{children}</>;

  const navigation = [
    { name: t.nav.dashboard, href: '/dashboard', icon: LayoutDashboard },
    { name: t.nav.documents, href: '/documents', icon: FileText },
    { name: t.nav.transfer, href: '/transfer', icon: ArrowRightLeft },
    { name: t.nav.costs, href: '/costs', icon: Wallet },
    { name: t.nav.manager, href: '/manager', icon: UserCircle },
    { name: t.nav.admin, href: '/admin', icon: ShieldCheck },
  ];

  const NavItem = ({ item, isMobile = false }: { item: any, isMobile?: boolean }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 group",
          isActive 
            ? "bg-primary text-white shadow-md" 
            : "text-muted-foreground hover:bg-muted hover:text-primary",
          isMobile ? "text-lg" : "text-sm font-medium"
        )}
        onClick={() => setIsSidebarOpen(false)}
      >
        <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Globe className="text-white w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-primary">GlobeFlow</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-white p-6 flex flex-col gap-4 animate-in slide-in-from-left duration-200" onClick={e => e.stopPropagation()}>
             <div className="flex items-center gap-2 mb-6">
              <Globe className="text-primary" />
              <span className="font-headline font-bold text-xl text-primary">GlobeFlow</span>
            </div>
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} isMobile />
            ))}
          </div>
        </div>
      )}

      <aside className="hidden md:flex flex-col w-64 bg-white border-r p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Globe className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-2xl text-primary tracking-tight">GlobeFlow</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <LanguageToggle />
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
              <LogOut className="mr-3 w-5 h-5" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#F7F7F8] pb-24 md:pb-0">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 z-50">
        {navigation.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className={cn(
              "flex flex-col items-center p-2 rounded-md transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}>
              <Icon className="w-6 h-6" />
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          {language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('de')}>Deutsch</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';
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
  X,
  Palmtree,
  Waves
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
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPublicPage = pathname === '/';
  if (isPublicPage) return <>{children}</>;

  const navigation = [
    { name: t.nav.dashboard, href: '/dashboard', icon: LayoutDashboard },
    { name: t.nav.documents, href: '/documents', icon: FileText },
    { name: t.nav.transfer, href: '/transfer', icon: ArrowRightLeft },
    { name: t.nav.costs, href: '/costs', icon: Wallet },
    { name: t.nav.manager, href: '/manager', icon: UserCircle },
    { name: t.nav.life, href: '/life', icon: Palmtree },
    { name: t.nav.admin, href: '/admin', icon: ShieldCheck },
  ];

  const NavItem = ({ item, isMobile = false }: { item: any, isMobile?: boolean }) => {
    const isActive = mounted && pathname === item.href;
    const Icon = item.icon;
    return (
      <button
        onClick={() => {
          router.push(item.href);
          setIsSidebarOpen(false);
        }}
        className={cn(
          "flex w-full items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-200 group",
          isActive 
            ? "bg-primary text-white shadow-[0_4px_12px_rgba(26,60,69,0.2)]" 
            : "text-primary/70 hover:bg-secondary hover:text-primary",
          isMobile ? "text-lg font-bold" : "text-sm font-semibold"
        )}
      >
        <Icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-primary/40 group-hover:text-primary")} />
        {mounted ? item.name : "..."}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <header className="md:hidden flex items-center justify-between p-5 bg-white border-b border-secondary sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 ocean-gradient rounded-xl flex items-center justify-center shadow-lg">
            <Waves className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-black text-2xl text-primary tracking-tighter">GlobeFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-primary">
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {mounted && isSidebarOpen && (
        <div className="fixed inset-0 z-[60] bg-primary/20 backdrop-blur-sm md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-[80%] bg-white p-8 flex flex-col gap-5 animate-in slide-in-from-left duration-200 shadow-2xl batik-pattern" onClick={e => e.stopPropagation()}>
             <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 ocean-gradient rounded-xl flex items-center justify-center">
                <Waves className="text-white w-6 h-6" />
              </div>
              <span className="font-headline font-black text-2xl text-primary tracking-tighter">GlobeFlow</span>
            </div>
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} isMobile />
            ))}
          </div>
        </div>
      )}

      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-secondary p-8 sticky top-0 h-screen shrink-0 batik-pattern">
        <div className="flex items-center gap-3 mb-14 px-2">
          <div className="w-12 h-12 ocean-gradient rounded-2xl flex items-center justify-center shadow-xl shadow-primary/10">
            <Waves className="text-white w-7 h-7" />
          </div>
          <span className="font-headline font-black text-3xl text-primary tracking-tighter">GlobeFlow</span>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        <div className="mt-auto space-y-6 pt-8 border-t border-secondary">
          <LanguageToggle />
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-3 w-full px-5 py-3 rounded-xl text-primary/60 font-semibold hover:text-rose-600 hover:bg-rose-50 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12" />
            {mounted ? t.common.logout : "Logout"}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background/50 pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto p-6 md:p-12">
          {children}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-secondary flex justify-around p-3 z-50 overflow-x-auto no-scrollbar shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        {navigation.slice(0, 6).map((item) => {
          const isActive = mounted && pathname === item.href;
          const Icon = item.icon;
          return (
            <button key={item.name} onClick={() => router.push(item.href)} className={cn(
              "flex flex-col items-center p-3 rounded-2xl transition-all min-w-[70px]",
              isActive ? "bg-primary text-white shadow-lg" : "text-primary/50"
            )}>
              <Icon className="w-6 h-6" />
              <span className="text-[10px] mt-1.5 font-bold text-center truncate w-full uppercase tracking-tighter">{mounted ? item.name : "..."}</span>
            </button>
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
        <Button variant="outline" size="sm" className="gap-2 transition-all w-full justify-start h-11 rounded-xl border-secondary font-bold text-primary">
          <Globe className="w-4 h-4 text-accent" />
          {language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-in fade-in zoom-in rounded-xl p-2 batik-pattern border-secondary">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="rounded-lg font-semibold py-2">English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('de')} className="rounded-lg font-semibold py-2">Deutsch</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
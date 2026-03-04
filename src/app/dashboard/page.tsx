"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { useCase } from '@/components/CaseContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  ArrowRightLeft, 
  Wallet, 
  UserCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Waves,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { documents, progress: actualProgress, transferStatus } = useCase();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setDisplayProgress(actualProgress), 50);
    return () => clearTimeout(timer);
  }, [actualProgress]);

  if (!mounted) return null;

  const nextStepDoc = documents.find(d => d.status === 'not_uploaded');
  const allDocsUploaded = !nextStepDoc;
  const transferCompleted = transferStatus === 'completed';

  const uploadedDocsCount = documents.filter(d => d.status !== 'not_uploaded').length;
  const totalDocs = documents.length;

  const stats = [
    { title: t.dashboard.stats.docs, value: `${uploadedDocsCount}/${totalDocs}`, status: uploadedDocsCount > 0 ? t.common.active : t.common.not_started, icon: FileText, href: '/documents' },
    { title: t.dashboard.stats.transfer, value: '$250k', status: transferCompleted ? t.common.approved : (transferStatus === 'not_started' ? t.common.not_started : t.common.active), icon: ArrowRightLeft, href: '/transfer' },
    { title: t.dashboard.stats.costs, value: '$3,420', status: t.common.pending, icon: Wallet, href: '/costs' },
    { title: t.dashboard.stats.manager, value: t.common.active, status: 'SLA Active', icon: UserCircle, href: '/manager' },
  ];

  const getDocTitle = (doc: any) => {
    if (!doc) return "";
    const keys: Record<string, string> = {
      '1': 'passport',
      '2': 'address',
      '3': 'tax',
      '4': 'bank',
      '5': 'funds',
      '6': 'visa'
    };
    return t.documents.items[keys[doc.id]].title;
  };

  const getDocWhy = (doc: any) => {
    if (!doc) return "";
    const keys: Record<string, string> = {
      '1': 'passport',
      '2': 'address',
      '3': 'tax',
      '4': 'bank',
      '5': 'funds',
      '6': 'visa'
    };
    return t.documents.items[keys[doc.id]].why;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-100 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-headline font-black text-primary flex items-center gap-4 tracking-tighter">
            <Waves className="w-10 h-10 text-accent animate-pulse" />
            {t.dashboard.welcome} Alexander
          </h1>
          <p className="text-muted-foreground text-xl font-medium">
            {t.dashboard.journeyProgress.replace('{progress}', displayProgress.toString())}
          </p>
        </div>
        <Link href="/documents">
          <Button className="bg-primary hover:bg-primary/90 text-white font-black h-14 px-10 rounded-2xl shadow-2xl shadow-primary/20 transition-all group">
            {t.landing.cta}
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card overflow-hidden border-none batik-pattern p-1">
          <CardContent className="p-8 md:p-10 flex flex-col h-full justify-center space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-black text-2xl text-primary uppercase tracking-widest">{t.common.progress}</span>
                  <span className="font-black text-primary text-5xl tracking-tighter">{displayProgress}%</span>
                </div>
                <Progress value={displayProgress} className="h-4 bg-secondary rounded-full" />
                <div className="flex flex-wrap gap-4 md:gap-8 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-3"><CheckCircle2 className={`w-5 h-5 ${displayProgress > 30 ? 'text-accent' : 'text-slate-200'}`} /> {t.dashboard.milestones.identity}</span>
                  <span className="flex items-center gap-3"><Clock className={`w-5 h-5 ${displayProgress > 60 ? 'text-accent' : 'text-slate-200'}`} /> {t.dashboard.milestones.financials}</span>
                  <span className="flex items-center gap-3"><AlertCircle className={`w-5 h-5 ${displayProgress === 100 ? 'text-accent' : 'text-slate-200'}`} /> {t.dashboard.milestones.visa}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none ocean-gradient text-white relative overflow-hidden group min-h-[300px]">
          <CardHeader className="pb-0 z-10 relative">
            <CardTitle className="text-white text-xl font-black flex items-center gap-3 uppercase tracking-widest">
              <Globe className="w-6 h-6 text-accent" />
              {language === 'de' ? 'Ihre Route' : 'Your Route'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-full relative z-0 flex items-center justify-center">
            <div className="w-full h-full max-h-[250px] relative">
              <svg viewBox="0 0 400 200" className="w-full h-full opacity-60">
                <path 
                  d="M50,40 Q70,20 100,30 T150,50 T200,40 T250,60 T300,50 T350,70 L350,150 Q300,170 250,150 T200,160 T150,140 T100,150 T50,130 Z" 
                  fill="currentColor" 
                  className="text-white/10"
                />
                <circle cx="160" cy="65" r="5" fill="#ef4444" className="animate-pulse shadow-lg" />
                <circle cx="310" cy="145" r="5" fill="#ef4444" className="animate-pulse shadow-lg" />
                <path 
                  d="M160,65 Q235,45 310,145" 
                  fill="none" 
                  stroke="#4FB3B3" 
                  strokeWidth="3" 
                  strokeDasharray="6,6"
                  className="animate-[dash_40s_linear_infinite]"
                />
              </svg>
              <div className="absolute bottom-6 left-8 right-8 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                <span className="bg-black/20 px-2 py-1 rounded">Zurich, CH</span>
                <span className="bg-black/20 px-2 py-1 rounded">Jakarta, ID</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="flex">
            <Card className="glass-card group hover:-translate-y-2 hover:shadow-2xl transition-all border-none flex-1">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-secondary rounded-2xl group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                    <stat.icon className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                  <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter ${stat.status === t.common.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-primary/10 text-primary'}`}>
                    {stat.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">{stat.title}</p>
                <p className="text-4xl font-black text-primary mt-2 tracking-tighter">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-none batik-pattern overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-3xl font-black tracking-tighter">{t.common.nextSteps}</CardTitle>
            <CardDescription className="text-lg font-medium">{t.dashboard.nextStepDesc}</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            {!allDocsUploaded ? (
              <Link href="/documents" className="block">
                <div className="flex items-center justify-between p-6 md:p-8 bg-secondary/30 rounded-[2rem] border border-secondary group hover:bg-white hover:shadow-xl transition-all">
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center border-2 border-primary/10 text-primary text-2xl font-black shadow-md group-hover:scale-110 transition-transform">1</div>
                    <div className="space-y-1">
                      <p className="font-black text-xl md:text-2xl text-primary tracking-tight">{getDocTitle(nextStepDoc)}</p>
                      <p className="text-sm md:text-md text-muted-foreground font-semibold leading-relaxed max-w-md line-clamp-2">{getDocWhy(nextStepDoc)}</p>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-white rounded-2xl shadow-sm text-muted-foreground group-hover:text-accent transition-colors shrink-0">
                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
              </Link>
            ) : !transferCompleted ? (
              <Link href="/transfer" className="block">
                <div className="flex items-center justify-between p-6 md:p-8 bg-secondary/30 rounded-[2rem] border border-secondary group hover:bg-white hover:shadow-xl transition-all">
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center border-2 border-primary/10 text-primary text-2xl font-black shadow-md group-hover:scale-110 transition-transform">1</div>
                    <div className="space-y-1">
                      <p className="font-black text-xl md:text-2xl text-primary tracking-tight">{t.nav.transfer}</p>
                      <p className="text-sm md:text-md text-muted-foreground font-semibold leading-relaxed max-w-md line-clamp-2">{t.dashboard.nextStepTransfer}</p>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-white rounded-2xl shadow-sm text-muted-foreground group-hover:text-accent transition-colors shrink-0">
                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center justify-between p-8 md:p-10 bg-emerald-50 rounded-[2rem] border border-emerald-100 animate-in fade-in">
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center border-4 border-emerald-500 text-emerald-500 font-black shadow-xl">
                    <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-2xl md:text-3xl text-emerald-800 tracking-tighter">{t.dashboard.nextStepFinished}</p>
                    <p className="text-md md:text-lg text-emerald-600 font-bold">{t.dashboard.journeyProgress.replace('{progress}', '100')}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none ocean-gradient text-white relative overflow-hidden shadow-2xl flex flex-col h-full">
          <div className="absolute -bottom-8 -left-8 w-48 h-48 opacity-10 rotate-12 pointer-events-none">
            <Waves className="w-full h-full text-white" />
          </div>
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-white text-2xl font-black tracking-tighter uppercase">{t.dashboard.targets}</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-8 flex-1 flex flex-col justify-center">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{t.dashboard.accuracy}</span>
                <span className="text-xl font-black text-white tracking-tighter">{displayProgress}%</span>
              </div>
              <Progress value={displayProgress} className="h-1.5 bg-white/20 rounded-full" />
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <p className="text-md text-white/80 leading-relaxed font-semibold italic">
                "Maintain high document accuracy for faster processing at the Indonesian Ministry of Law."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}

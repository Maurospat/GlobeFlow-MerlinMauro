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
    <div className="space-y-8 animate-in fade-in duration-100">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-headline font-extrabold text-primary flex items-center gap-3">
            <Waves className="w-8 h-8 text-accent" />
            {t.dashboard.welcome} Alexander
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            {t.dashboard.journeyProgress.replace('{progress}', displayProgress.toString())}
          </p>
        </div>
        <Link href="/documents">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-full shadow-lg shadow-primary/20 transition-all">
            {t.landing.cta}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 glass-card overflow-hidden relative border-none batik-pattern">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
            <Waves className="w-full h-full text-primary" />
          </div>
          <CardContent className="p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl text-primary">{t.common.progress}</span>
                  <span className="font-black text-primary text-4xl">{displayProgress}%</span>
                </div>
                <Progress value={displayProgress} className="h-4 bg-secondary" />
                <div className="flex flex-wrap gap-6 text-sm font-semibold text-muted-foreground">
                  <span className="flex items-center gap-2"><CheckCircle2 className={`w-5 h-5 ${displayProgress > 30 ? 'text-accent' : 'text-slate-200'}`} /> {t.dashboard.milestones.identity}</span>
                  <span className="flex items-center gap-2"><Clock className={`w-5 h-5 ${displayProgress > 60 ? 'text-accent' : 'text-slate-200'}`} /> {t.dashboard.milestones.financials}</span>
                  <span className="flex items-center gap-2"><AlertCircle className={`w-5 h-5 ${displayProgress === 100 ? 'text-accent' : 'text-slate-200'}`} /> {t.dashboard.milestones.visa}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none ocean-gradient text-white relative overflow-hidden group">
          <CardHeader className="pb-0">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              {language === 'de' ? 'Ihre Route' : 'Your Route'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-48 relative">
            <svg viewBox="0 0 400 200" className="w-full h-full opacity-60">
              {/* Simplified World Map Silhouette */}
              <path 
                d="M50,40 Q70,20 100,30 T150,50 T200,40 T250,60 T300,50 T350,70 L350,150 Q300,170 250,150 T200,160 T150,140 T100,150 T50,130 Z" 
                fill="currentColor" 
                className="text-white/10"
              />
              {/* Dots */}
              {/* Switzerland Approx */}
              <circle cx="160" cy="65" r="4" fill="#ef4444" className="animate-pulse shadow-lg" />
              {/* Indonesia Approx */}
              <circle cx="310" cy="145" r="4" fill="#ef4444" className="animate-pulse shadow-lg" />
              
              {/* Curved Line */}
              <path 
                d="M160,65 Q235,45 310,145" 
                fill="none" 
                stroke="#4FB3B3" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                className="animate-[dash_30s_linear_infinite]"
              />
            </svg>
            <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] font-black uppercase tracking-widest text-white/70">
              <span>Zurich, CH</span>
              <span>Jakarta, ID</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="glass-card group hover:-translate-y-1 hover:shadow-xl transition-all border-none">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-secondary rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors">
                    <stat.icon className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${stat.status === t.common.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-primary/5 text-primary'}`}>
                    {stat.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{stat.title}</p>
                <p className="text-3xl font-black text-primary mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 glass-card border-none">
          <CardHeader>
            <CardTitle className="text-2xl">{t.common.nextSteps}</CardTitle>
            <CardDescription className="text-md">{t.dashboard.nextStepDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!allDocsUploaded ? (
              <Link href="/documents" className="block">
                <div className="flex items-center justify-between p-6 bg-secondary/30 rounded-2xl border border-secondary group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-primary/10 text-primary font-black shadow-sm group-hover:scale-110 transition-transform">1</div>
                    <div>
                      <p className="font-bold text-lg text-primary">{getDocTitle(nextStepDoc)}</p>
                      <p className="text-sm text-muted-foreground font-medium">{getDocWhy(nextStepDoc)}</p>
                    </div>
                  </div>
                  <div className="p-3 text-muted-foreground group-hover:text-accent transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            ) : !transferCompleted ? (
              <Link href="/transfer" className="block">
                <div className="flex items-center justify-between p-6 bg-secondary/30 rounded-2xl border border-secondary group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-primary/10 text-primary font-black shadow-sm group-hover:scale-110 transition-transform">1</div>
                    <div>
                      <p className="font-bold text-lg text-primary">{t.nav.transfer}</p>
                      <p className="text-sm text-muted-foreground font-medium">{t.dashboard.nextStepTransfer}</p>
                    </div>
                  </div>
                  <div className="p-3 text-muted-foreground group-hover:text-accent transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-2xl border border-emerald-100 animate-in fade-in">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-emerald-500 text-emerald-500 font-black shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-emerald-800">{t.dashboard.nextStepFinished}</p>
                    <p className="text-sm text-emerald-600 font-medium">{t.dashboard.journeyProgress.replace('{progress}', '100')}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none ocean-gradient text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -bottom-8 -left-8 w-40 h-40 opacity-10 rotate-12 pointer-events-none">
            <Waves className="w-full h-full text-white" />
          </div>
          <CardHeader>
            <CardTitle className="text-white text-2xl font-black">{t.dashboard.targets}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 mt-4">
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest">{t.dashboard.accuracy}</span>
                <span className="text-sm font-black">{displayProgress}%</span>
              </div>
              <Progress value={displayProgress} className="h-3 bg-white/20" />
            </div>
            <p className="text-sm text-white/70 leading-relaxed font-medium">
              Maintain high document accuracy for faster processing at the Indonesian Ministry of Law.
            </p>
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

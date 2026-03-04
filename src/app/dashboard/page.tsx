
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
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { documents, progress: actualProgress, transferStatus } = useCase();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Schnellere Animation für den Balken
    const timer = setTimeout(() => setDisplayProgress(actualProgress), 50);
    return () => clearTimeout(timer);
  }, [actualProgress]);

  // Nächster Schritt Logik
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
    <div className="space-y-8 animate-in fade-in duration-75">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.dashboard.welcome} Alexander</h1>
          <p className="text-muted-foreground mt-1">
            {t.dashboard.journeyProgress.replace('{progress}', displayProgress.toString())}
          </p>
        </div>
        <Link href="/documents">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-75">
            {t.landing.cta}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </header>

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{t.common.progress}</span>
                <span className="font-bold text-primary text-2xl">{displayProgress}%</span>
              </div>
              <Progress value={displayProgress} className="h-3" />
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle2 className={`w-4 h-4 ${displayProgress > 30 ? 'text-green-500' : 'text-slate-300'}`} /> {t.dashboard.milestones.identity}</span>
                <span className="flex items-center gap-1"><Clock className={`w-4 h-4 ${displayProgress > 60 ? 'text-green-500' : 'text-accent'}`} /> {t.dashboard.milestones.financials}</span>
                <span className="flex items-center gap-1"><AlertCircle className={`w-4 h-4 ${displayProgress === 100 ? 'text-green-500' : 'text-slate-300'}`} /> {t.dashboard.milestones.visa}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-all duration-75 cursor-pointer border-slate-100 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${stat.status === t.common.approved ? 'bg-green-100 text-green-700' : 'bg-accent/10 text-accent-foreground'}`}>
                    {stat.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-slate-100">
          <CardHeader>
            <CardTitle>{t.common.nextSteps}</CardTitle>
            <CardDescription>{t.dashboard.nextStepDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!allDocsUploaded ? (
              <Link href="/documents">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-all duration-75">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border text-primary font-bold shadow-sm">1</div>
                    <div>
                      <p className="font-semibold">{getDocTitle(nextStepDoc)}</p>
                      <p className="text-sm text-muted-foreground">{getDocWhy(nextStepDoc)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="transition-all duration-75"><ArrowRight className="w-4 h-4" /></Button>
                </div>
              </Link>
            ) : !transferCompleted ? (
              <Link href="/transfer">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-all duration-75">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border text-primary font-bold shadow-sm">1</div>
                    <div>
                      <p className="font-semibold">{t.nav.transfer}</p>
                      <p className="text-sm text-muted-foreground">{t.dashboard.nextStepTransfer}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="transition-all duration-75"><ArrowRight className="w-4 h-4" /></Button>
                </div>
              </Link>
            ) : (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 animate-in fade-in duration-75">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border text-green-500 font-bold shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">{t.dashboard.nextStepFinished}</p>
                    <p className="text-sm text-green-600">{t.dashboard.journeyProgress.replace('{progress}', '100')}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-100 bg-primary text-white">
          <CardHeader>
            <CardTitle className="text-white">{t.dashboard.targets}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">{t.dashboard.accuracy}</span>
                <span className="text-sm font-bold">{displayProgress}% {t.dashboard.targetLabel}</span>
              </div>
              <Progress value={displayProgress} className="h-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

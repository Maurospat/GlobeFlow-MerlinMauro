
"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
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
import { initialDocuments, initialTransfer } from '@/app/data/mockData';
import Link from 'next/link';

export default function Dashboard() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate initial calculation
    const timer = setTimeout(() => setProgress(35), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: t.nav.documents, value: '2/6', status: 'In Progress', icon: FileText, href: '/documents' },
    { title: t.nav.transfer, value: '$250k', status: 'Initiated', icon: ArrowRightLeft, href: '/transfer' },
    { title: 'Total Estimated Costs', value: '$3,420', status: 'Estimated', icon: Wallet, href: '/costs' },
    { title: 'Case Manager', value: 'Ready', status: 'SLA Active', icon: UserCircle, href: '/manager' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.dashboard.welcome} Alexander</h1>
          <p className="text-muted-foreground mt-1">Your Indonesia relocation journey is 35% complete.</p>
        </div>
        <Link href="/documents">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            Continue Journey
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </header>

      {/* Main Progress Card */}
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{t.common.progress}</span>
                <span className="font-bold text-primary text-2xl">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Identity</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-accent" /> Financials</span>
                <span className="flex items-center gap-1"><AlertCircle className="w-4 h-4 text-slate-300" /> Visa Issuance</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/5 rounded-lg">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent-foreground">
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
        {/* Next Steps */}
        <Card className="md:col-span-2 border-slate-100">
          <CardHeader>
            <CardTitle>{t.common.nextSteps}</CardTitle>
            <CardDescription>Prioritized actions for your current stage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border text-primary font-bold shadow-sm">1</div>
                <div>
                  <p className="font-semibold">Upload Tax Residency Certificate</p>
                  <p className="text-sm text-muted-foreground">Needed for initial visa pre-approval.</p>
                </div>
              </div>
              <Button variant="ghost" size="icon"><ArrowRight className="w-4 h-4" /></Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-colors opacity-70">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border text-muted-foreground font-bold shadow-sm">2</div>
                <div>
                  <p className="font-semibold">Confirm Asset Transfer Setup</p>
                  <p className="text-sm text-muted-foreground">Verify home bank details with your manager.</p>
                </div>
              </div>
              <Button variant="ghost" size="icon"><ArrowRight className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>

        {/* Success Targets */}
        <Card className="border-slate-100 bg-primary text-white">
          <CardHeader>
            <CardTitle className="text-white">Success Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Document Accuracy</span>
                <span className="text-sm font-bold">80% Target</span>
              </div>
              <Progress value={60} className="h-2 bg-white/20" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Response Time</span>
                <span className="text-sm font-bold">&lt; 12h Avg</span>
              </div>
              <Progress value={95} className="h-2 bg-white/20" />
            </div>
            <div className="p-4 bg-white/10 rounded-lg text-sm border border-white/10">
              "We aim for 100% transparency in your financial immigration process."
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

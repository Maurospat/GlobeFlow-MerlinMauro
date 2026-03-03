
"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { useCase } from '@/components/CaseContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowRightLeft, 
  Building2, 
  CheckCircle2, 
  Info,
  Loader2
} from 'lucide-react';
import { initialTransfer, TransferStatus } from '@/app/data/mockData';
import { toast } from '@/hooks/use-toast';

export default function AssetTransferPage() {
  const { t } = useLanguage();
  const { transferStatus, updateTransferStatus } = useCase();
  const [isStarting, setIsStarting] = useState(false);

  const startTransfer = () => {
    setIsStarting(true);
    // Simulation einer schnellen Server-Reaktion
    setTimeout(() => {
      updateTransferStatus('in_transit');
      setIsStarting(false);
      toast({
        title: t.language === 'de' ? 'Transfer eingeleitet' : 'Transfer initiated',
        description: t.language === 'de' ? 'Ihr Kapital ist nun unterwegs.' : 'Your capital is now in transit.',
      });
    }, 100);
  };

  const completeTransferManual = () => {
    updateTransferStatus('completed');
    toast({
      title: t.language === 'de' ? 'Transfer abgeschlossen' : 'Transfer completed',
      description: t.language === 'de' ? 'Das Kapital wurde erfolgreich verbucht.' : 'Capital has been successfully reconciled.',
    });
  };

  const getStepStatus = (stepStatus: TransferStatus, currentStatus: TransferStatus) => {
    const order: TransferStatus[] = ['not_started', 'initiated', 'in_review', 'in_transit', 'completed'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const TimelineStep = ({ label, status }: { label: string, status: 'completed' | 'active' | 'pending' }) => (
    <div className="flex flex-col items-center gap-2 flex-1 relative">
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-100
        ${status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 
          status === 'active' ? 'bg-white border-accent text-accent animate-pulse' : 
          'bg-white border-slate-200 text-slate-300'}`}>
        {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
      </div>
      <span className={`text-[10px] font-bold text-center uppercase tracking-wider
        ${status === 'pending' ? 'text-slate-400' : 'text-primary'}`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-100 pb-16">
      <header>
        <h1 className="text-3xl font-headline font-bold text-primary">{t.transfer.title}</h1>
        <p className="text-muted-foreground">{t.transfer.subtitle}</p>
      </header>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{t.transfer.status}</CardTitle>
              <CardDescription>TX-9283-ID-GF</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{t.transfer.eta.replace('{days}', initialTransfer.etaDays.toString())}</p>
              <p className="text-xs text-muted-foreground">{t.transfer.arrival.replace('{date}', '12. Okt 2024')}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-8">
          <div className="relative flex justify-between">
            <div className="absolute top-4 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-0" />
            
            <TimelineStep label={t.common.not_started} status={getStepStatus('initiated', transferStatus)} />
            <TimelineStep label={t.common.under_review} status={getStepStatus('in_review', transferStatus)} />
            <TimelineStep label={t.transfer.inTransit} status={getStepStatus('in_transit', transferStatus)} />
            <TimelineStep label={t.common.approved} status={getStepStatus('completed', transferStatus)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              {t.transfer.sourceBank}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">{t.transfer.institution}</label>
              <Input value={initialTransfer.homeBank} readOnly />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
              {t.transfer.setup}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">{t.transfer.amount}</label>
              <Input value={initialTransfer.amount.toLocaleString() + " USD"} readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                className="w-full bg-primary transition-all duration-75" 
                onClick={startTransfer}
                disabled={isStarting || transferStatus !== 'initiated'}
              >
                {isStarting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {transferStatus === 'initiated' ? t.transfer.begin : t.transfer.processing}
              </Button>
              {transferStatus === 'in_transit' && (
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/5" onClick={completeTransferManual}>
                  {t.language === 'de' ? 'Transfer manuell abschließen' : 'Complete Transfer Manually'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-100 mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-muted-foreground" />
            {t.transfer.transparency}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.transfer.midMarket}</p>
              <p className="text-xl font-bold font-mono">1 USD = 15.650,45 IDR</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg text-xs text-muted-foreground border italic">
            "{t.transfer.guarantee}"
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

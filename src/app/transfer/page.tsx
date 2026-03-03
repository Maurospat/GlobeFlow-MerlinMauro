
"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowRightLeft, 
  Building2, 
  User, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Info,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { initialTransfer, TransferStatus } from '@/app/data/mockData';
import { Progress } from '@/components/ui/progress';

export default function AssetTransferPage() {
  const { t } = useLanguage();
  const [transfer, setTransfer] = useState(initialTransfer);
  const [isStarting, setIsStarting] = useState(false);

  const startTransfer = () => {
    setIsStarting(true);
    setTimeout(() => {
      setTransfer({ ...transfer, status: 'in_transit' });
      setIsStarting(false);
    }, 2000);
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
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 
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
    <div className="space-y-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-headline font-bold text-primary">{t.nav.transfer}</h1>
        <p className="text-muted-foreground">Manage your secure capital transfer to Indonesian banking partners.</p>
      </header>

      {/* Transfer Tracking */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Transfer Status</CardTitle>
              <CardDescription>TX-9283-ID-GF</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">ETA: {transfer.etaDays} Business Days</p>
              <p className="text-xs text-muted-foreground">Exp. Arrival: Oct 12, 2024</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-8">
          <div className="relative flex justify-between">
            {/* Timeline connectors */}
            <div className="absolute top-4 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-0" />
            
            <TimelineStep label="Initiated" status={getStepStatus('initiated', transfer.status)} />
            <TimelineStep label="In Review" status={getStepStatus('in_review', transfer.status)} />
            <TimelineStep label="In Transit" status={getStepStatus('in_transit', transfer.status)} />
            <TimelineStep label="Completed" status={getStepStatus('completed', transfer.status)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Source Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Source Bank
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Home Institution</label>
              <Input value={transfer.homeBank} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Relationship Manager</label>
              <div className="flex gap-2">
                <Input value={transfer.contactName} readOnly />
                <Button variant="outline" size="icon"><User className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">Verified Partner Coverage</span>
            </div>
          </CardContent>
        </Card>

        {/* Transfer Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
              Transfer Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Amount</label>
                <Input value={transfer.amount.toLocaleString()} readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Currency</label>
                <Select defaultValue={transfer.currency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Target IDR Account (Simulated)</label>
              <Input value="ID-GLOBE-992-XXXXX" disabled />
            </div>
            <Button 
              className="w-full bg-primary" 
              onClick={startTransfer}
              disabled={isStarting || transfer.status !== 'initiated'}
            >
              {isStarting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {transfer.status === 'initiated' ? 'Begin Secure Transfer' : 'Transfer In Progress'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Fee Transparency */}
      <Card className="border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-muted-foreground" />
            Cost Transparency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Mid-Market Rate</p>
              <p className="text-xl font-bold font-mono">1 USD = 15,650.45 IDR</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Transfer Fee</p>
              <p className="text-xl font-bold font-mono">$0.00 <span className="text-xs text-green-500">(Premium Waived)</span></p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">FX Margin Indicator</p>
              <p className="text-xl font-bold font-mono text-accent">0.15% <span className="text-xs">(Tier 1)</span></p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg text-xs text-muted-foreground border italic">
            "GlobeFlow guarantees no hidden surprise fees. Our Tier 1 rates are reserved for HNWIs entering the Indonesian market via our partner network."
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

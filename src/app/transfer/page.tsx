
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { useCase } from '@/components/CaseContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  ArrowRightLeft, 
  Building2, 
  CheckCircle2, 
  Info,
  Loader2,
  FileSignature,
  ShieldCheck,
  AlertCircle,
  Eraser
} from 'lucide-react';
import { initialTransfer, TransferStatus } from '@/app/data/mockData';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function AssetTransferPage() {
  const { t, language } = useLanguage();
  const { transferStatus, updateTransferStatus, isPoASigned, setPoASigned } = useCase();
  const [isStarting, setIsStarting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Signature State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  // Form State
  const [bankName, setBankName] = useState(initialTransfer.homeBank);
  const [swift, setSwift] = useState('');
  const [iban, setIban] = useState('');
  const [customerNo, setCustomerNo] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Canvas Drawing Logic
  useEffect(() => {
    if (mounted && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#476685'; // Primary color
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
      }
    }
  }, [mounted]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPoASigned) return;
    setIsDrawing(true);
    setHasSigned(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current || isPoASigned) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearSignature = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  if (!mounted) return null;

  const startTransfer = () => {
    if (!bankName || !swift || !iban || !customerNo) {
      toast({
        variant: "destructive",
        title: language === 'de' ? 'Fehlende Informationen' : 'Missing Information',
        description: language === 'de' ? 'Bitte füllen Sie alle erforderlichen Felder aus.' : 'Please fill in all required fields.',
      });
      return;
    }

    setIsStarting(true);
    setTimeout(() => {
      updateTransferStatus('in_review');
      setIsStarting(false);
      toast({
        title: language === 'de' ? 'Überprüfung eingeleitet' : 'Review initiated',
        description: language === 'de' ? 'Ihre Bankdaten werden nun geprüft.' : 'Your bank details are now being reviewed.',
      });
    }, 100);
  };

  const handleSignPoA = () => {
    if (!hasSigned) {
      toast({
        variant: "destructive",
        title: language === 'de' ? 'Unterschrift fehlt' : 'Signature missing',
        description: language === 'de' ? 'Bitte leisten Sie eine digitale Unterschrift im vorgesehenen Feld.' : 'Please provide a digital signature in the designated field.',
      });
      return;
    }

    setIsSigning(true);
    setTimeout(() => {
      setPoASigned(true);
      setIsSigning(false);
      updateTransferStatus('in_transit');
      toast({
        title: language === 'de' ? 'Vollmacht unterzeichnet' : 'PoA Signed',
        description: t.transfer.poa.success,
      });
    }, 150);
  };

  const completeTransferManual = () => {
    updateTransferStatus('completed');
    toast({
      title: language === 'de' ? 'Transfer abgeschlossen' : 'Transfer completed',
      description: language === 'de' ? 'Das Kapital wurde erfolgreich verbucht.' : 'Capital has been successfully reconciled.',
    });
  };

  const steps = [
    { key: 'not_started', label: t.common.not_started },
    { key: 'in_review', label: t.common.under_review },
    { key: 'in_transit', label: t.transfer.inTransit },
    { key: 'completed', label: t.common.approved }
  ];

  const getStepStatus = (stepKey: string) => {
    const order: TransferStatus[] = ['not_started', 'initiated', 'in_review', 'in_transit', 'completed'];
    const currentIndex = order.indexOf(transferStatus);
    const stepIndex = order.indexOf(stepKey as TransferStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-75 pb-24">
      <header>
        <h1 className="text-3xl font-headline font-bold text-primary">{t.transfer.title}</h1>
        <p className="text-muted-foreground">{t.transfer.subtitle}</p>
      </header>

      {/* Success Banner */}
      {isPoASigned && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
          <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
          <div className="space-y-1">
            <p className="font-bold text-green-800">{t.transfer.poa.success}</p>
            <p className="text-sm text-green-700">Transaction ID: <span className="font-mono">TX-9283-ID-GF</span></p>
          </div>
        </div>
      )}

      {/* Progress Tracker */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{t.transfer.status}</CardTitle>
              <CardDescription>TX-9283-ID-GF</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{t.transfer.eta.replace('{days}', initialTransfer.etaDays.toString())}</p>
              <p className="text-xs text-muted-foreground">{t.transfer.arrival.replace('{date}', language === 'de' ? '12. Okt 2024' : 'Oct 12, 2024')}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-8">
          <div className="relative flex justify-between">
            <div className="absolute top-4 left-[5%] right-[5%] h-[2px] bg-slate-100 -z-0" />
            
            {steps.map((step) => {
              const status = getStepStatus(step.key);
              return (
                <div key={step.key} className="flex flex-col items-center gap-2 flex-1 relative">
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-150 shadow-sm",
                    status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 
                    status === 'active' ? 'bg-white border-primary text-primary ring-4 ring-primary/10' : 
                    'bg-white border-slate-200 text-slate-300'
                  )}>
                    {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <div className={cn("w-2.5 h-2.5 rounded-full", status === 'active' ? 'bg-primary' : 'bg-slate-200')} />}
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold text-center uppercase tracking-wider transition-colors",
                    status === 'pending' ? 'text-slate-400' : 'text-primary'
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Source Bank Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {t.transfer.sourceBank}
              </CardTitle>
              <CardDescription>{language === 'de' ? 'Alle Felder sind erforderlich.' : 'All fields are required.'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase">{t.transfer.institution}</Label>
                <Input value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g. Royal Bank of London" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground uppercase">{t.transfer.swift}</Label>
                  <Input value={swift} onChange={(e) => setSwift(e.target.value)} placeholder="SWIFT/BIC" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground uppercase">{t.transfer.customerNo}</Label>
                  <Input value={customerNo} onChange={(e) => setCustomerNo(e.target.value)} placeholder="Account No" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase">{t.transfer.iban}</Label>
                <Input value={iban} onChange={(e) => setIban(e.target.value)} placeholder="IBAN" />
              </div>
            </CardContent>
          </Card>

          {/* Transfer Scope */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-primary" />
                {t.transfer.scope.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {[
                  { id: 'cash', label: t.transfer.scope.cash },
                  { id: 'securities', label: t.transfer.scope.securities },
                  { id: 'pension', label: t.transfer.scope.pension },
                  { id: 'total', label: t.transfer.scope.total },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                    <Checkbox id={item.id} />
                    <Label htmlFor={item.id} className="text-sm font-medium cursor-pointer flex-1">{item.label}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Digital Power of Attorney */}
          <Card className={cn(isPoASigned && "opacity-60 pointer-events-none")}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-primary" />
                  {t.transfer.poa.title}
                </CardTitle>
                {!isPoASigned && hasSigned && (
                  <Button variant="ghost" size="sm" onClick={clearSignature} className="text-xs h-8 gap-1">
                    <Eraser className="w-3 h-3" />
                    {language === 'de' ? 'Löschen' : 'Clear'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm leading-relaxed text-slate-700 italic">
                "{t.transfer.poa.text}"
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase">{language === 'de' ? 'Digitale Unterschrift' : 'Digital Signature'}</Label>
                <div className="relative group rounded-xl overflow-hidden border-2 border-slate-200 bg-white cursor-crosshair">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={128}
                    className="w-full h-32 block touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  {!hasSigned && !isPoASigned && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300 text-sm">
                      {language === 'de' ? 'Hier unterschreiben' : 'Sign here'}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                className="w-full bg-primary h-12 text-lg transition-all duration-75" 
                onClick={handleSignPoA}
                disabled={isSigning || isPoASigned || transferStatus === 'not_started' || !hasSigned}
              >
                {isSigning ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <FileSignature className="w-5 h-5 mr-2" />}
                {t.transfer.poa.sign}
              </Button>
              
              {transferStatus === 'not_started' && (
                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {language === 'de' ? 'Bitte bestätigen Sie zuerst die Bankdaten.' : 'Please confirm bank details first.'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transfer Setup & Execution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-primary" />
                {t.transfer.setup}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground uppercase">{t.transfer.amount}</Label>
                <div className="relative">
                  <Input value={initialTransfer.amount.toLocaleString() + " USD"} readOnly className="pl-10 font-bold" />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  className="w-full bg-primary transition-all duration-75 h-12" 
                  onClick={startTransfer}
                  disabled={isStarting || (transferStatus !== 'not_started')}
                >
                  {isStarting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {transferStatus === 'not_started' ? t.transfer.begin : t.transfer.processing}
                </Button>
                
                {transferStatus === 'in_transit' && (
                  <Button 
                    variant="outline" 
                    className="w-full border-accent text-accent hover:bg-accent/5 transition-all duration-75" 
                    onClick={completeTransferManual}
                  >
                    {language === 'de' ? 'Transfer manuell abschließen' : 'Complete Transfer Manually'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cost Transparency */}
          <Card className="border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground uppercase">
                <Info className="w-4 h-4" />
                {t.transfer.transparency}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{t.transfer.midMarket}</p>
                <p className="text-lg font-bold font-mono">1 USD = 15.650,45 IDR</p>
              </div>
              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-[10px] text-muted-foreground border italic">
                "{t.transfer.guarantee}"
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

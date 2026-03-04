
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
  Eraser,
  Waves
} from 'lucide-react';
import { initialTransfer, TransferStatus } from '@/app/data/mockData';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function AssetTransferPage() {
  const { t, language } = useLanguage();
  const { 
    transferStatus, 
    updateTransferStatus, 
    isPoASigned, 
    setPoASigned,
    bankDetails,
    updateBankDetails
  } = useCase();
  
  const [isStarting, setIsStarting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Signature State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Canvas Drawing Logic
  useEffect(() => {
    if (mounted && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1A3C45'; // Primary deep ocean teal
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
      }
    }
  }, [mounted]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPoASigned || transferStatus === 'completed') return;
    setIsDrawing(true);
    setHasSigned(true);
    
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.closePath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current || isPoASigned || transferStatus === 'completed') return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearSignature = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  if (!mounted) return null;

  const handleStartReview = () => {
    if (!bankDetails.bankName || !bankDetails.swift || !bankDetails.iban || !bankDetails.customerNo) {
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
    }, 800);
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
    }, 1200);
  };

  const handleFinalizeTransfer = () => {
    setIsCompleting(true);
    setTimeout(() => {
      updateTransferStatus('completed');
      setIsCompleting(false);
      toast({
        title: language === 'de' ? 'Transfer abgeschlossen' : 'Transfer completed',
        description: language === 'de' ? 'Das Kapital wurde erfolgreich verbucht. Ihr Relocation-Fortschritt wurde aktualisiert.' : 'Capital has been successfully reconciled. Your relocation progress has been updated.',
      });
    }, 1500);
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

  const isReadOnly = transferStatus !== 'not_started';

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300 pb-24">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-black text-primary tracking-tighter uppercase">{t.transfer.title}</h1>
        <p className="text-lg text-muted-foreground font-medium">{t.transfer.subtitle}</p>
      </header>

      {/* Success Banner */}
      {isPoASigned && transferStatus !== 'completed' && (
        <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-center gap-6 animate-in fade-in slide-in-from-top-4 shadow-sm">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-emerald-900 text-lg">{t.transfer.poa.success}</p>
            <p className="text-sm text-emerald-700 font-bold uppercase tracking-widest">Transaction ID: <span className="font-mono text-emerald-900">TX-9283-ID-GF</span></p>
          </div>
        </div>
      )}

      {/* Progress Tracker */}
      <Card className="glass-card border-none batik-pattern p-1 shadow-2xl">
        <CardContent className="p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <CardTitle className="text-2xl font-black tracking-tighter uppercase">{t.transfer.status}</CardTitle>
              <CardDescription className="font-mono font-bold text-primary/40">TX-9283-ID-GF</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-primary tracking-tight">{t.transfer.eta.replace('{days}', initialTransfer.etaDays.toString())}</p>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t.transfer.arrival.replace('{date}', language === 'de' ? '12. Okt 2024' : 'Oct 12, 2024')}</p>
            </div>
          </div>

          <div className="relative flex justify-between">
            <div className="absolute top-5 left-[5%] right-[5%] h-1 bg-secondary rounded-full -z-0" />
            
            {steps.map((step) => {
              const status = getStepStatus(step.key);
              return (
                <div key={step.key} className="flex flex-col items-center gap-4 flex-1 relative">
                  <div className={cn(
                    "w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 transition-all duration-500 shadow-lg",
                    status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 
                    status === 'active' ? 'bg-white border-primary text-primary ring-8 ring-primary/5' : 
                    'bg-white border-secondary text-slate-200'
                  )}>
                    {status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <div className={cn("w-3 h-3 rounded-full", status === 'active' ? 'bg-primary' : 'bg-secondary')} />}
                  </div>
                  <span className={cn(
                    "text-[10px] font-black text-center uppercase tracking-[0.2em] transition-colors",
                    status === 'pending' ? 'text-slate-300' : 'text-primary'
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-10">
          {/* Source Bank Details */}
          <Card className="glass-card border-none shadow-xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
                <Building2 className="w-6 h-6 text-accent" />
                {t.transfer.sourceBank}
              </CardTitle>
              <CardDescription className="font-bold">{language === 'de' ? 'Alle Felder sind erforderlich.' : 'All fields are required.'}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.transfer.institution}</Label>
                <Input 
                  value={bankDetails.bankName} 
                  onChange={(e) => updateBankDetails({ bankName: e.target.value })} 
                  placeholder="e.g. Royal Bank of London" 
                  disabled={isReadOnly}
                  className="h-12 border-secondary font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.transfer.swift}</Label>
                  <Input 
                    value={bankDetails.swift} 
                    onChange={(e) => updateBankDetails({ swift: e.target.value })} 
                    placeholder="SWIFT/BIC" 
                    disabled={isReadOnly}
                    className="h-12 border-secondary font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.transfer.customerNo}</Label>
                  <Input 
                    value={bankDetails.customerNo} 
                    onChange={(e) => updateBankDetails({ customerNo: e.target.value })} 
                    placeholder="Account No" 
                    disabled={isReadOnly}
                    className="h-12 border-secondary font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.transfer.iban}</Label>
                <Input 
                  value={bankDetails.iban} 
                  onChange={(e) => updateBankDetails({ iban: e.target.value })} 
                  placeholder="IBAN" 
                  disabled={isReadOnly}
                  className="h-12 border-secondary font-bold"
                />
              </div>
            </CardContent>
          </Card>

          {/* Transfer Scope */}
          <Card className="glass-card border-none shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
                <ArrowRightLeft className="w-6 h-6 text-accent" />
                {t.transfer.scope.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-4">
              <div className="grid gap-4">
                {[
                  { id: 'cash', label: t.transfer.scope.cash },
                  { id: 'securities', label: t.transfer.scope.securities },
                  { id: 'pension', label: t.transfer.scope.pension },
                  { id: 'total', label: t.transfer.scope.total },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-secondary/30 rounded-2xl hover:bg-white transition-all cursor-pointer border border-transparent hover:border-secondary group">
                    <Checkbox id={item.id} disabled={isReadOnly} className="w-5 h-5 border-2" />
                    <Label htmlFor={item.id} className="text-sm font-bold cursor-pointer flex-1 group-hover:text-primary transition-colors">{item.label}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          {/* Digital Power of Attorney */}
          <Card className={cn("glass-card border-none shadow-xl transition-opacity", (isPoASigned || transferStatus === 'completed') && "opacity-60")}>
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
                  <FileSignature className="w-6 h-6 text-accent" />
                  {t.transfer.poa.title}
                </CardTitle>
                {!isPoASigned && hasSigned && transferStatus !== 'completed' && (
                  <Button variant="ghost" size="sm" onClick={clearSignature} className="text-[10px] font-black h-8 gap-2 uppercase tracking-widest">
                    <Eraser className="w-3 h-3" />
                    {language === 'de' ? 'Löschen' : 'Clear'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-8">
              <div className="p-6 bg-secondary/20 rounded-[2rem] border border-secondary/50 text-sm leading-relaxed text-primary/80 font-medium italic relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Waves className="w-12 h-12" />
                </div>
                "{t.transfer.poa.text}"
              </div>
              
              <div className="space-y-4">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{language === 'de' ? 'Digitale Unterschrift' : 'Digital Signature'}</Label>
                <div className="relative group rounded-[2rem] overflow-hidden border-4 border-secondary bg-white cursor-crosshair shadow-inner transition-all hover:border-primary/20">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={256}
                    className="w-full h-40 block touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  {!hasSigned && !isPoASigned && transferStatus !== 'completed' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-200 text-sm font-black uppercase tracking-[0.2em]">
                      {language === 'de' ? 'Hier unterschreiben' : 'Sign here'}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 h-16 text-xl font-black rounded-2xl shadow-2xl shadow-primary/10 transition-all" 
                onClick={handleSignPoA}
                disabled={isSigning || isPoASigned || transferStatus === 'not_started' || transferStatus === 'completed' || !hasSigned}
              >
                {isSigning ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <FileSignature className="w-6 h-6 mr-3" />}
                {t.transfer.poa.sign}
              </Button>
              
              {transferStatus === 'not_started' && (
                <div className="flex items-center gap-3 text-xs font-bold text-amber-700 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {language === 'de' ? 'Bitte bestätigen Sie zuerst die Bankdaten.' : 'Please confirm bank details first.'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Final Action - Setup or Finalize */}
          <Card className="glass-card border-none shadow-xl overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
               <Waves className="w-full h-full text-primary" />
            </div>
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
                <ArrowRightLeft className="w-6 h-6 text-accent" />
                {t.transfer.setup}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.transfer.amount}</Label>
                <div className="relative">
                  <Input 
                    value={initialTransfer.amount.toLocaleString() + " USD"} 
                    readOnly 
                    className="h-14 pl-12 font-black text-2xl bg-secondary/30 border-none rounded-2xl" 
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-primary/40 text-xl">$</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 pt-4">
                {transferStatus === 'not_started' ? (
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 h-16 text-xl font-black rounded-2xl shadow-2xl shadow-primary/10 transition-all" 
                    onClick={handleStartReview}
                    disabled={isStarting}
                  >
                    {isStarting && <Loader2 className="w-6 h-6 animate-spin mr-3" />}
                    {t.transfer.begin}
                  </Button>
                ) : transferStatus === 'in_transit' ? (
                  <Button 
                    className="w-full bg-accent text-primary hover:bg-accent/90 h-16 text-xl font-black rounded-2xl shadow-2xl shadow-accent/20 transition-all" 
                    onClick={handleFinalizeTransfer}
                    disabled={isCompleting}
                  >
                    {isCompleting ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <CheckCircle2 className="w-6 h-6 mr-3" />}
                    {language === 'de' ? 'Transfer abschließen' : 'Finalize Transfer'}
                  </Button>
                ) : (
                   <Button 
                    className="w-full bg-emerald-500 text-white h-16 text-xl font-black rounded-2xl shadow-2xl shadow-emerald-500/20 cursor-default opacity-100" 
                    disabled
                  >
                    <CheckCircle2 className="w-6 h-6 mr-3" />
                    {transferStatus === 'completed' ? (language === 'de' ? 'Erfolgreich verbucht' : 'Successfully Reconciled') : t.transfer.processing}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cost Transparency */}
          <Card className="glass-card border-none shadow-xl batik-pattern">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xs font-black flex items-center gap-3 text-muted-foreground uppercase tracking-[0.2em]">
                <Info className="w-4 h-4 text-accent" />
                {t.transfer.transparency}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <div className="space-y-2 mb-6">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.transfer.midMarket}</p>
                <p className="text-3xl font-black text-primary tracking-tighter">1 USD = 15.650,45 IDR</p>
              </div>
              <div className="p-5 bg-white rounded-2xl text-[10px] font-bold text-muted-foreground border-2 border-secondary italic leading-relaxed">
                "{t.transfer.guarantee}"
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useCase } from '@/components/CaseContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  Waves,
  Lock,
  ArrowRight,
  Calculator,
  LayoutDashboard
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
    if (!bankDetails.bankName || !bankDetails.swift || !bankDetails.iban || !bankDetails.customerNo || !bankDetails.amount) {
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
        description: language === 'de' ? 'Ihre Bankdaten werden nun geprüft. Der nächste Schritt ist nun verfügbar.' : 'Your bank details are now being reviewed. The next step is now available.',
      });
    }, 800);
  };

  const handleSignPoA = () => {
    if (!hasSigned) {
      toast({
        variant: "destructive",
        title: language === 'de' ? 'Unterschrift fehlt' : 'Signature missing',
        description: language === 'de' ? 'Bitte leisten Sie eine digitale Unterschrift im vorgesehenen Feld.' : 'Please provide a digital signature in the field.',
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

  const isBankStepActive = transferStatus === 'not_started';
  const isPoAStepActive = transferStatus === 'in_review';
  const isFinalStepActive = transferStatus === 'in_transit';
  const isAllFinished = transferStatus === 'completed';

  return (
    <div className="space-y-12 max-w-6xl mx-auto animate-in fade-in duration-300 pb-24">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-headline font-black text-primary tracking-tighter uppercase">{t.transfer.title}</h1>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl">{t.transfer.subtitle}</p>
      </header>

      <div className="space-y-12">
        
        {/* Step 1: Bank Information & Scope */}
        <section className={cn("transition-all duration-500", !isBankStepActive && "opacity-60 scale-[0.98]")}>
          <div className="flex items-center gap-6 mb-8">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transition-all", isBankStepActive ? "bg-primary text-white scale-110" : "bg-emerald-500 text-white")}>
              {isBankStepActive ? "1" : <CheckCircle2 className="w-8 h-8" />}
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">{language === 'de' ? 'Bankinformationen & Umfang' : 'Bank Details & Scope'}</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <Card className="lg:col-span-3 glass-card border-none shadow-xl batik-pattern p-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t.transfer.sourceBank}</Label>
                  <Input 
                    value={bankDetails.bankName} 
                    onChange={(e) => updateBankDetails({ bankName: e.target.value })} 
                    placeholder="e.g. Royal Bank of London" 
                    disabled={!isBankStepActive}
                    className="h-14 border-secondary font-bold text-lg bg-white/50 focus:bg-white transition-all rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t.transfer.swift}</Label>
                    <Input 
                      value={bankDetails.swift} 
                      onChange={(e) => updateBankDetails({ swift: e.target.value })} 
                      placeholder="SWIFT/BIC" 
                      disabled={!isBankStepActive}
                      className="h-14 border-secondary font-bold bg-white/50 focus:bg-white transition-all rounded-xl"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t.transfer.customerNo}</Label>
                    <Input 
                      value={bankDetails.customerNo} 
                      onChange={(e) => updateBankDetails({ customerNo: e.target.value })} 
                      placeholder="Account No" 
                      disabled={!isBankStepActive}
                      className="h-14 border-secondary font-bold bg-white/50 focus:bg-white transition-all rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t.transfer.iban}</Label>
                  <Input 
                    value={bankDetails.iban} 
                    onChange={(e) => updateBankDetails({ iban: e.target.value })} 
                    placeholder="IBAN" 
                    disabled={!isBankStepActive}
                    className="h-14 border-secondary font-bold bg-white/50 focus:bg-white transition-all rounded-xl"
                  />
                </div>
              </div>
            </Card>

            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-card border-none shadow-xl p-8">
                <div className="space-y-6">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t.transfer.amount}</Label>
                  <div className="relative">
                    <Input 
                      type="number"
                      value={bankDetails.amount} 
                      onChange={(e) => updateBankDetails({ amount: parseFloat(e.target.value) || 0 })}
                      disabled={!isBankStepActive}
                      className="h-20 pl-14 font-black text-4xl bg-primary/5 border-none rounded-2xl text-primary" 
                    />
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-primary/40 text-3xl">$</div>
                  </div>
                  
                  {isBankStepActive && (
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 h-20 text-xl font-black rounded-2xl shadow-2xl shadow-primary/20 transition-all group" 
                      onClick={handleStartReview}
                      disabled={isStarting}
                    >
                      {isStarting ? <Loader2 className="w-8 h-8 animate-spin mr-4" /> : <Calculator className="w-8 h-8 mr-4" />}
                      {t.transfer.begin}
                      <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  )}
                  
                  {!isBankStepActive && (
                    <div className="flex items-center gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      <p className="font-bold text-emerald-900">{language === 'de' ? 'Bankdaten bestätigt' : 'Bank details confirmed'}</p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="glass-card border-none shadow-xl p-8 bg-slate-50/50">
                <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">{t.transfer.scope.title}</CardTitle>
                <div className="grid grid-cols-2 gap-4">
                  {['cash', 'securities', 'pension', 'total'].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <Checkbox id={item} disabled={!isBankStepActive} className="w-5 h-5 rounded-lg border-2" />
                      <Label htmlFor={item} className="text-xs font-bold text-primary/60">{t.transfer.scope[item]}</Label>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 2: Digital Power of Attorney */}
        <section className={cn("transition-all duration-500", !isPoAStepActive && !isFinalStepActive && !isAllFinished && "opacity-30 grayscale pointer-events-none")}>
          <div className="flex items-center gap-6 mb-8">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transition-all", isPoAStepActive ? "bg-primary text-white scale-110" : isBankStepActive ? "bg-slate-200 text-slate-400" : "bg-emerald-500 text-white")}>
              {isPoASigned ? <CheckCircle2 className="w-8 h-8" /> : "2"}
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">{t.transfer.poa.title}</h2>
          </div>

          <Card className="glass-card border-none shadow-2xl overflow-hidden batik-pattern">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 md:p-14 space-y-10 bg-primary/5">
                <div className="space-y-6">
                  <Badge className="bg-accent text-primary font-black uppercase tracking-widest text-[10px] px-4 py-1.5">Legal Authorization</Badge>
                  <p className="text-2xl font-black text-primary leading-tight italic">"{t.transfer.poa.text}"</p>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                    {language === 'de' 
                      ? 'Dies autorisiert GlobeFlow, den Prozess direkt mit Ihrer Hausbank zu koordinieren, um Zeit zu sparen.' 
                      : 'This authorizes GlobeFlow to coordinate the process directly with your home bank to save you time.'}
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-secondary shadow-sm">
                  <ShieldCheck className="w-10 h-10 text-accent shrink-0" />
                  <p className="text-sm font-bold text-primary/60 leading-relaxed italic">{t.transfer.guarantee}</p>
                </div>
              </div>

              <div className="p-10 md:p-14 space-y-10 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{language === 'de' ? 'Digitale Unterschrift' : 'Digital Signature'}</Label>
                    {!isPoASigned && hasSigned && (
                      <Button variant="ghost" size="sm" onClick={clearSignature} className="text-[10px] font-black h-8 gap-2 uppercase tracking-widest text-rose-500">
                        <Eraser className="w-3 h-3" />
                        {language === 'de' ? 'Löschen' : 'Clear'}
                      </Button>
                    )}
                  </div>
                  
                  <div className={cn("relative rounded-[2.5rem] overflow-hidden border-4 border-dashed transition-all", isPoAStepActive ? "bg-white border-primary/20 cursor-crosshair hover:border-primary/40" : "bg-slate-100 border-slate-200 cursor-not-allowed")}>
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={320}
                      className="w-full h-48 block touch-none"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                    {!hasSigned && !isPoASigned && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300 text-sm font-black uppercase tracking-[0.3em]">
                        {language === 'de' ? 'Hier unterschreiben' : 'Sign here'}
                      </div>
                    )}
                    {isPoASigned && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                        <Badge className="bg-emerald-500 text-white font-black px-6 py-2 text-sm uppercase tracking-widest">{t.common.approved}</Badge>
                      </div>
                    )}
                  </div>
                </div>

                {!isPoASigned && (
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 h-20 text-xl font-black rounded-2xl shadow-2xl shadow-primary/20 transition-all group" 
                    onClick={handleSignPoA}
                    disabled={isSigning || !hasSigned || !isPoAStepActive}
                  >
                    {isSigning ? <Loader2 className="w-8 h-8 animate-spin mr-4" /> : <FileSignature className="w-8 h-8 mr-4" />}
                    {t.transfer.poa.sign}
                  </Button>
                )}
                
                {isPoASigned && (
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center animate-in fade-in zoom-in">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <p className="font-black text-emerald-900 text-lg">{t.transfer.poa.success}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </section>

        {/* Step 3: Finalize & Summary */}
        <section className={cn("transition-all duration-500", !isFinalStepActive && !isAllFinished && "opacity-30 grayscale pointer-events-none")}>
          <div className="flex items-center gap-6 mb-8">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transition-all", isFinalStepActive ? "bg-primary text-white scale-110" : isAllFinished ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400")}>
              {isAllFinished ? <CheckCircle2 className="w-8 h-8" /> : "3"}
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">{language === 'de' ? 'Abschluss' : 'Finalize'}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="ocean-gradient text-white border-none shadow-2xl p-10 flex flex-col justify-between min-h-[300px] rounded-[2.5rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
                 <Waves className="w-full h-full text-white" />
               </div>
               <div className="space-y-6 relative z-10">
                 <CardTitle className="text-3xl font-black uppercase tracking-tighter">{t.transfer.transparency}</CardTitle>
                 <div className="space-y-2">
                   <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{t.transfer.midMarket}</p>
                   <p className="text-5xl font-black text-white tracking-tighter">1 USD = 15.650,45 IDR</p>
                 </div>
               </div>
               <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 relative z-10">
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</span>
                   <Badge className="bg-accent text-primary font-black uppercase tracking-widest text-[8px]">{transferStatus.replace('_', ' ')}</Badge>
                 </div>
                 <p className="text-lg font-black">{t.transfer.eta.replace('{days}', '3-5')}</p>
               </div>
            </Card>

            <div className="flex flex-col justify-center space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-primary tracking-tighter uppercase">{language === 'de' ? 'Bereit zum Abschluss?' : 'Ready to Finalize?'}</h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  {language === 'de' 
                    ? 'Sobald Sie den Transfer abschließen, wird unser Team die Mittelabgleichung einleiten. Dies ist der finale Schritt für Ihren Umzug.' 
                    : 'Once you finalize the transfer, our team will initiate the capital reconciliation. This is the final step for your relocation.'}
                </p>
              </div>

              {isFinalStepActive ? (
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 h-24 text-2xl font-black rounded-3xl shadow-[0_20px_60px_rgba(26,60,69,0.3)] transition-all group" 
                  onClick={handleFinalizeTransfer}
                  disabled={isCompleting}
                >
                  {isCompleting ? <Loader2 className="w-10 h-10 animate-spin mr-6" /> : <ArrowRightLeft className="w-10 h-10 mr-6" />}
                  {language === 'de' ? 'Transfer jetzt abschließen' : 'Finalize Transfer Now'}
                  <ArrowRight className="ml-6 w-8 h-8 group-hover:translate-x-3 transition-transform" />
                </Button>
              ) : isAllFinished ? (
                <div className="p-10 bg-emerald-50 rounded-[2.5rem] border-4 border-emerald-500 text-center space-y-6 animate-in zoom-in shadow-2xl shadow-emerald-200">
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-xl">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h4 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase">{language === 'de' ? 'Abgeschlossen' : 'Completed'}</h4>
                    <p className="text-emerald-700 font-bold">{language === 'de' ? 'Ihr Kapital ist sicher verbucht.' : 'Your capital is safely reconciled.'}</p>
                  </div>
                  <Link href="/dashboard" className="block">
                    <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-100 h-14 font-black rounded-xl gap-3">
                      <LayoutDashboard className="w-5 h-5" />
                      {t.common.returnDashboard}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="p-10 bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-200 flex flex-col items-center gap-4">
                  <Lock className="w-10 h-10 text-slate-300" />
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">{language === 'de' ? 'Gesperrt' : 'Locked'}</p>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}


"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useCase } from '@/components/CaseContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  HelpCircle,
  Loader2,
  Globe,
  Star,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { DocStatus } from '@/app/data/mockData';
import { aiDocumentGuidance } from '@/ai/flows/ai-document-guidance-flow';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';

export default function DocumentsPage() {
  const { t, language } = useLanguage();
  const { documents, updateDocumentStatus } = useCase();
  const [loadingAi, setLoadingAi] = useState<string | null>(null);
  const [aiGuidance, setAiGuidance] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStatusBadge = (status: DocStatus) => {
    switch (status) {
      case 'approved': return <Badge className="status-badge-success">{t.common.approved}</Badge>;
      case 'under_review': return <Badge className="status-badge-pending">{t.common.under_review}</Badge>;
      case 'rejected': return <Badge className="status-badge-error">{t.common.rejected}</Badge>;
      case 'uploaded': return <Badge className="status-badge-neutral">{t.common.uploaded}</Badge>;
      default: return <Badge variant="outline" className="text-muted-foreground">{t.common.not_started}</Badge>;
    }
  };

  const handleAiGuidance = async (docTitle: string) => {
    setLoadingAi(docTitle);
    try {
      const result = await aiDocumentGuidance({ documentTitle: docTitle });
      setAiGuidance(result.instructions);
    } catch (error) {
      console.error("AI Guidance failed", error);
    } finally {
      setLoadingAi(null);
    }
  };

  const handleUpload = (docId: string, docTitle: string) => {
    setIsUploading(docId);
    setTimeout(() => {
      updateDocumentStatus(docId, 'under_review');
      setIsUploading(null);
      toast({
        title: language === 'de' ? 'Erfolgreich hochgeladen' : 'Upload successful',
        description: `${docTitle} ${language === 'de' ? 'wird nun geprüft.' : 'is now under review.'}`,
      });
    }, 100);
  };

  const completedCount = documents.filter(d => d.status !== 'not_uploaded').length;
  const isMilestoneReached = completedCount >= 3;

  const getDocT = (docId: string) => {
    const keys: Record<string, string> = {
      '1': 'passport',
      '2': 'address',
      '3': 'tax',
      '4': 'bank',
      '5': 'funds',
      '6': 'visa'
    };
    return t.documents.items[keys[docId]];
  };

  if (!mounted) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-75 pb-20">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-headline font-black text-primary tracking-tighter uppercase">{t.documents.title}</h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl">{t.documents.subtitle}</p>
      </header>

      <div className="grid gap-12">
        {/* Milestone Card with Next Step CTA */}
        <section>
          <Card className={`border-none shadow-2xl relative overflow-hidden transition-all duration-500 ${isMilestoneReached ? 'bg-emerald-50 ring-2 ring-emerald-200' : 'bg-primary/5'}`}>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-5 pointer-events-none">
              <Star className="w-full h-full text-primary" />
            </div>
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8">
                <div className={`w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center border-4 shadow-xl shrink-0 transition-transform ${isMilestoneReached ? 'border-emerald-500 scale-110' : 'border-slate-100'}`}>
                  {isMilestoneReached ? <Star className="w-10 h-10 text-yellow-500 fill-yellow-500 animate-pulse" /> : <CheckCircle className="w-10 h-10 text-slate-200" />}
                </div>
                <div className="space-y-2">
                  <h3 className={`text-2xl font-black tracking-tighter ${isMilestoneReached ? 'text-emerald-900' : 'text-primary'}`}>
                    {t.documents.milestoneTitle}
                    {isMilestoneReached && <Badge className="ml-3 bg-emerald-500 text-white uppercase tracking-widest text-[10px]">{t.common.active}</Badge>}
                  </h3>
                  <p className={`text-lg font-medium ${isMilestoneReached ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                    {isMilestoneReached 
                      ? (language === 'de' ? 'Meilenstein erreicht! Sie können nun mit dem Kapitaltransfer fortfahren.' : 'Milestone reached! You can now proceed to capital transfer.')
                      : t.documents.milestoneDesc
                    }
                  </p>
                </div>
              </div>
              
              {isMilestoneReached ? (
                <Link href="/transfer" className="w-full md:w-auto">
                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-16 px-10 text-xl font-black rounded-2xl shadow-2xl shadow-emerald-200 group transition-all">
                    {language === 'de' ? 'Zum Kapitaltransfer' : 'Continue to Transfer'}
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <div className="text-center md:text-right shrink-0">
                  <span className="block text-sm font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{language === 'de' ? 'Fortschritt' : 'Progress'}</span>
                  <span className="text-4xl font-black text-primary">{completedCount} / {documents.length}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter uppercase">{t.documents.priority}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((doc) => {
              const trans = getDocT(doc.id);
              return (
                <Card key={doc.id} className="border-none glass-card group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
                  <div className="batik-pattern bg-primary/5 h-2 w-full" />
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:bg-accent group-hover:text-white transition-all">
                        <FileText className="w-6 h-6 text-primary group-hover:text-white" />
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                    <CardTitle className="text-xl font-black leading-tight">{trans.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 flex-1 space-y-4">
                    <p className="text-md text-muted-foreground font-medium leading-relaxed">{trans.why}</p>
                    
                    <div className="bg-secondary/30 p-5 rounded-2xl border border-secondary text-sm font-medium leading-relaxed">
                      <span className="text-[10px] font-black text-primary/40 block mb-2 uppercase tracking-widest">{t.documents.howTo}</span>
                      {trans.how}
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0 flex gap-3">
                    <Button 
                      variant={doc.status === 'not_uploaded' ? 'default' : 'outline'} 
                      className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-primary/5 transition-all"
                      disabled={doc.status !== 'not_uploaded' || isUploading === doc.id}
                      onClick={() => handleUpload(doc.id, trans.title)}
                    >
                      {isUploading === doc.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                      {doc.status === 'not_uploaded' ? t.common.upload : t.common.uploaded}
                    </Button>
                    
                    <Dialog onOpenChange={(open) => !open && setAiGuidance(null)}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-12 w-12 rounded-xl text-primary hover:bg-primary/5 transition-all"
                          onClick={() => handleAiGuidance(trans.title)}
                        >
                          {loadingAi === trans.title ? <Loader2 className="w-5 h-5 animate-spin" /> : <HelpCircle className="w-5 h-5" />}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl rounded-[2rem] border-none batik-pattern">
                        <DialogHeader>
                          <DialogTitle className="text-3xl font-black flex items-center gap-4 tracking-tighter">
                            <Globe className="w-8 h-8 text-accent" />
                            {t.documents.aiGuide}: {trans.title}
                          </DialogTitle>
                          <DialogDescription className="text-lg font-medium">
                            {language === 'de' ? 'Personalisierte Anweisungen basierend auf internationalen Anforderungen.' : 'Personalized instructions based on international requirements.'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-8 p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-secondary shadow-inner max-h-[50vh] overflow-y-auto">
                          {loadingAi === trans.title ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-6">
                              <Loader2 className="w-12 h-12 animate-spin text-primary" />
                              <p className="text-lg font-bold text-muted-foreground">{t.documents.aiAnalyzing}</p>
                            </div>
                          ) : (
                            <div className="prose prose-slate text-primary/80 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                              {aiGuidance || (language === 'de' ? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut." : "Something went wrong. Please try again.")}
                            </div>
                          )}
                        </div>
                        <div className="mt-8 flex justify-end">
                          <DialogClose asChild>
                            <Button onClick={() => setAiGuidance(null)} size="lg" className="bg-primary text-white font-black h-14 px-10 rounded-2xl shadow-xl">{t.common.close}</Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}


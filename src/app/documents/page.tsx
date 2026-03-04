
"use client";

import React, { useState, useEffect } from 'react';
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
  ShieldCheck
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
    <div className="space-y-6 animate-in fade-in duration-75">
      <header>
        <h1 className="text-3xl font-headline font-bold text-primary">{t.documents.title}</h1>
        <p className="text-muted-foreground">{t.documents.subtitle}</p>
      </header>

      <div className="grid gap-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t.documents.priority}</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {t.documents.completed.replace('{count}', completedCount.toString()).replace('{total}', documents.length.toString())}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc) => {
              const trans = getDocT(doc.id);
              return (
                <Card key={doc.id} className="border-slate-100 hover:border-primary/20 transition-all duration-75 flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/5 rounded-lg">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{trans.title}</CardTitle>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{trans.why}</p>
                    
                    <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100">
                      <span className="font-bold block mb-1">{t.documents.howTo}</span>
                      {trans.how}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex gap-2">
                    <Button 
                      variant={doc.status === 'not_uploaded' ? 'default' : 'outline'} 
                      className="flex-1 gap-2 border-slate-200 transition-all duration-75"
                      disabled={doc.status !== 'not_uploaded' || isUploading === doc.id}
                      onClick={() => handleUpload(doc.id, trans.title)}
                    >
                      {isUploading === doc.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {doc.status === 'not_uploaded' ? t.common.upload : t.common.uploaded}
                    </Button>
                    
                    <Dialog onOpenChange={(open) => !open && setAiGuidance(null)}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-primary transition-all duration-75"
                          onClick={() => handleAiGuidance(trans.title)}
                        >
                          {loadingAi === trans.title ? <Loader2 className="w-4 h-4 animate-spin" /> : <HelpCircle className="w-4 h-4" />}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-accent" />
                            {t.documents.aiGuide}: {trans.title}
                          </DialogTitle>
                          <DialogDescription>
                            {language === 'de' ? 'Personalisierte Anweisungen basierend auf internationalen Anforderungen.' : 'Personalized instructions based on international requirements.'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 p-4 bg-slate-50 rounded-xl border max-h-[60vh] overflow-y-auto">
                          {loadingAi === trans.title ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-4">
                              <Loader2 className="w-8 h-8 animate-spin text-primary" />
                              <p className="text-sm text-muted-foreground">{t.documents.aiAnalyzing}</p>
                            </div>
                          ) : (
                            <div className="prose prose-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                              {aiGuidance || (language === 'de' ? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut." : "Something went wrong. Please try again.")}
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button onClick={() => setAiGuidance(null)} className="bg-primary transition-all duration-75">{t.common.close}</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        <Dialog>
          <DialogTrigger asChild>
            <Card className={`border-primary/10 mb-8 cursor-pointer transition-all duration-150 hover:shadow-md ${isMilestoneReached ? 'bg-green-50 border-green-100' : 'bg-primary/5'}`}>
              <CardContent className="p-6 flex items-center gap-6">
                <div className={`hidden md:flex w-16 h-16 bg-white rounded-full items-center justify-center border shadow-sm shrink-0 ${isMilestoneReached ? 'border-green-200' : ''}`}>
                  {isMilestoneReached ? <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-bounce" /> : <CheckCircle className="w-8 h-8 text-slate-300" />}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isMilestoneReached ? 'text-green-800' : 'text-primary'}`}>
                    {t.documents.milestoneTitle}
                    {isMilestoneReached && <Badge className="ml-2 bg-green-500">{t.common.active}</Badge>}
                  </h3>
                  <p className="text-sm text-slate-600">{t.documents.milestoneDesc}</p>
                </div>
                <Button className={`ml-auto shrink-0 transition-all duration-75 ${isMilestoneReached ? 'bg-green-600 hover:bg-green-700' : 'bg-primary'}`}>
                  {t.common.view}
                </Button>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldCheck className={`w-5 h-5 ${isMilestoneReached ? 'text-green-500' : 'text-slate-400'}`} />
                {t.documents.milestoneTitle}
              </DialogTitle>
              <DialogDescription>
                {language === 'de' ? 'Status Ihrer Vorabgenehmigung.' : 'Status of your pre-approval process.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm">{t.documents.priority}</span>
                <span className="font-bold">{completedCount} / {documents.length}</span>
              </div>
              <div className="p-4 rounded-lg border text-sm leading-relaxed">
                {isMilestoneReached 
                  ? (language === 'de' ? 'Hervorragend! Sie haben die Mindestanforderungen für die Vorabprüfung erfüllt. Unser Team bereitet die Unterlagen vor.' : 'Excellent! You have met the minimum requirements for pre-approval. Our team is preparing the paperwork.')
                  : (language === 'de' ? 'Laden Sie noch mindestens 3 Dokumente hoch, um die Vorabprüfung zu aktivieren.' : 'Upload at least 3 documents to activate the pre-approval review.')
                }
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-primary">{t.common.close}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

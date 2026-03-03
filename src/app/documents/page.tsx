
"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  HelpCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { initialDocuments, DocStatus } from '@/app/data/mockData';
import { aiDocumentGuidance } from '@/ai/flows/ai-document-guidance-flow';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DocumentsPage() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState(initialDocuments);
  const [loadingAi, setLoadingAi] = useState<string | null>(null);
  const [aiGuidance, setAiGuidance] = useState<string | null>(null);

  const getStatusBadge = (status: DocStatus) => {
    switch (status) {
      case 'approved': return <Badge className="status-badge-success">Approved</Badge>;
      case 'under_review': return <Badge className="status-badge-pending">Under Review</Badge>;
      case 'rejected': return <Badge className="status-badge-error">Rejected</Badge>;
      case 'uploaded': return <Badge className="status-badge-neutral">Uploaded</Badge>;
      default: return <Badge variant="outline" className="text-muted-foreground">Not Uploaded</Badge>;
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

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-bold text-primary">{t.nav.documents}</h1>
        <p className="text-muted-foreground">Secure document vault for your Indonesian residency application.</p>
      </header>

      <div className="grid gap-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Priority Checklist</h2>
            <span className="text-sm font-medium text-muted-foreground">2 of 6 Completed</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="border-slate-100 hover:border-primary/20 transition-all flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/5 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{doc.whyNeeded}</p>
                  
                  <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100">
                    <span className="font-bold block mb-1">How to obtain:</span>
                    {doc.howToGet}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2 border-slate-200">
                    <Upload className="w-4 h-4" />
                    Upload
                  </Button>
                  
                  <Dialog onOpenChange={(open) => !open && setAiGuidance(null)}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-primary"
                        onClick={() => handleAiGuidance(doc.title)}
                      >
                        {loadingAi === doc.title ? <Loader2 className="w-4 h-4 animate-spin" /> : <HelpCircle className="w-4 h-4" />}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-accent" />
                          AI Guidance: {doc.title}
                        </DialogTitle>
                        <DialogDescription>
                          Personalized instructions based on international requirements.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 p-4 bg-slate-50 rounded-xl border max-h-[60vh] overflow-y-auto">
                        {loadingAi === doc.title ? (
                          <div className="flex flex-col items-center justify-center py-10 gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Analyzing document requirements...</p>
                          </div>
                        ) : (
                          <div className="prose prose-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {aiGuidance || "Something went wrong. Please try again."}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button onClick={() => setAiGuidance(null)} className="bg-primary">Close Guide</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-6 flex items-center gap-6">
            <div className="hidden md:flex w-16 h-16 bg-white rounded-full items-center justify-center border shadow-sm shrink-0">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">Pre-approval Milestone</h3>
              <p className="text-sm text-slate-600">You are 2 documents away from your initial eligibility certificate. This will accelerate your transfer process by 48 hours.</p>
            </div>
            <Button className="ml-auto bg-primary text-white shrink-0">View Next Steps</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

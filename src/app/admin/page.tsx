
"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminPanel() {
  const { t } = useLanguage();

  const [cases] = useState([
    { id: 'C-9021', name: 'Alexander Sterling', progress: '17%', status: t.common.active, manager: 'Sarah H.' },
    { id: 'C-9022', name: 'Mitsuko Tanaka', progress: '85%', status: t.common.review, manager: 'Sarah H.' },
    { id: 'C-9023', name: 'Daniel Weber', progress: '12%', status: t.common.delayed, manager: 'Mark T.' },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-100 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-accent" />
            {t.admin.title}
          </h1>
          <p className="text-muted-foreground">{t.admin.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 transition-all duration-75">
            <RefreshCw className="w-4 h-4" />
            {t.admin.sync}
          </Button>
          <Button variant="destructive" size="sm" className="transition-all duration-75">{t.admin.logs}</Button>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium uppercase">{t.admin.activeCases}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142</div>
            <p className="text-xs text-green-500 mt-2">+12 {t.language === 'de' ? 'diese Woche' : 'this week'}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium uppercase">{t.admin.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28</div>
            <p className="text-xs text-yellow-500 mt-2">Avg Wait: 4.2h</p>
          </CardContent>
        </Card>
        <Card className="border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium uppercase">{t.admin.aum}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$18.4M</div>
            <p className="text-xs text-primary mt-2">Target: 74%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>{t.admin.management}</CardTitle>
              <CardDescription>{t.language === 'de' ? 'Status und Feedback verwalten.' : 'Manage document statuses and review feedback.'}</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t.common.search + "..."} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.admin.caseId}</TableHead>
                <TableHead>{t.admin.applicant}</TableHead>
                <TableHead>{t.admin.progress}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead>{t.admin.manager}</TableHead>
                <TableHead className="text-right">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell className="font-semibold">{c.name}</TableCell>
                  <TableCell>{c.progress}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === t.common.active ? 'default' : 'outline'}>{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.manager}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 transition-all duration-75"><CheckCircle className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 transition-all duration-75"><XCircle className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary transition-all duration-75"><MessageSquare className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
        <div>
          <h4 className="font-bold text-amber-800">{t.admin.compliance}</h4>
          <p className="text-sm text-amber-700 leading-relaxed">
            {t.admin.complianceText}
          </p>
        </div>
      </div>
    </div>
  );
}

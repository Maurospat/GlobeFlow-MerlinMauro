
"use client";

import React from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Wallet, TrendingDown, Info, PieChart } from 'lucide-react';

export default function CostsDashboard() {
  const { t } = useLanguage();

  const costItems = [
    { name: 'Transfer Fee', description: 'Bank to Bank wiring costs', amount: 0, status: 'Waived' },
    { name: 'FX Conversion', description: 'Based on 0.15% margin on mid-market', amount: 375, status: 'Estimated' },
    { name: 'Visa Processing', description: 'Government fees & administration', amount: 1500, status: 'Fixed' },
    { name: 'Consultancy', description: 'Personal case manager fee (6 months)', amount: 1200, status: 'Fixed' },
    { name: 'Secure Vaulting', description: 'Digital document storage & security', amount: 345, status: 'Annual' },
  ];

  const total = costItems.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-headline font-bold text-primary">{t.nav.costs}</h1>
        <p className="text-muted-foreground">Total transparency on your immigration financial commitment.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-primary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70 uppercase">Estimated Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${total.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-2 text-white/70 text-sm">
              <TrendingDown className="w-4 h-4 text-accent" />
              <span>12% lower than average agencies</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Live Exchange Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">15,650.45 IDR</div>
            <p className="text-xs text-muted-foreground mt-2">Market volatility: Low (Simulated)</p>
          </CardContent>
        </Card>

        <Card className="border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">35% Paid</div>
            <p className="text-xs text-muted-foreground mt-2">Next invoice due: Oct 30, 2024</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>A complete list of services and associated costs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costItems.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-semibold">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.description}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase
                      ${item.status === 'Waived' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-slate-50/50">
                <TableCell colSpan={3} className="font-bold text-lg">Total Commitment</TableCell>
                <TableCell className="text-right font-bold text-lg text-primary">${total.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Info className="w-5 h-5 text-accent" />
            What drives cost?
          </h3>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>Our fees are structured for maximum clarity. Most costs in Indonesia for HNWIs are driven by government regulations and official stamp duties.</p>
            <p>GlobeFlow leverages institutional bank rates (FX) to save you between 1% and 3% on high-value transfers compared to retail banking apps.</p>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border flex items-center justify-between">
          <div className="space-y-2">
            <h4 className="font-bold">Need a custom quote?</h4>
            <p className="text-xs text-muted-foreground">For transfers above $1M, contact your case manager for institutional pricing.</p>
          </div>
          <PieChart className="w-12 h-12 text-primary opacity-20" />
        </div>
      </div>
    </div>
  );
}

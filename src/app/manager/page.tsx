
"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Send, 
  Calendar, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Phone,
  Video
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function CaseManagerPage() {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const managerImage = PlaceHolderImages.find(img => img.id === 'case-manager-portrait');

  const faqs = [
    { q: "How long does the visa take?", a: "Typically 4-6 weeks after document submission." },
    { q: "Can I transfer multiple currencies?", a: "Yes, we support all major G10 currencies." },
    { q: "Is my data secure?", a: "We use bank-grade AES-256 encryption for all documents." },
    { q: "What happens if a document is rejected?", a: "Your manager will provide specific feedback for correction." },
    { q: "Are there Indonesian tax implications?", a: "Our tax experts provide a free initial consultation." },
    { q: "Do I need to visit a physical office?", a: "95% of the process is fully digital." },
  ];

  const chatMessages = [
    { role: 'manager', text: "Hello Alexander! I've reviewed your Passport copy. Everything looks perfect.", time: "10:15 AM" },
    { role: 'user', text: "Thanks, Sarah. When should I expect the tax certificate review to finish?", time: "10:20 AM" },
    { role: 'manager', text: "Our tax team is finalizing it now. Expect an update by tomorrow morning.", time: "10:25 AM" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="space-y-8 md:col-span-1">
        <header>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.nav.manager}</h1>
          <p className="text-muted-foreground">Your dedicated relocation expert.</p>
        </header>

        {/* Manager Profile */}
        <Card className="overflow-hidden border-slate-100">
          <div className="h-24 bg-primary" />
          <CardContent className="pt-0 relative -mt-12 flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg mb-4">
              <AvatarImage src={managerImage?.imageUrl} />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">Sarah Hamilton</h3>
            <p className="text-sm text-accent font-semibold mb-1">Senior Relocation Manager</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Certified Immigration Specialist
            </p>
            
            <div className="w-full mt-6 space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Response SLA</span>
                <span className="font-bold">&lt; 24h</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2"><Phone className="w-4 h-4" /> Call</Button>
                <Button variant="outline" className="flex-1 gap-2"><Video className="w-4 h-4" /> Video</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Booking */}
        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle className="text-lg">Book Consultation</CardTitle>
            <CardDescription>Reserve a dedicated strategy session.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border text-sm flex justify-between items-center group cursor-pointer hover:border-accent">
                <span>Tomorrow, 10:00 AM</span>
                <Button variant="ghost" size="sm" className="text-accent">Select</Button>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border text-sm flex justify-between items-center group cursor-pointer hover:border-accent">
                <span>Tomorrow, 2:30 PM</span>
                <Button variant="ghost" size="sm" className="text-accent">Select</Button>
              </div>
              <Button variant="link" className="w-full text-xs text-muted-foreground">View more slots</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-8">
        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col border-slate-100 overflow-hidden">
          <CardHeader className="border-b bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <CardTitle className="text-lg">Secure Messages</CardTitle>
              </div>
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-slate-100 text-slate-800 rounded-bl-none'
                }`}>
                  {msg.text}
                  <p className={`text-[10px] mt-1 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="p-4 bg-slate-50 border-t">
            <div className="flex w-full gap-2">
              <Input 
                placeholder="Type your message..." 
                className="bg-white" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button size="icon" className="bg-primary shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-accent" />
            Frequently Asked Questions
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-slate-100 bg-slate-50/30">
                <CardContent className="p-4">
                  <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Send, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Phone,
  Video,
  Loader2
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { chatWithManager } from '@/ai/flows/chat-flow';

interface Message {
  role: 'user' | 'model';
  text: string;
  time: string;
}

export default function CaseManagerPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setMessages([
      { role: 'model', text: t.manager.chat.m1, time: "10:15" },
      { role: 'user', text: t.manager.chat.u1, time: "10:20" },
      { role: 'model', text: t.manager.chat.m2, time: "10:25" },
    ]);
  }, [t.manager.chat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!mounted) return null;

  const managerImage = PlaceHolderImages.find(img => img.id === 'case-manager-portrait');

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await chatWithManager({
        history,
        message: inputMessage,
        language: language as 'en' | 'de'
      });

      const aiMsg: Message = {
        role: 'model',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 pb-12 animate-in fade-in duration-75">
      <div className="space-y-8 md:col-span-1">
        <header>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.nav.manager}</h1>
          <p className="text-muted-foreground">{t.manager.subtitle}</p>
        </header>

        <Card className="overflow-hidden border-slate-100">
          <div className="h-24 bg-primary" />
          <CardContent className="pt-0 relative -mt-12 flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg mb-4">
              <AvatarImage src={managerImage?.imageUrl} />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">Sarah Hamilton</h3>
            <p className="text-sm text-accent font-semibold mb-1">{t.manager.specialist}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-accent" />
              {t.manager.certified}
            </p>
            
            <div className="w-full mt-6 space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {t.manager.responseSLA}</span>
                <span className="font-bold">&lt; 24h</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2 transition-all duration-75"><Phone className="w-4 h-4" /> Call</Button>
                <Button variant="outline" className="flex-1 gap-2 transition-all duration-75"><Video className="w-4 h-4" /> Video</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100">
          <CardHeader>
            <CardTitle className="text-lg">{t.manager.book}</CardTitle>
            <CardDescription>{t.manager.profileSub}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border text-sm flex justify-between items-center group cursor-pointer hover:border-accent transition-all duration-75">
                <span>{t.manager.slots.tomorrow10}</span>
                <Button variant="ghost" size="sm" className="text-accent">{t.common.select}</Button>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border text-sm flex justify-between items-center group cursor-pointer hover:border-accent transition-all duration-75">
                <span>{t.manager.slots.tomorrow2}</span>
                <Button variant="ghost" size="sm" className="text-accent">{t.common.select}</Button>
              </div>
              <Button variant="link" className="w-full text-xs text-muted-foreground">{t.common.viewMore}</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-8">
        <Card className="h-[600px] flex flex-col border-slate-100 overflow-hidden shadow-sm">
          <CardHeader className="border-b bg-slate-50/50 py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={managerImage?.imageUrl} />
                    <AvatarFallback>SH</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Sarah Hamilton</CardTitle>
                  <p className="text-xs text-muted-foreground font-medium">{t.manager.specialist}</p>
                </div>
              </div>
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                }`}>
                  {msg.text}
                  <p className={`text-[10px] mt-2 opacity-60 font-medium ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 rounded-2xl rounded-bl-none p-4 shadow-sm border border-slate-100">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 bg-white border-t">
            <form 
              className="flex w-full gap-2" 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            >
              <Input 
                placeholder={t.common.typeMessage} 
                className="bg-slate-50 border-slate-200 focus:bg-white" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
              />
              <Button 
                type="submit"
                size="icon" 
                className="bg-primary shrink-0 transition-all duration-75 hover:bg-primary/90"
                disabled={!inputMessage.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-accent" />
            {t.manager.faq}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.manager.faqs.map((faq: any, i: number) => (
              <Card key={i} className="border-slate-100 bg-slate-50/30 hover:bg-slate-50 transition-colors duration-75">
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

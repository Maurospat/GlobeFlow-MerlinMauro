
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, ShieldCheck, UserCheck, CreditCard, Waves, Star, CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const { t, language } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bali');

  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-primary">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 ocean-gradient rounded-xl flex items-center justify-center shadow-xl">
            <Waves className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-black text-3xl text-primary tracking-tighter">GlobeFlow</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-black text-primary/60 hover:text-primary uppercase tracking-widest transition-colors hidden sm:block">
            {t.common.login}
          </Link>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-white font-black h-12 px-8 rounded-xl shadow-xl shadow-primary/20 transition-all">
              {t.common.signup}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="flex-1 space-y-10 animate-in fade-in slide-in-from-left duration-700">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/50 rounded-full border border-secondary">
            <Star className="w-4 h-4 text-accent fill-current" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t.landing.goldenVisa}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-headline font-black text-primary leading-[0.9] tracking-tighter">
            {t.landing.heroTitle}
          </h1>
          
          <p className="text-2xl text-muted-foreground max-w-xl font-medium leading-relaxed">
            {t.landing.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-primary text-white h-20 px-12 text-2xl font-black rounded-2xl group shadow-2xl shadow-primary/30 transition-all">
                {t.landing.cta}
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform w-8 h-8" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-20 px-12 text-2xl font-black rounded-2xl border-secondary border-4 text-primary bg-white hover:bg-secondary transition-all">
              {t.common.book}
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-secondary">
             <div className="space-y-1">
                <p className="text-3xl font-black text-primary">100%</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.landing.successRate}</p>
             </div>
             <div className="h-10 w-px bg-secondary" />
             <p className="text-sm font-medium text-muted-foreground max-w-[200px] italic">
               {t.landing.trust}
             </p>
          </div>
        </div>
        
        <div className="flex-1 relative animate-in fade-in zoom-in duration-1000">
          <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(26,60,69,0.2)] border-[12px] border-white group">
            <Image 
              src={heroImage?.imageUrl || "https://picsum.photos/seed/bali/800/1000"} 
              alt="Bali Indonesia" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
              priority
              data-ai-hint="indonesia luxury"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-60" />
            
            {/* Floating Card */}
            <div className="absolute bottom-10 left-10 right-10 p-10 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl animate-in slide-in-from-bottom duration-700 delay-500">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="text-primary w-8 h-8" />
                </div>
                <div>
                  <p className="text-white font-black text-xl tracking-tight">Tier-1 Security</p>
                  <p className="text-white/70 text-sm font-medium">Bank-grade asset protection</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Accent Element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 batik-pattern opacity-20 pointer-events-none" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-secondary/30 py-32 batik-pattern">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-headline font-black text-primary tracking-tighter uppercase">{t.landing.experience}</h2>
            <div className="w-24 h-2 bg-accent mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10" />} 
              title={t.landing.features.command.title} 
              description={t.landing.features.command.desc}
            />
            <FeatureCard 
              icon={<UserCheck className="w-10 h-10" />} 
              title={t.landing.features.manager.title} 
              description={t.landing.features.manager.desc}
            />
            <FeatureCard 
              icon={<CreditCard className="w-10 h-10" />} 
              title={t.landing.features.transfers.title} 
              description={t.landing.features.transfers.desc}
            />
          </div>
        </div>
      </section>

      {/* Trust Footer Section */}
      <footer className="bg-primary text-white py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none translate-x-1/2 -translate-y-1/2">
          <Waves className="w-full h-full text-white" />
        </div>
        <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-12">
           <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Waves className="text-accent w-8 h-8" />
            </div>
            <span className="font-headline font-black text-4xl text-white tracking-tighter">GlobeFlow</span>
          </div>
          <p className="text-white/60 font-medium max-w-md">
            © 2024 GlobeFlow Relocation Services. Licensed by Indonesian Ministry of Law & Human Rights.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-secondary group relative overflow-hidden">
      <div className="absolute -right-8 -bottom-8 w-32 h-32 batik-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
      <div className="text-primary mb-10 bg-secondary w-20 h-20 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{title}</h3>
      <p className="text-muted-foreground text-lg leading-relaxed font-medium">{description}</p>
    </div>
  );
}

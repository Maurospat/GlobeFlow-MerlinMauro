
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, ShieldCheck, UserCheck, CreditCard } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bali');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe className="text-primary w-8 h-8" />
          <span className="font-headline font-bold text-2xl text-primary">GlobeFlow</span>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="transition-all duration-75">{t.common.login}</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 transition-all duration-75">{t.common.signup}</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left duration-100">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary leading-tight">
            {t.landing.heroTitle}
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg">
            {t.landing.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary text-white h-14 px-8 text-lg rounded-full group transition-all duration-75">
                {t.landing.cta}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full transition-all duration-75">
              {t.common.book}
            </Button>
          </div>
          <p className="text-sm font-medium text-muted-foreground italic">
            {t.landing.trust}
          </p>
        </div>
        
        <div className="flex-1 relative animate-in fade-in zoom-in duration-150">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={heroImage?.imageUrl || "https://picsum.photos/seed/bali/800/600"} 
              alt="Bali Indonesia" 
              fill 
              className="object-cover"
              data-ai-hint="indonesia luxury"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">{t.landing.successRate}</p>
                  <p className="text-white/80 text-sm">{t.landing.goldenVisa}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-16">{t.landing.experience}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8" />} 
              title={t.landing.features.command.title} 
              description={t.landing.features.command.desc}
            />
            <FeatureCard 
              icon={<UserCheck className="w-8 h-8" />} 
              title={t.landing.features.manager.title} 
              description={t.landing.features.manager.desc}
            />
            <FeatureCard 
              icon={<CreditCard className="w-8 h-8" />} 
              title={t.landing.features.transfers.title} 
              description={t.landing.features.transfers.desc}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-100 border border-slate-100">
      <div className="text-accent mb-6 bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

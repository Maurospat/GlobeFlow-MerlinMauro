
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palmtree, 
  MapPin, 
  Building, 
  HeartPulse, 
  Users, 
  Utensils, 
  Landmark, 
  Briefcase, 
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Info,
  ShieldCheck
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LifeInIndonesia() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const heroImage = PlaceHolderImages.find(img => img.id === 'life-hero');
  const jakartaImage = PlaceHolderImages.find(img => img.id === 'city-jakarta');
  const baliImage = PlaceHolderImages.find(img => img.id === 'city-bali');
  const surabayaImage = PlaceHolderImages.find(img => img.id === 'city-surabaya');

  const costItems = [
    { label: t.life.costOfLiving.rent.title, chf: t.life.costOfLiving.rent.chf, idr: t.life.costOfLiving.rent.idr },
    { label: t.life.costOfLiving.dining.title, chf: t.life.costOfLiving.dining.chf, idr: t.life.costOfLiving.dining.idr },
    { label: t.life.costOfLiving.transport.title, chf: t.life.costOfLiving.transport.chf, idr: t.life.costOfLiving.transport.idr },
    { label: t.life.costOfLiving.help.title, chf: t.life.costOfLiving.help.chf, idr: t.life.costOfLiving.help.idr },
    { label: t.life.costOfLiving.health.title, chf: t.life.costOfLiving.health.chf, idr: t.life.costOfLiving.health.idr },
  ];

  const cityCards = [
    { title: t.life.cities.jakarta.title, desc: t.life.cities.jakarta.desc, img: jakartaImage },
    { title: t.life.cities.bali.title, desc: t.life.cities.bali.desc, img: baliImage },
    { title: t.life.cities.surabaya.title, desc: t.life.cities.surabaya.desc, img: surabayaImage },
  ];

  const lifestyleItems = [
    { icon: Palmtree, title: t.life.lifestyle.nature.title, desc: t.life.lifestyle.nature.desc },
    { icon: Utensils, title: t.life.lifestyle.food.title, desc: t.life.lifestyle.food.desc },
    { icon: Landmark, title: t.life.lifestyle.culture.title, desc: t.life.lifestyle.culture.desc },
    { icon: Briefcase, title: t.life.lifestyle.business.title, desc: t.life.lifestyle.business.desc },
  ];

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-75">
      {/* Header */}
      <header className="space-y-4">
        <Badge variant="outline" className="text-accent border-accent px-4 py-1 uppercase tracking-widest font-bold">
          {t.nav.life}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary leading-tight">
          {t.life.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {t.life.subtitle}
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{t.life.overview.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.life.overview.text}
          </p>
          <div className="flex gap-4">
            <CheckCircle2 className="text-accent w-6 h-6 shrink-0" />
            <p className="text-sm font-medium">{language === 'de' ? 'Herausragende Lebensqualität' : 'Exceptional quality of life'}</p>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="text-accent w-6 h-6 shrink-0" />
            <p className="text-sm font-medium">{language === 'de' ? 'Weltklasse-Gastfreundschaft' : 'World-class hospitality'}</p>
          </div>
        </div>
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border">
          <Image 
            src={heroImage?.imageUrl || "https://picsum.photos/seed/life/800/600"} 
            alt="Life in Indonesia" 
            fill 
            className="object-cover"
            data-ai-hint="indonesia luxury"
          />
        </div>
      </section>

      {/* Section 2: Cost of Living Comparison */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{t.life.costOfLiving.title}</h2>
          <p className="text-muted-foreground">{t.life.costOfLiving.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {costItems.map((item, i) => (
            <Card key={i} className="border-slate-100 hover:shadow-md transition-all duration-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">{t.life.costOfLiving.switzerland}</p>
                  <p className="text-sm font-medium">{item.chf}</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-xs font-bold text-primary uppercase mb-1">{t.life.costOfLiving.indonesia}</p>
                  <p className="text-sm font-bold text-primary">{item.idr}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-primary text-white md:col-span-2 lg:col-span-1 flex flex-col justify-center p-6 space-y-4">
            <div className="p-3 bg-white/10 rounded-full w-fit">
              <TrendingDown className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold">{language === 'de' ? 'Signifikante Einsparungen' : 'Significant Savings'}</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {t.life.costOfLiving.note}
            </p>
          </Card>
        </div>
      </section>

      {/* Section 3: Best Cities for Expats */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">{t.life.cities.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cityCards.map((city, i) => (
            <Card key={i} className="overflow-hidden border-slate-100 group">
              <div className="relative h-48">
                <Image 
                  src={city.img?.imageUrl || "https://picsum.photos/seed/city/600/400"} 
                  alt={city.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint="indonesia city"
                />
              </div>
              <CardHeader>
                <CardTitle>{city.title}</CardTitle>
                <CardDescription>{city.desc}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full text-primary gap-2 transition-all duration-75">
                  {t.life.cities.learnMore}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 4: Housing */}
      <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{t.life.housing.title}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <Building className="w-6 h-6 text-primary" />
              <span className="font-medium">{t.life.housing.apartments}</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="font-medium">{t.life.housing.villas}</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <Users className="w-6 h-6 text-primary" />
              <span className="font-medium">{t.life.housing.shortTerm}</span>
            </div>
          </div>
        </div>
        <Card className="bg-primary text-white border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Badge variant="outline" className="bg-accent/20 text-accent border-accent/20">NEW</Badge>
              {t.life.housing.partners.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed mb-6">
              {t.life.housing.partners.desc}
            </p>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-75">
              {t.life.housing.partners.button}
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Section 5: Healthcare */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">{t.life.healthcare.title}</h2>
          <p className="text-muted-foreground">{t.life.healthcare.text}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold">{t.life.healthcare.hospitals}</h4>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold">{t.life.healthcare.insurance}</h4>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold">{t.life.healthcare.services}</h4>
          </div>
        </div>
      </section>

      {/* Section 6: Expat Community */}
      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold">{t.life.community.title}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.life.community.text}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[t.life.community.events, t.life.community.business, t.life.community.schools, t.life.community.social].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <Card className="border-accent/30 bg-accent/5 flex flex-col items-center text-center p-8 space-y-4">
          <Users className="w-12 h-12 text-accent" />
          <h3 className="text-xl font-bold text-primary">{t.life.community.network.title}</h3>
          <p className="text-sm text-muted-foreground">
            {t.life.community.network.desc}
          </p>
          <Button variant="outline" className="w-full border-primary text-primary transition-all duration-75">
            {t.common.view}
          </Button>
        </Card>
      </section>

      {/* Section 7: Lifestyle Highlights */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">{t.life.lifestyle.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {lifestyleItems.map((item, i) => (
            <Card key={i} className="text-center p-6 border-slate-100 hover:border-accent/50 transition-all duration-150">
              <item.icon className="w-8 h-8 text-accent mx-auto mb-4" />
              <h4 className="font-bold mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 8: Relocation Tips */}
      <section className="bg-primary/5 rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full md:w-1/3">
            <Lightbulb className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">{t.life.tips.title}</h3>
            <p className="text-sm text-muted-foreground">{language === 'de' ? 'Vorbereitung ist alles.' : 'Preparation is everything.'}</p>
          </div>
          <div className="flex-1 grid sm:grid-cols-2 gap-6">
            {[t.life.tips.visa, t.life.tips.housing, t.life.tips.bank, t.life.tips.community].map((tip, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold text-sm">{i+1}</div>
                <p className="font-medium text-slate-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Call to Action */}
      <section className="text-center space-y-8 py-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-primary">{t.life.cta.title}</h2>
          <p className="text-muted-foreground">{language === 'de' ? 'Ihr neues Kapitel wartet auf Sie.' : 'Your new chapter is waiting for you.'}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/documents">
            <Button size="lg" className="bg-accent text-accent-foreground h-14 px-8 text-lg rounded-xl group transition-all duration-75">
              {t.life.cta.continue}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-slate-200 transition-all duration-75">
              {t.life.cta.dashboard}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

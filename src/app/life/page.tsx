
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
  ShieldCheck, 
  Wallet, 
  Globe, 
  Waves 
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    { id: 'jakarta', ...t.life.cities.jakarta, img: jakartaImage },
    { id: 'bali', ...t.life.cities.bali, img: baliImage },
    { id: 'surabaya', ...t.life.cities.surabaya, img: surabayaImage },
  ];

  const lifestyleItems = [
    { icon: Palmtree, title: t.life.lifestyle.nature.title, desc: t.life.lifestyle.nature.desc },
    { icon: Utensils, title: t.life.lifestyle.food.title, desc: t.life.lifestyle.food.desc },
    { icon: Landmark, title: t.life.lifestyle.culture.title, desc: t.life.lifestyle.culture.desc },
    { icon: Briefcase, title: t.life.lifestyle.business.title, desc: t.life.lifestyle.business.desc },
  ];

  return (
    <div className="space-y-20 pb-24 animate-in fade-in duration-100">
      {/* Header */}
      <header className="space-y-6">
        <Badge variant="outline" className="text-accent border-accent px-6 py-1.5 uppercase tracking-[0.2em] font-black text-[10px] batik-pattern">
          {t.nav.life}
        </Badge>
        <h1 className="text-5xl md:text-7xl font-headline font-black text-primary leading-[1.1] tracking-tighter">
          {t.life.title}
        </h1>
        <p className="text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
          {t.life.subtitle}
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-black tracking-tight">{t.life.overview.title}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            {t.life.overview.text}
          </p>
          <div className="space-y-4">
            <div className="flex gap-5 items-center p-5 rounded-2xl bg-white border border-secondary shadow-sm">
              <div className="p-3 ocean-gradient rounded-xl shadow-lg">
                <CheckCircle2 className="text-accent w-6 h-6 shrink-0" />
              </div>
              <p className="text-lg font-bold text-primary">{language === 'de' ? 'Herausragende Lebensqualität' : 'Exceptional quality of life'}</p>
            </div>
            <div className="flex gap-5 items-center p-5 rounded-2xl bg-white border border-secondary shadow-sm">
              <div className="p-3 ocean-gradient rounded-xl shadow-lg">
                <Waves className="text-accent w-6 h-6 shrink-0" />
              </div>
              <p className="text-lg font-bold text-primary">{language === 'de' ? 'Weltklasse-Gastfreundschaft' : 'World-class hospitality'}</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-8 border-white group">
          <Image 
            src={heroImage?.imageUrl || "https://picsum.photos/seed/life/800/600"} 
            alt="Life in Indonesia" 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-1000"
            data-ai-hint="indonesia luxury"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Section 2: Cost of Living Comparison */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight">{t.life.costOfLiving.title}</h2>
          <p className="text-xl text-muted-foreground font-medium">{t.life.costOfLiving.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {costItems.map((item, i) => (
            <Card key={i} className="glass-card group hover:-translate-y-2 transition-all border-none batik-pattern">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-black">{item.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-5 bg-secondary/40 rounded-2xl border border-secondary">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">{t.life.costOfLiving.switzerland}</p>
                  <p className="text-md font-bold text-primary/80">{item.chf}</p>
                </div>
                <div className="p-5 ocean-gradient rounded-2xl border border-primary/10 shadow-xl">
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">{t.life.costOfLiving.indonesia}</p>
                  <p className="text-lg font-black text-white">{item.idr}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="ocean-gradient text-white md:col-span-2 lg:col-span-1 flex flex-col justify-center p-10 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none">
              <Waves className="w-full h-full text-white" />
            </div>
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl w-fit">
              <TrendingDown className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-3xl font-black tracking-tight">{language === 'de' ? 'Signifikante Einsparungen' : 'Significant Savings'}</h3>
            <p className="text-white/80 text-lg leading-relaxed font-medium">
              {t.life.costOfLiving.note}
            </p>
          </Card>
        </div>
      </section>

      {/* Section 3: Best Cities for Expats */}
      <section className="space-y-12">
        <h2 className="text-4xl font-black tracking-tight text-center">{t.life.cities.title}</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {cityCards.map((city) => (
            <Dialog key={city.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden glass-card group cursor-pointer hover:shadow-2xl border-none">
                  <div className="relative h-60">
                    <Image 
                      src={city.img?.imageUrl || "https://picsum.photos/seed/city/600/400"} 
                      alt={city.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint="indonesia city"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60" />
                  </div>
                  <CardHeader className="p-8">
                    <CardTitle className="text-3xl font-black">{city.title}</CardTitle>
                    <CardDescription className="text-lg line-clamp-2 mt-2 font-medium">{city.desc}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-8 pt-0">
                    <Button variant="ghost" className="w-full text-primary font-black gap-3 h-12 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                      {t.life.cities.learnMore}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-[2rem] border-none batik-pattern">
                <div className="relative h-80 w-full group">
                  <Image 
                    src={city.img?.imageUrl || "https://picsum.photos/seed/city/600/400"} 
                    alt={city.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <h3 className="text-5xl font-black text-white tracking-tighter">{city.title}</h3>
                  </div>
                </div>
                
                <div className="p-10 space-y-8">
                  <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                    {city.full}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-secondary/50 rounded-2xl border border-secondary shadow-sm">
                      <div className="flex items-center gap-3 text-primary font-black mb-3">
                        <Building className="w-5 h-5 text-accent" />
                        {language === 'de' ? 'Wohnen' : 'Housing'}
                      </div>
                      <p className="text-md font-bold text-primary/80">{city.costs.rent}</p>
                    </div>
                    <div className="p-6 bg-secondary/50 rounded-2xl border border-secondary shadow-sm">
                      <div className="flex items-center gap-3 text-primary font-black mb-3">
                        <Utensils className="w-5 h-5 text-accent" />
                        {language === 'de' ? 'Essen' : 'Dining'}
                      </div>
                      <p className="text-md font-bold text-primary/80">{city.costs.meal}</p>
                    </div>
                    <div className="p-6 bg-secondary/50 rounded-2xl border border-secondary shadow-sm">
                      <div className="flex items-center gap-3 text-primary font-black mb-3">
                        {city.id === 'bali' ? <HeartPulse className="w-5 h-5 text-accent" /> : city.id === 'jakarta' ? <Users className="w-5 h-5 text-accent" /> : <Wallet className="w-5 h-5 text-accent" />}
                        {city.id === 'bali' ? (language === 'de' ? 'Wellness' : 'Wellness') : city.id === 'jakarta' ? (language === 'de' ? 'Personal' : 'Staff') : (language === 'de' ? 'Service' : 'Service')}
                      </div>
                      <p className="text-md font-bold text-primary/80">{city.id === 'bali' ? city.costs.wellness : city.id === 'jakarta' ? city.costs.driver : city.costs.services}</p>
                    </div>
                  </div>

                  <div className="p-8 ocean-gradient rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10 pointer-events-none">
                      <Lightbulb className="w-full h-full text-white" />
                    </div>
                    <h4 className="font-black text-accent mb-3 flex items-center gap-3 text-xl uppercase tracking-widest">
                      <Info className="w-6 h-6" />
                      {language === 'de' ? 'Experten-Tipp' : 'Expert Tip'}
                    </h4>
                    <p className="text-lg text-white font-medium italic leading-relaxed">
                      {city.id === 'jakarta' 
                        ? (language === 'de' ? 'Wählen Sie eine Wohnung in Gehweite zu Ihrem Büro, um den Verkehr zu vermeiden.' : 'Choose an apartment within walking distance to your office to bypass peak traffic.') 
                        : city.id === 'bali' 
                          ? (language === 'de' ? 'Mieten Sie erst kurzfristig, um verschiedene Gebiete wie Canggu oder Ubud zu testen.' : 'Rent short-term first to experience different areas like Canggu or Ubud before committing.')
                          : (language === 'de' ? 'Nutzen Sie die exzellenten privaten Krankenhäuser der Stadt für internationale Standards.' : 'Leverage the city\'s excellent private hospitals for international healthcare standards.')}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0 flex justify-end">
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-white font-black px-10 h-12 rounded-xl">{t.common.close}</Button>
                  </DialogTrigger>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* Section 4: Housing */}
      <section className="bg-white rounded-[3rem] p-8 md:p-16 lg:p-20 border border-secondary shadow-xl batik-pattern">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">{t.life.housing.title}</h2>
            <div className="grid gap-4 md:gap-6">
              <div className="flex items-center gap-6 p-6 bg-secondary/30 rounded-3xl border border-secondary group hover:bg-white transition-all cursor-default">
                <div className="p-4 ocean-gradient rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Building className="w-8 h-8 text-accent" />
                </div>
                <span className="text-xl font-black text-primary">{t.life.housing.apartments}</span>
              </div>
              <div className="flex items-center gap-6 p-6 bg-secondary/30 rounded-3xl border border-secondary group hover:bg-white transition-all cursor-default">
                <div className="p-4 ocean-gradient rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Palmtree className="w-8 h-8 text-accent" />
                </div>
                <span className="text-xl font-black text-primary">{t.life.housing.villas}</span>
              </div>
              <div className="flex items-center gap-6 p-6 bg-secondary/30 rounded-3xl border border-secondary group hover:bg-white transition-all cursor-default">
                <div className="p-4 ocean-gradient rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <span className="text-xl font-black text-primary">{t.life.housing.shortTerm}</span>
              </div>
            </div>
          </div>
          <Card className="ocean-gradient text-white border-none shadow-[0_40px_100px_rgba(26,60,69,0.3)] rounded-[2.5rem] relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <Waves className="w-full h-full text-white" />
            </div>
            <CardHeader className="p-8 md:p-12 pb-6 z-10">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge variant="outline" className="bg-accent/20 text-accent border-accent/20 px-4 py-1 font-black shrink-0">NEW</Badge>
                <CardTitle className="text-white text-3xl md:text-4xl font-black tracking-tight">
                  {t.life.housing.partners.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-8 md:px-12 pb-12 z-10 flex flex-col flex-1">
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                {t.life.housing.partners.desc}
              </p>
              <div className="mt-auto">
                <Link href="/life/housing">
                  <Button className="w-full bg-accent text-primary h-16 text-xl font-black rounded-2xl shadow-2xl shadow-accent/20 hover:bg-accent/90 group transition-all">
                    {t.life.housing.partners.button}
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 5: Healthcare */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black tracking-tight">{t.life.healthcare.title}</h2>
          <p className="text-xl text-muted-foreground font-medium">{t.life.healthcare.text}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-10 bg-white rounded-3xl border border-secondary text-center space-y-5 shadow-sm hover:shadow-xl transition-all batik-pattern group">
            <div className="mx-auto w-16 h-16 ocean-gradient rounded-2xl shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <HeartPulse className="w-8 h-8 text-accent" />
            </div>
            <h4 className="font-black text-xl">{t.life.healthcare.hospitals}</h4>
          </div>
          <div className="p-10 bg-white rounded-3xl border border-secondary text-center space-y-5 shadow-sm hover:shadow-xl transition-all batik-pattern group">
            <div className="mx-auto w-16 h-16 ocean-gradient rounded-2xl shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <ShieldCheck className="w-8 h-8 text-accent" />
            </div>
            <h4 className="font-black text-xl">{t.life.healthcare.insurance}</h4>
          </div>
          <div className="p-10 bg-white rounded-3xl border border-secondary text-center space-y-5 shadow-sm hover:shadow-xl transition-all batik-pattern group">
            <div className="mx-auto w-16 h-16 ocean-gradient rounded-2xl shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <h4 className="font-black text-xl">{t.life.healthcare.services}</h4>
          </div>
        </div>
      </section>

      {/* Section 7: Lifestyle Highlights */}
      <section className="space-y-12">
        <h2 className="text-4xl font-black tracking-tight text-center">{t.life.lifestyle.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {lifestyleItems.map((item, i) => (
            <Card key={i} className="text-center p-8 glass-card border-none hover:bg-white transition-all group">
              <div className="p-4 bg-secondary rounded-2xl w-fit mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <item.icon className="w-10 h-10 text-primary group-hover:text-white" />
              </div>
              <h4 className="font-black text-xl mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 8: Relocation Tips */}
      <section className="ocean-gradient rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <Waves className="w-full h-full text-white" />
        </div>
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="bg-white p-10 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] w-full lg:w-1/3 batik-pattern relative z-10">
            <Lightbulb className="w-16 h-16 text-accent mb-6" />
            <h3 className="text-3xl font-black mb-3 tracking-tight">{t.life.tips.title}</h3>
            <p className="text-lg text-muted-foreground font-medium">{language === 'de' ? 'Vorbereitung ist alles.' : 'Preparation is everything.'}</p>
          </div>
          <div className="flex-1 grid sm:grid-cols-2 gap-10">
            {[t.life.tips.visa, t.life.tips.housing, t.life.tips.bank, t.life.tips.community].map((tip, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0 font-black text-lg shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">{i+1}</div>
                <p className="font-bold text-white text-xl leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Call to Action */}
      <section className="text-center space-y-12 py-20 relative overflow-hidden batik-pattern">
        <div className="space-y-6 max-w-3xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-tight">{t.life.cta.title}</h2>
          <p className="text-2xl text-muted-foreground font-medium">{language === 'de' ? 'Ihr neues Kapitel wartet auf Sie.' : 'Your new chapter is waiting for you.'}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-6 px-4">
          <Link href="/documents">
            <Button size="lg" className="bg-primary text-white h-20 px-12 text-2xl font-black rounded-2xl group shadow-2xl shadow-primary/30 transition-all w-full sm:w-auto">
              {t.life.cta.continue}
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform w-8 h-8" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="h-20 px-12 text-2xl font-black rounded-2xl border-secondary border-4 text-primary bg-white hover:bg-secondary transition-all w-full sm:w-auto">
              {t.life.cta.dashboard}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

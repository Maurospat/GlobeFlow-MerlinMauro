
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Search, 
  ArrowLeft,
  ArrowRight,
  Building2,
  Home,
  Waves,
  Star,
  ShieldCheck,
  Maximize2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface Listing {
  id: string;
  title: string;
  city: 'Jakarta' | 'Bali' | 'Surabaya';
  type: 'Apartment' | 'Villa';
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  image: string;
  rating: number;
  tags: string[];
  description: string;
  amenities: string[];
}

export default function HousingSearch() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const listings: Listing[] = [
    {
      id: 'l1',
      title: 'Ocean View Luxury Villa',
      city: 'Bali',
      type: 'Villa',
      price: 3500,
      beds: 4,
      baths: 4,
      sqm: 450,
      image: PlaceHolderImages.find(img => img.id === 'house-1')?.imageUrl || "https://picsum.photos/seed/house1/800/600",
      rating: 4.9,
      tags: ['Private Pool', 'Beachfront'],
      description: 'Experience pure luxury in this breathtaking beachfront villa in Uluwatu. Featuring modern architecture and traditional Balinese touches.',
      amenities: ['Infinty Pool', 'High-Speed Wi-Fi', '24/7 Security', 'Private Chef available']
    },
    {
      id: 'l2',
      title: 'Premium SCBD Penthouse',
      city: 'Jakarta',
      type: 'Apartment',
      price: 4200,
      beds: 3,
      baths: 3,
      sqm: 280,
      image: PlaceHolderImages.find(img => img.id === 'house-2')?.imageUrl || "https://picsum.photos/seed/apt1/800/600",
      rating: 4.8,
      tags: ['CBD Location', 'Concierge'],
      description: 'A masterpiece of urban living in the heart of Jakartas financial district. Unparalleled views and world-class building services.',
      amenities: ['Gym & Spa', 'Executive Lounge', 'Private Parking', 'Concierge Service']
    },
    {
      id: 'l3',
      title: 'Modern Family Residence',
      city: 'Surabaya',
      type: 'Villa',
      price: 1800,
      beds: 5,
      baths: 3,
      sqm: 350,
      image: PlaceHolderImages.find(img => img.id === 'house-3')?.imageUrl || "https://picsum.photos/seed/house/800/600",
      rating: 4.7,
      tags: ['Garden', 'Security'],
      description: 'The perfect family home in a quiet, upscale neighborhood in Surabaya. Spacious interiors and a lush private garden.',
      amenities: ['Large Garden', 'Double Garage', 'Kids Play Area', 'Energy Efficient']
    },
    {
      id: 'l4',
      title: 'Uluwatu Sunset Suite',
      city: 'Bali',
      type: 'Apartment',
      price: 1200,
      beds: 1,
      baths: 1,
      sqm: 85,
      image: 'https://picsum.photos/seed/apt2/800/600',
      rating: 4.9,
      tags: ['Sunset View', 'Eco-friendly'],
      description: 'Boutique apartment living with a focus on sustainability and style. Located just minutes away from Balis world-famous surf breaks.',
      amenities: ['Yoga Deck', 'Sustainable Energy', 'Community Workspace', 'Eco-Cleaning']
    },
    {
      id: 'l5',
      title: 'Mega Kuningan Loft',
      city: 'Jakarta',
      type: 'Apartment',
      price: 2100,
      beds: 2,
      baths: 2,
      sqm: 140,
      image: 'https://picsum.photos/seed/apt3/800/600',
      rating: 4.6,
      tags: ['Balcony', 'Gym Access'],
      description: 'Stylish loft-style living in one of Jakartas most international neighborhoods. Perfect for young professionals and couples.',
      amenities: ['Rooftop Pool', 'Smart Home Tech', 'Bicycle Storage', 'Weekly Maid Service']
    },
    {
      id: 'l6',
      title: 'Canggu Rice Field Retreat',
      city: 'Bali',
      type: 'Villa',
      price: 2800,
      beds: 3,
      baths: 3,
      sqm: 220,
      image: 'https://picsum.photos/seed/villa2/800/600',
      rating: 4.8,
      tags: ['Peaceful', 'Fast Wi-Fi'],
      description: 'Modern minimalist villa surrounded by lush rice fields. A serene escape that remains close to Canggus vibrant cafe culture.',
      amenities: ['Open-air Living', 'Work Studio', 'Garden Pool', 'Fiber-Optic Internet']
    }
  ];

  const filteredListings = listings.filter(l => {
    const matchesCity = filterCity === 'all' || l.city === filterCity;
    const matchesType = filterType === 'all' || l.type === filterType;
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesType && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-150 max-w-7xl mx-auto">
      <Link href="/life" className="inline-flex items-center gap-2 text-sm font-bold text-primary/60 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t.common.back}
      </Link>

      <header className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-headline font-black text-primary tracking-tighter uppercase">
          {t.life.housing.searchTitle}
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-3xl">
          {t.life.housing.searchSubtitle}
        </p>
      </header>

      {/* Filter Section */}
      <Card className="glass-card sticky top-20 z-20 border-none batik-pattern shadow-2xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder={t.common.search + "..."} 
                className="pl-11 bg-white border-secondary h-14 rounded-2xl text-lg font-medium" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger className="bg-white border-secondary h-14 rounded-2xl text-lg font-medium">
                <SelectValue placeholder={t.life.housing.city} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.all} {t.life.housing.city}</SelectItem>
                <SelectItem value="Jakarta">Jakarta</SelectItem>
                <SelectItem value="Bali">Bali</SelectItem>
                <SelectItem value="Surabaya">Surabaya</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-white border-secondary h-14 rounded-2xl text-lg font-medium">
                <SelectValue placeholder={t.life.housing.type} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.all} {t.life.housing.type}</SelectItem>
                <SelectItem value="Apartment">{t.life.housing.apartments}</SelectItem>
                <SelectItem value="Villa">{t.life.housing.villas}</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-primary hover:bg-primary/90 h-14 text-white text-lg font-black rounded-2xl gap-3 shadow-xl">
              <Maximize2 className="w-5 h-5" />
              {t.common.filter}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredListings.map((listing) => (
          <Dialog key={listing.id}>
            <Card className="overflow-hidden border-none glass-card group hover:shadow-[0_32px_64px_-12px_rgba(26,60,69,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden shrink-0">
                <Image 
                  src={listing.image} 
                  alt={listing.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <Badge className="bg-white/95 text-primary backdrop-blur-md border-none shadow-lg px-4 py-1.5 font-black text-[10px] uppercase tracking-widest">
                    {listing.type === 'Apartment' ? <Building2 className="w-3 h-3 mr-2 text-accent" /> : <Home className="w-3 h-3 mr-2 text-accent" />}
                    {listing.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-accent text-primary border-none shadow-lg flex items-center gap-1.5 px-3 py-1.5 font-black">
                    <Star className="w-3 h-3 fill-current" />
                    {listing.rating}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Content Area */}
              <CardHeader className="p-8 pb-4 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-[0.2em]">
                  <MapPin className="w-3 h-3" />
                  {listing.city}
                </div>
                <CardTitle className="text-2xl font-black text-primary leading-tight h-16 line-clamp-2 group-hover:text-accent transition-colors">
                  {listing.title}
                </CardTitle>
                <div className="flex items-center gap-6 pt-2 text-xs font-bold text-muted-foreground border-b border-secondary/50 pb-6">
                  <span className="flex items-center gap-2"><Bed className="w-4 h-4 text-accent" /> {listing.beds} {t.life.housing.bed}</span>
                  <span className="flex items-center gap-2"><Bath className="w-4 h-4 text-accent" /> {listing.baths} {t.life.housing.bath}</span>
                  <span className="flex items-center gap-2"><Waves className="w-4 h-4 text-accent" /> {listing.sqm} m²</span>
                </div>
              </CardHeader>

              {/* Footer Area */}
              <CardFooter className="p-8 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-auto">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary tracking-tighter">${listing.price.toLocaleString()}</span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                    {language === 'de' ? 'pro Monat' : 'per month'}
                  </span>
                </div>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black h-14 px-10 rounded-2xl shadow-2xl shadow-primary/10 group transition-all">
                    {t.common.view}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </DialogTrigger>
              </CardFooter>

              {/* Detailed View Modal Content */}
              <DialogContent className="max-w-4xl p-0 rounded-[2.5rem] border-none overflow-hidden bg-white">
                <DialogHeader className="sr-only">
                  <DialogTitle>{listing.title}</DialogTitle>
                  <DialogDescription>{listing.description}</DialogDescription>
                </DialogHeader>

                <div className="grid md:grid-cols-2 h-full">
                  {/* Left: Hero Image */}
                  <div className="relative h-full min-h-[400px]">
                    <Image 
                      src={listing.image} 
                      alt={listing.title} 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10 space-y-4">
                      <Badge className="bg-accent text-primary font-black uppercase tracking-widest text-[10px] px-4 py-1.5 border-none shadow-lg">Premium Listing</Badge>
                      <h3 className="text-4xl font-black text-white tracking-tighter leading-tight">{listing.title}</h3>
                    </div>
                  </div>

                  {/* Right: Info Area */}
                  <div className="p-10 space-y-8 max-h-[90vh] overflow-y-auto no-scrollbar bg-white">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-3">
                        <Badge className="status-badge-neutral font-black px-4 py-1.5 text-[10px] uppercase tracking-widest border-none">{listing.city}</Badge>
                        <Badge className="bg-emerald-500 text-white font-black px-4 py-1.5 text-[10px] uppercase tracking-widest border-none shadow-sm">Verified Partner</Badge>
                      </div>
                      <p className="text-xl text-primary font-semibold leading-relaxed italic">
                        "{listing.description}"
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-6 bg-secondary/50 rounded-3xl border border-secondary/50 text-center space-y-2">
                        <Bed className="w-6 h-6 text-accent mx-auto" />
                        <p className="text-sm font-black text-primary uppercase tracking-tight">{listing.beds} {t.life.housing.bed}</p>
                      </div>
                      <div className="p-6 bg-secondary/50 rounded-3xl border border-secondary/50 text-center space-y-2">
                        <Bath className="w-6 h-6 text-accent mx-auto" />
                        <p className="text-sm font-black text-primary uppercase tracking-tight">{listing.baths} {t.life.housing.bath}</p>
                      </div>
                      <div className="p-6 bg-secondary/50 rounded-3xl border border-secondary/50 text-center space-y-2">
                        <Waves className="w-6 h-6 text-accent mx-auto" />
                        <p className="text-sm font-black text-primary uppercase tracking-tight">{listing.sqm} m²</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{language === 'de' ? 'AUSSTATTUNG' : 'AMENITIES'}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {listing.amenities.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <span className="font-bold text-primary text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Footer in Modal */}
                    <div className="p-8 ocean-gradient rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden mt-8">
                      <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10 pointer-events-none">
                        <Info className="w-full h-full text-white" />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{language === 'de' ? 'Gesamtpreis' : 'Total Price'}</p>
                          <p className="text-4xl font-black text-white tracking-tighter">${listing.price.toLocaleString()}</p>
                          <p className="text-xs text-white/60 font-medium">{language === 'de' ? 'Keine versteckten Gebühren' : 'No hidden fees'}</p>
                        </div>
                        <DialogClose asChild>
                           <Button className="w-full sm:w-auto bg-accent text-primary h-14 px-8 text-lg font-black rounded-2xl shadow-2xl shadow-accent/20 hover:bg-accent/90 border-none">
                             {language === 'de' ? 'Besichtigung anfragen' : 'Request Viewing'}
                           </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Card>
          </Dialog>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <Card className="glass-card border-none batik-pattern py-32 text-center shadow-2xl">
          <CardContent className="space-y-8">
            <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Search className="w-16 h-16 text-primary/20" />
            </div>
            <div className="space-y-3">
              <h3 className="text-4xl font-black text-primary tracking-tighter">
                {language === 'de' ? 'Keine Ergebnisse' : 'No properties found'}
              </h3>
              <p className="text-xl text-muted-foreground max-w-md mx-auto font-medium leading-relaxed">
                {language === 'de' 
                  ? 'Leider konnten wir keine Immobilien finden, die Ihren Kriterien entsprechen.' 
                  : 'We couldn\'t find any properties matching your current filters.'}
              </p>
            </div>
            <Button 
              size="lg"
              variant="outline" 
              className="h-16 px-12 border-secondary border-2 text-lg font-black rounded-2xl hover:bg-secondary transition-all" 
              onClick={() => { setFilterCity('all'); setFilterType('all'); setSearchQuery(''); }}
            >
              {language === 'de' ? 'Alle Filter zurücksetzen' : 'Reset all Filters'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Trust Banner - VERTICAL STACKED VERSION */}
      <section className="ocean-gradient rounded-[3rem] p-12 md:p-24 shadow-[0_40px_100px_rgba(26,60,69,0.3)] relative overflow-hidden text-center flex flex-col items-center gap-14 mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4">
          <Waves className="w-full h-full text-white" />
        </div>
        <div className="space-y-8 relative z-10 max-w-4xl">
          <div className="flex flex-col items-center gap-6">
             <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center border border-white/20 shadow-2xl group hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-12 h-12 text-accent" />
             </div>
             <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight uppercase">
               {t.life.housing.partners.title}
             </h3>
          </div>
          <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-medium">
            {t.life.housing.partners.desc}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 w-full max-w-2xl">
          <div className="p-10 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex flex-col items-center gap-6 border border-white/10 shadow-2xl group hover:bg-white/15 transition-all">
            <div className="p-5 bg-accent/20 rounded-2xl">
              <ShieldCheck className="w-10 h-10 text-accent" />
            </div>
            <span className="text-xs font-black text-white uppercase tracking-[0.3em]">{language === 'de' ? 'Global Verifiziert' : 'Globally Verified'}</span>
          </div>
          <div className="p-10 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex flex-col items-center gap-6 border border-white/10 shadow-2xl group hover:bg-white/15 transition-all">
            <div className="p-5 bg-accent/20 rounded-2xl">
              <Star className="w-10 h-10 text-accent fill-current" />
            </div>
            <span className="text-xs font-black text-white uppercase tracking-[0.3em]">{language === 'de' ? 'Exklusive Portfolios' : 'Exclusive Portfolios'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

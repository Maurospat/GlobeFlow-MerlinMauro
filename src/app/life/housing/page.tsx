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
  Building2,
  Home,
  Waves,
  Star,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
      tags: ['Private Pool', 'Beachfront']
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
      tags: ['CBD Location', 'Concierge']
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
      image: PlaceHolderImages.find(img => img.id === 'house-3')?.imageUrl || "https://picsum.photos/seed/house3/800/600",
      rating: 4.7,
      tags: ['Garden', 'Security']
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
      tags: ['Sunset View', 'Eco-friendly']
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
      tags: ['Balcony', 'Gym Access']
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
      tags: ['Peaceful', 'Fast Wi-Fi']
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
    <div className="space-y-8 pb-20 animate-in fade-in duration-100 max-w-7xl mx-auto">
      <Link href="/life" className="inline-flex items-center gap-2 text-sm font-bold text-primary/60 hover:text-primary transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" />
        {t.common.back}
      </Link>

      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-headline font-black text-primary tracking-tighter">
          {t.life.housing.searchTitle}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl">
          {t.life.housing.searchSubtitle}
        </p>
      </header>

      {/* Filter Section */}
      <Card className="glass-card sticky top-20 z-20 border-none batik-pattern">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder={t.common.search + "..."} 
                className="pl-9 bg-white border-secondary h-11" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger className="bg-white border-secondary h-11">
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
              <SelectTrigger className="bg-white border-secondary h-11">
                <SelectValue placeholder={t.life.housing.type} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.all} {t.life.housing.type}</SelectItem>
                <SelectItem value="Apartment">{t.life.housing.apartments}</SelectItem>
                <SelectItem value="Villa">{t.life.housing.villas}</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-primary hover:bg-primary/90 h-11 text-white font-bold gap-2">
              <Maximize2 className="w-4 h-4" />
              {t.common.filter}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden border-none glass-card group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="relative h-72 w-full overflow-hidden">
              {listing.image ? (
                <Image 
                  src={listing.image} 
                  alt={listing.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-secondary animate-pulse" />
              )}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-white/95 text-primary hover:bg-white backdrop-blur-md border-none shadow-lg px-3 py-1 font-bold">
                  {listing.type === 'Apartment' ? <Building2 className="w-3 h-3 mr-1.5" /> : <Home className="w-3 h-3 mr-1.5" />}
                  {listing.type}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-accent text-primary border-none shadow-lg flex items-center gap-1.5 px-3 py-1 font-black">
                  <Star className="w-3 h-3 fill-current" />
                  {listing.rating}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <CardHeader className="flex-1 p-6 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest batik-pattern bg-primary/5 w-fit px-2 py-0.5 rounded">
                <MapPin className="w-3 h-3" />
                {listing.city}
              </div>
              <CardTitle className="text-2xl font-black text-primary leading-tight group-hover:text-accent transition-colors">{listing.title}</CardTitle>
              <div className="flex items-center gap-5 pt-2 text-sm font-bold text-muted-foreground">
                <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-primary/40" /> {listing.beds} {t.life.housing.bed}</span>
                <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-primary/40" /> {listing.baths} {t.life.housing.bath}</span>
                <span className="flex items-center gap-1.5"><Waves className="w-4 h-4 text-primary/40" /> {listing.sqm} m²</span>
              </div>
            </CardHeader>

            <CardFooter className="border-t border-secondary/50 p-6 flex items-center justify-between bg-white/50">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary">${listing.price.toLocaleString()}</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter leading-none">{language === 'de' ? 'pro Monat' : 'per month'}</span>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-primary/10 group">
                {t.common.view}
                <ArrowLeft className="ml-2 w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <Card className="glass-card border-none batik-pattern py-20">
          <CardContent className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-primary/30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-primary tracking-tighter">{language === 'de' ? 'Keine Ergebnisse' : 'No results found'}</h3>
              <p className="text-muted-foreground max-w-md mx-auto font-medium">
                {language === 'de' 
                  ? 'Leider konnten wir keine Immobilien finden, die Ihren Kriterien entsprechen.' 
                  : 'We couldn\'t find any properties matching your criteria.'}
              </p>
            </div>
            <Button variant="outline" className="h-12 px-8 border-secondary font-bold rounded-xl" onClick={() => { setFilterCity('all'); setFilterType('all'); setSearchQuery(''); }}>
              {language === 'de' ? 'Filter zurücksetzen' : 'Reset Filters'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Trust Banner */}
      <section className="ocean-gradient rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 mt-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
          <Waves className="w-full h-full text-white" />
        </div>
        <div className="flex-1 space-y-6 relative z-10">
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">{t.life.housing.partners.title}</h3>
          <p className="text-white/80 text-lg leading-relaxed font-medium max-w-2xl">
            {t.life.housing.partners.desc}
          </p>
        </div>
        <div className="shrink-0 flex gap-6 relative z-10">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl flex flex-col items-center gap-3 border border-white/20 shadow-xl group hover:bg-white/20 transition-all">
            <ShieldCheck className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{language === 'de' ? 'Verifiziert' : 'Verified'}</span>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl flex flex-col items-center gap-3 border border-white/20 shadow-xl group hover:bg-white/20 transition-all">
            <Star className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{language === 'de' ? 'Premium' : 'Premium'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

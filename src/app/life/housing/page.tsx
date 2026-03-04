
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
  Star
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
      image: PlaceHolderImages.find(img => img.id === 'house-1')?.imageUrl || '',
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
      image: PlaceHolderImages.find(img => img.id === 'house-2')?.imageUrl || '',
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
      image: PlaceHolderImages.find(img => img.id === 'house-3')?.imageUrl || '',
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
      image: 'https://picsum.photos/seed/apt1/800/600',
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
      image: 'https://picsum.photos/seed/apt2/800/600',
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
    <div className="space-y-8 pb-20 animate-in fade-in duration-100">
      <Link href="/life" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t.common.back}
      </Link>

      <header className="space-y-4">
        <h1 className="text-4xl font-headline font-extrabold text-primary">
          {t.life.housing.searchTitle}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t.life.housing.searchSubtitle}
        </p>
      </header>

      {/* Filter Section */}
      <Card className="glass-card sticky top-20 z-10">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder={t.common.search + "..."} 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger>
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
              <SelectTrigger>
                <SelectValue placeholder={t.life.housing.type} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.all} {t.life.housing.type}</SelectItem>
                <SelectItem value="Apartment">{t.life.housing.apartments}</SelectItem>
                <SelectItem value="Villa">{t.life.housing.villas}</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-primary hover:bg-primary/90 gap-2">
              {t.common.filter}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden border-slate-100 group hover:shadow-xl transition-all duration-150 flex flex-col">
            <div className="relative h-64">
              <Image 
                src={listing.image} 
                alt={listing.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="luxury property"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-primary hover:bg-white/100 backdrop-blur-sm border-none shadow-sm">
                  {listing.type === 'Apartment' ? <Building2 className="w-3 h-3 mr-1" /> : <Home className="w-3 h-3 mr-1" />}
                  {listing.type}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm border-none shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {listing.rating}
                </Badge>
              </div>
            </div>
            <CardHeader className="flex-1">
              <div className="flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider mb-2">
                <MapPin className="w-3 h-3" />
                {listing.city}
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{listing.title}</CardTitle>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {listing.beds} {t.life.housing.bed}</span>
                <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {listing.baths} {t.life.housing.bath}</span>
                <span className="flex items-center gap-1"><Waves className="w-4 h-4" /> {listing.sqm} m²</span>
              </div>
            </CardHeader>
            <CardFooter className="border-t bg-slate-50/50 p-4 flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary">${listing.price.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground ml-1">/ {language === 'de' ? 'Monat' : 'month'}</span>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all duration-75">
                {t.common.view}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-primary">{language === 'de' ? 'Keine Ergebnisse gefunden' : 'No results found'}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {language === 'de' 
              ? 'Leider konnten wir keine Immobilien finden, die Ihren Kriterien entsprechen. Versuchen Sie es mit anderen Filtern.' 
              : 'We couldn\'t find any properties matching your criteria. Try adjusting your filters or search query.'}
          </p>
          <Button variant="outline" onClick={() => { setFilterCity('all'); setFilterType('all'); setSearchQuery(''); }}>
            {language === 'de' ? 'Filter zurücksetzen' : 'Reset Filters'}
          </Button>
        </div>
      )}

      {/* Trust Banner */}
      <section className="bg-primary text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 mt-12">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold">{t.life.housing.partners.title}</h3>
          <p className="text-white/80 leading-relaxed">
            {t.life.housing.partners.desc}
          </p>
        </div>
        <div className="shrink-0 flex gap-4">
          <div className="p-4 bg-white/10 rounded-2xl flex flex-col items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-accent" />
            <span className="text-xs font-bold uppercase">{language === 'de' ? 'Verifiziert' : 'Verified'}</span>
          </div>
          <div className="p-4 bg-white/10 rounded-2xl flex flex-col items-center gap-2">
            <Star className="w-8 h-8 text-accent" />
            <span className="text-xs font-bold uppercase">{language === 'de' ? 'Premium' : 'Premium'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

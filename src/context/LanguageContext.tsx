import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.shop': { en: 'Shop', bn: 'শপ' },
  'nav.newArrivals': { en: 'New Arrivals', bn: 'নতুন কালেকশন' },
  'nav.men': { en: 'Men', bn: 'পুরুষ' },
  'nav.collections': { en: 'Collections', bn: 'কালেকশন' },
  'nav.offers': { en: 'Offers', bn: 'অফার' },
  
  // Announcement
  'announcement': { 
    en: 'Free Delivery on orders over ৳2000 | Code: FREESHIP', 
    bn: '৳২০০০ এর বেশি অর্ডারে ফ্রি ডেলিভারি | কোড: FREESHIP' 
  },
  
  // Hero
  'hero.badge': { en: 'New Summer Collection is here.', bn: 'নতুন সামার কালেকশন এসে গেছে।' },
  'hero.readMore': { en: 'Read more', bn: 'আরও জানুন' },
  'hero.title': { en: 'Everyday Style.\nBetter Quality.', bn: 'প্রতিদিনের স্টাইল।\nউন্নত মান।' },
  'hero.subtitle': { 
    en: 'Discover premium men\'s fashion. Designed for the modern man who values comfort, durability, and a clean aesthetic.', 
    bn: 'প্রিমিয়াম পুরুষদের ফ্যাশন আবিষ্কার করুন। আরাম, স্থায়িত্ব এবং সুন্দর ডিজাইনের আধুনিক পুরুষদের জন্য তৈরি।' 
  },
  'hero.shopNow': { en: 'SHOP NOW', bn: 'এখনই কিনুন' },
  'hero.explore': { en: 'Explore Collections', bn: 'কালেকশন দেখুন' },
  
  // Sections
  'section.categories': { en: 'Shop by Category', bn: 'ক্যাটাগরি অনুযায়ী শপিং' },
  'section.newArrivals': { en: 'New Arrivals', bn: 'নতুন কালেকশন' },
  'section.bestSellers': { en: 'Best Sellers', bn: 'বেস্ট সেলার' },
  'section.reviews': { en: 'What Our Customers Say', bn: 'আমাদের গ্রাহকরা কী বলেন' },
  'section.shopCollection': { en: 'Shop the collection', bn: 'কালেকশন শপ করুন' },
  
  // Categories
  'cat.Jeans': { en: 'Jeans', bn: 'জিন্স' },
  'cat.Shirts': { en: 'Shirts', bn: 'শার্ট' },
  'cat.T-Shirts': { en: 'T-Shirts', bn: 'টি-শার্ট' },
  
  // Cart & Misc
  'cart.empty': { en: 'Your Cart is Empty', bn: 'আপনার কার্ট খালি' },
  'btn.shop': { en: 'Shop', bn: 'শপ' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

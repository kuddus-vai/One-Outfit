import { Product } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'premium-semi-baggy-jeans',
    name: 'Vintage Wash Semi-Baggy Denim',
    nameBn: 'ভিন্টেজ ওয়াশ সেমি ব্যাগি জিন্স',
    description: 'Our signature silhouette. Heavyweight 14.5oz loomed denim with a relaxed thigh and gentle taper down to the ankle. Designed specifically for clean sneaker stacking without heel drag.',
    descriptionBn: 'আমাদের সিগনেচার সেমি-ব্যাগি জিন্স। ১৪.৫ আউন্স প্রিমিয়াম হেভি ডেনিম দিয়ে তৈরি। আরামদায়ক এবং প্রতিটি স্নিকার্সের সাথে দুর্দান্ত ফিট।',
    category: 'Jeans',
    categoryBn: 'জিন্স',
    price: 1450,
    salePrice: 1150,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    isSale: true,
    isBestSeller: true,
    fit: 'Semi-Baggy Relaxed',
    fabric: '14.5oz Ring-Spun Cotton Denim',
    color: 'Light Vintage Indigo',
    colorHex: '#6b8ca6',
    sku: 'OO-DNM-001',
    rating: 4.9,
    reviewCount: 142,
    stockLeft: 4,
    sizeChart: [
      { size: '28', waist: '28-29"', length: '39"', thigh: '24"' },
      { size: '30', waist: '30-31"', length: '40"', thigh: '25"' },
      { size: '32', waist: '32-33"', length: '41"', thigh: '26"' },
      { size: '34', waist: '34-35"', length: '42"', thigh: '27"' },
      { size: '36', waist: '36-37"', length: '42.5"', thigh: '28"' },
    ]
  },
  {
    id: 'p2',
    slug: 'urban-charcoal-denim',
    name: 'Raw Charcoal Overdye Jeans',
    nameBn: 'র চারকোল ওভারডাই ডেনিম',
    description: 'Deep mineral-washed charcoal denim tailored with reinforced Japanese-grade rivets and clean matte black hardware. Ideal for modern minimal streetwear.',
    descriptionBn: 'আকর্ষণীয় চারকোল ফিনিশের টেকসই ডেনিম। যেকোনো ক্যাজুয়াল বা পার্টি ওয়্যারে মানানসই।',
    category: 'Jeans',
    categoryBn: 'জিন্স',
    price: 1550,
    salePrice: 1250,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['30', '32', '34', '36'],
    isNew: true,
    fit: 'Relaxed Straight',
    fabric: '100% Heavy Twill Cotton',
    color: 'Smoky Charcoal',
    colorHex: '#333338',
    sku: 'OO-DNM-002',
    rating: 4.8,
    reviewCount: 96,
    stockLeft: 7,
    sizeChart: [
      { size: '30', waist: '30-31"', length: '40"', thigh: '25"' },
      { size: '32', waist: '32-33"', length: '41"', thigh: '26"' },
      { size: '34', waist: '34-35"', length: '42"', thigh: '27"' },
      { size: '36', waist: '36-37"', length: '42.5"', thigh: '28"' },
    ]
  },
  {
    id: 'p3',
    slug: 'box-cut-heavyweight-tee',
    name: '260 GSM Boxy Drop-Shoulder Tee',
    nameBn: '২৬০ জিএসএম বক্সি ড্রপ-শোল্ডার টি-শার্ট',
    description: 'Crafted from ultra-dense 260 GSM combed compact cotton. Features a thick 1.25" ribbed collar that retains its shape wash after wash. Seamless dropped shoulder construction.',
    descriptionBn: '২৬০ জিএসএম প্রিমিয়াম হেভিওয়েট কটন। কলার কখনো লুজ বা স্ট্রেচ হবে না। প্রিমিয়াম ড্রপ শোল্ডার লুক।',
    category: 'T-Shirts',
    categoryBn: 'টি-শার্ট',
    price: 650,
    salePrice: 520,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isSale: true,
    isBestSeller: true,
    fit: 'Boxy Drop-Shoulder',
    fabric: '260 GSM 100% Combed Cotton',
    color: 'Chalk White',
    colorHex: '#f5f5f3',
    sku: 'OO-TEE-003',
    rating: 4.9,
    reviewCount: 218,
    stockLeft: 12,
    sizeChart: [
      { size: 'M', chest: '42"', length: '28"', shoulder: '21"' },
      { size: 'L', chest: '44"', length: '29"', shoulder: '22"' },
      { size: 'XL', chest: '46"', length: '30"', shoulder: '23"' },
      { size: 'XXL', chest: '48"', length: '31"', shoulder: '24"' }
    ]
  },
  {
    id: 'p4',
    slug: 'classic-casual-shirt',
    name: 'Oxford Structured Resort Shirt',
    nameBn: 'অক্সফোর্ড স্ট্রাকচার্ড রিসোর্ট শার্ট',
    description: 'Textured breathable linen-cotton blend. Designed for the Dhaka tropical climate, offering structured collar presence with effortless daily comfort.',
    descriptionBn: 'স্মার্ট এবং আরামদায়ক ব্রিদেবল কটন-লিনেন ক্যাজুয়াল শার্ট। অফিস ও হ্যাংআউটের জন্য পারফেক্ট।',
    category: 'Shirts',
    categoryBn: 'শার্ট',
    price: 1350,
    salePrice: 1090,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['M', 'L', 'XL'],
    isSale: true,
    fit: 'Modern Regular Fit',
    fabric: 'Linen Cotton Blend',
    color: 'Sand Beige',
    colorHex: '#e2d5c3',
    sku: 'OO-SHT-004',
    rating: 4.7,
    reviewCount: 64,
    stockLeft: 6,
    sizeChart: [
      { size: 'M', chest: '40"', length: '29"', shoulder: '18"' },
      { size: 'L', chest: '42"', length: '30"', shoulder: '18.5"' },
      { size: 'XL', chest: '44"', length: '31"', shoulder: '19"' }
    ]
  },
  {
    id: 'p5',
    slug: 'heavyweight-black-street-tee',
    name: 'Nocturnal Black Heavyweight Tee',
    nameBn: 'নকটারনাল ব্ল্যাক হেভিওয়েট টি-শার্ট',
    description: 'Jet black pigment-dyed tee featuring reinforced seams and zero side twisting. Softened with enzyme wash for an instant broken-in premium drape.',
    descriptionBn: 'জেট ব্ল্যাক প্রিমিয়াম ফ্যাব্রিক। কালার ফেড প্রতিরোধী এবং অত্যন্ত আরামদায়ক ড্রপ কাট।',
    category: 'T-Shirts',
    categoryBn: 'টি-শার্ট',
    price: 650,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    fit: 'Oversized Streetwear',
    fabric: '260 GSM Ring-Spun Cotton',
    color: 'Pitch Black',
    colorHex: '#141416',
    sku: 'OO-TEE-005',
    rating: 5.0,
    reviewCount: 189,
    stockLeft: 3,
    sizeChart: [
      { size: 'M', chest: '42"', length: '28"', shoulder: '21"' },
      { size: 'L', chest: '44"', length: '29"', shoulder: '22"' },
      { size: 'XL', chest: '46"', length: '30"', shoulder: '23"' },
      { size: 'XXL', chest: '48"', length: '31"', shoulder: '24"' }
    ]
  },
  {
    id: 'p6',
    slug: 'modern-knit-polo',
    name: 'Minimal Ribbed Milan Knit Polo',
    nameBn: 'মডার্ন মিলান নিট পোলো',
    description: 'Elevated sweater-knit texture with a relaxed open Johnny collar. A refined masculine staple that bridges resort ease and tailored luxury.',
    descriptionBn: 'সোফিস্টিকেটেড নিট টেক্সচার কলার পোলো। প্রিমিয়াম পার্টি লুকের জন্য পারফেক্ট।',
    category: 'Polo',
    categoryBn: 'পোলো',
    price: 850,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    fit: 'Athletic Slim-Straight',
    fabric: 'Cotton-Modal Knit Blend',
    color: 'Steel Olive',
    colorHex: '#525a50',
    sku: 'OO-PLO-006',
    rating: 4.8,
    reviewCount: 47,
    stockLeft: 8,
    sizeChart: [
      { size: 'M', chest: '40"', length: '28"', shoulder: '17.5"' },
      { size: 'L', chest: '42"', length: '29"', shoulder: '18.5"' },
      { size: 'XL', chest: '44"', length: '30"', shoulder: '19.5"' }
    ]
  },
  {
    id: 'p7',
    slug: 'black-signature-panjabi',
    name: 'Obsidian Minimalist Cut Panjabi',
    nameBn: 'অবসিডিয়ান মিনিমালিস্ট পাঞ্জাবি',
    description: 'Modernized traditional silhouette crafted with tailored band collar, hidden placket, and brushed metal snap buttons. Unmatched silhouette sharpness.',
    descriptionBn: 'আধুনিক কাট এবং নিখুঁত ফিনিশিংয়ের ব্ল্যাক পাঞ্জাবি। যেকোনো উৎসব বা জুমার নামাজের জন্য অনবদ্য।',
    category: 'Panjabi',
    categoryBn: 'পাঞ্জাবি',
    price: 1850,
    salePrice: 1550,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['40', '42', '44'],
    isSale: true,
    fit: 'Tailored Slim Traditional',
    fabric: 'Fine Pima Cotton Twill',
    color: 'Midnight Obsidian',
    colorHex: '#0d0d0f',
    sku: 'OO-PAN-007',
    rating: 4.9,
    reviewCount: 78,
    stockLeft: 5,
    sizeChart: [
      { size: '40', chest: '42"', length: '40"', shoulder: '18"' },
      { size: '42', chest: '44"', length: '42"', shoulder: '19"' },
      { size: '44', chest: '46"', length: '44"', shoulder: '20"' }
    ]
  },
  {
    id: 'p8',
    slug: 'navy-check-casual-wear',
    name: 'Overdyed Navy Flannel Overshirt',
    nameBn: 'নেভি ওভারডাইড চেক ওভারশার্ট',
    description: 'Heavyweight brushed cotton flannel designed for effortless layering over plain tees. Dual chest utility pockets and horn buttons.',
    descriptionBn: 'উচ্চমানের ব্রাশড কটন ওভারশার্ট। টি-শার্টের ওপর জ্যাকেট হিসেবে পরার জন্য অত্যন্ত স্টাইলিশ।',
    category: 'Casual Wear',
    categoryBn: 'ক্যাজুয়াল ওয়্যার',
    price: 1250,
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000'
    ],
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    fit: 'Relaxed Layering Fit',
    fabric: '100% Brushed Cotton Flannel',
    color: 'Deep Navy Check',
    colorHex: '#1e293b',
    sku: 'OO-OVR-008',
    rating: 4.7,
    reviewCount: 52,
    stockLeft: 9,
    sizeChart: [
      { size: 'M', chest: '42"', length: '29"', shoulder: '19"' },
      { size: 'L', chest: '44"', length: '30"', shoulder: '20"' },
      { size: 'XL', chest: '46"', length: '31"', shoulder: '21"' }
    ]
  }
];

export const newArrivals = products.filter((p) => p.isNew || p.id === 'p1' || p.id === 'p3');
export const bestSellers = products.filter((p) => p.isBestSeller || p.salePrice || p.id === 'p1');

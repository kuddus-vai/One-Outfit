import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

import { SizeChartRow } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
  customRows?: SizeChartRow[];
}

export function SizeGuideModal({ isOpen, onClose, category = 'Jeans', customRows }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const isJeans = category.toLowerCase().includes('jean') || category.toLowerCase().includes('denim');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-neutral-100 rounded-full text-black">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wide text-neutral-950">
              One Outfit Size Guide
            </h3>
            <p className="text-xs text-neutral-500 uppercase tracking-wider">
              {isJeans ? "Men's Denim & Pants Sizing" : "Men's Tops & Shirts Sizing"}
            </p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex bg-neutral-100 p-1 rounded-md text-xs font-semibold">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded transition-colors ${unit === 'in' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'}`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded transition-colors ${unit === 'cm' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'}`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-md">
          {isJeans ? (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-neutral-900 text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Length</th>
                  <th className="py-3 px-4">Thigh</th>
                  <th className="py-3 px-4">Ankle Opening</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-mono">
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">28</td>
                  <td className="py-3 px-4">{unit === 'in' ? '28 - 29"' : '71 - 74 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '39.5"' : '100 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '24"' : '61 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '18"' : '46 cm'}</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">30</td>
                  <td className="py-3 px-4">{unit === 'in' ? '30 - 31"' : '76 - 79 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '40.5"' : '103 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '25"' : '63 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '18.5"' : '47 cm'}</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">32</td>
                  <td className="py-3 px-4">{unit === 'in' ? '32 - 33"' : '81 - 84 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '41.5"' : '105 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '26"' : '66 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '19"' : '48 cm'}</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">34</td>
                  <td className="py-3 px-4">{unit === 'in' ? '34 - 35"' : '86 - 89 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '42.5"' : '108 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '27"' : '68 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '19.5"' : '49 cm'}</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">36</td>
                  <td className="py-3 px-4">{unit === 'in' ? '36 - 37"' : '91 - 94 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '43.0"' : '109 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '28"' : '71 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '20"' : '51 cm'}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-neutral-900 text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Chest</th>
                  <th className="py-3 px-4">Length</th>
                  <th className="py-3 px-4">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-mono">
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">M</td>
                  <td className="py-3 px-4">{unit === 'in' ? '42"' : '106 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '28"' : '71 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '20.5"' : '52 cm'}</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">L</td>
                  <td className="py-3 px-4">{unit === 'in' ? '44"' : '112 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '29"' : '73 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '21.5"' : '54 cm'}</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">XL</td>
                  <td className="py-3 px-4">{unit === 'in' ? '46"' : '117 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '30"' : '76 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '22.5"' : '57 cm'}</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="py-3 px-4 font-bold font-sans">XXL</td>
                  <td className="py-3 px-4">{unit === 'in' ? '48"' : '122 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '31"' : '79 cm'}</td>
                  <td className="py-3 px-4">{unit === 'in' ? '23.5"' : '60 cm'}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Advice Tip */}
        <div className="mt-5 p-3.5 bg-neutral-50 border border-neutral-200 rounded-md text-xs text-neutral-600 space-y-1">
          <p className="font-semibold text-neutral-900">💡 Fit Recommendation:</p>
          <p>
            {isJeans 
              ? 'Our denim is pre-washed and will not shrink. If you prefer a loose relaxed baggy look, choose your true waist size. For a tighter waist fit, size down one inch.'
              : 'Our tees and shirts have a contemporary relaxed boxy drape. Stick to your usual size for the intended streetwear fit.'}
          </p>
          <p className="text-[11px] text-neutral-500 pt-1">
            Need personal guidance? Chat with our Dhaka sizing team via WhatsApp anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

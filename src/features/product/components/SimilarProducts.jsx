import React, { useEffect, useState } from 'react';
import ProductCard from '../../search/components/ProductCard';
import { productService } from '../services/productService';
import { useLocationStore } from '../../../store/useLocationStore';
import { ChevronRight } from 'lucide-react';

export default function SimilarProducts({ productId, brand, category }) {
  const { location } = useLocationStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSimilar = async () => {
      setLoading(true);
      try {
        const idToFetch = productId || brand || category;
        const items = await productService.getSimilarProducts(idToFetch, { city: location?.city });
        setProducts(items);
      } catch (err) {
        console.error('Failed to load similar products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSimilar();
  }, [productId, brand, category, location]);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-4 text-left">
        <h3 className="font-poppins font-extrabold text-text-primary text-base md:text-lg tracking-wide">
          Similar products
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-64 bg-neutral-200/80 rounded-2xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4 text-left">
      {/* Header section with View All redirect */}
      <div className="flex items-center justify-between">
        <h3 className="font-poppins font-extrabold text-text-primary text-base md:text-lg tracking-wide">
          Similar products
        </h3>
        <button 
          onClick={() => alert('Viewing all similar products coming soon!')}
          className="text-xs font-bold text-brand-900 hover:text-brand-800 flex items-center gap-0.5 cursor-pointer hover:underline transition-all"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* DESKTOP LAYOUT (Hidden on mobile < md) - Spacious 4-column Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-4.5">
        {products.slice(0, 4).map((prod) => (
          <ProductCard key={prod.id} product={prod} compact={true} />
        ))}
      </div>

      {/* MOBILE SCROLL CAROUSEL (Visible only on mobile < md) */}
      <div className="flex md:hidden gap-3.5 overflow-x-auto scrollbar-hide py-1.8 px-0.5 -mx-4 px-4 select-none">
        {products.map((prod) => (
          <div key={prod.id} className="w-[11.5rem] sm:w-[13.5rem] shrink-0">
            <ProductCard product={prod} compact={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

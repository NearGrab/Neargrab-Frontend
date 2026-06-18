import React, { useState, useEffect } from 'react';
import { Megaphone, Pin, Loader2, Calendar, Sparkles, Clock, Eye, MousePointerClick, AlertCircle } from 'lucide-react';
import ShopkeeperLayout from '../layout/ShopkeeperLayout';
import Button from '../../../shared/components/ui/Button';
import ImageUploader from '../components/onboarding/ImageUploader';
import { shopkeeperDashboardService } from '../services/shopkeeperDashboardService';
import mediaService from '../../../shared/services/mediaService';

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchPromotions = async () => {
    try {
      setIsLoading(true);
      const res = await shopkeeperDashboardService.getPromotions();
      if (res.success) {
        setPromotions(res.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load promotions.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a banner image.');
      return;
    }
    if (!description.trim() || description.trim().length < 5) {
      setError('Description must be at least 5 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      setSuccessMsg('');

      // 1. Upload file
      const uploadRes = await mediaService.uploadSingle(file);
      if (!uploadRes.success || !uploadRes.data?.id) {
        throw new Error('Image upload failed.');
      }

      const mediaId = uploadRes.data.id;

      // 2. Create promotion
      const promoRes = await shopkeeperDashboardService.createPromotion({
        description,
        mediaId
      });

      if (promoRes.success) {
        setSuccessMsg('Promotion request submitted successfully!');
        setDescription('');
        setFile('');
        fetchPromotions();
      } else {
        throw new Error(promoRes.message || 'Failed to submit promotion request.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PINNED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-poppins bg-[#F3E8FF] text-[#6B21A8] border border-[#E9D5FF] shadow-3xs animate-pulse">
            <Pin className="w-3.5 h-3.5 fill-[#6B21A8]" /> Pinned by Admin
          </span>
        );
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-poppins bg-[#E6F4EA] text-[#137333] border border-[#C2E7C9]">
            Active
          </span>
        );
      case 'SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-poppins bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]">
            Scheduled
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-poppins bg-[#FEF7E0] text-[#B06000] border border-[#FDE293]">
            Pending Review
          </span>
        );
      case 'EXPIRED':
      case 'INACTIVE':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-poppins bg-neutral-100 text-text-muted border border-neutral-200">
            Expired
          </span>
        );
    }
  };

  return (
    <ShopkeeperLayout>
      <div className="flex flex-col gap-6 w-full text-left font-inter">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
          <div>
            <h1 className="font-poppins font-bold text-lg md:text-2xl text-text-primary flex items-center gap-2.5 leading-tight">
              <Megaphone className="w-6 h-6 text-brand-900" /> Promotions & Campaigns
            </h1>
            <p className="text-[11px] md:text-xs text-text-muted mt-1 font-medium">
              Submit custom banners to be featured or pinned on the platform search and explore page.
            </p>
          </div>
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          
          {/* Left: Request Submission Form */}
          <div className="lg:col-span-2 bg-[#F9FAFB]/50 border border-neutral-100 rounded-3xl p-5 md:p-6 flex flex-col gap-5">
            <div>
              <h3 className="font-poppins font-bold text-sm text-text-primary flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-900" /> Request Promotion
              </h3>
              <p className="text-[10px] text-text-muted mt-0.5 leading-normal">
                Submit a high-quality campaign banner and a short description. Admin will review and feature or pin it on the explore page.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <ImageUploader
                  label="Campaign Banner Image (Landscape Recommended)"
                  value={file}
                  onChange={(val) => setFile(val)}
                  aspectRatio="video"
                  helperText="Recommended dimension: 1200x600 pixels (aspect ratio 2:1). Max 5MB."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary mb-1.5 font-poppins">
                  Short Description / Title
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 20% off on all Grocery items this weekend!"
                  className="w-full text-xs font-medium font-inter border border-neutral-200 focus:border-brand-900 rounded-xl px-3.5 py-3 outline-none transition-all"
                  maxLength={100}
                />
                <span className="text-[9px] text-text-muted mt-1 block text-right font-medium">
                  {description.length}/100 characters
                </span>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-red-200/50 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="bg-emerald-50 text-emerald-800 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-emerald-250/50 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-emerald-800" />
                  <span>{successMsg}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="brand"
                disabled={isSubmitting}
                className="w-full font-bold text-xs h-11 rounded-xl cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-1.5 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                  </span>
                ) : (
                  'Submit Promotion Request'
                )}
              </Button>
            </form>
          </div>

          {/* Right: Existing Promotions List */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="font-poppins font-bold text-sm text-text-primary">
              Your Banner Campaigns
            </h3>

            {isLoading ? (
              <div className="min-h-[250px] border border-neutral-100/80 rounded-3xl flex flex-col items-center justify-center gap-2.5 bg-white shadow-3xs">
                <Loader2 className="w-8 h-8 text-brand-900 animate-spin" />
                <span className="text-xs text-text-secondary font-medium font-poppins">Loading banner requests...</span>
              </div>
            ) : promotions.length === 0 ? (
              <div className="min-h-[250px] border border-dashed border-neutral-200 rounded-3xl flex flex-col items-center justify-center p-6 text-center bg-white">
                <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-3">
                  <Megaphone className="w-5 h-5 text-text-muted" />
                </div>
                <h4 className="font-poppins font-bold text-sm text-text-primary">No Promotions Found</h4>
                <p className="text-xs text-text-muted mt-1 max-w-xs leading-normal">
                  You haven't requested any campaigns yet. Upload a banner to boost your shop's visibility.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="border border-neutral-100 rounded-3xl p-4 bg-white shadow-3xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-start gap-4 min-w-0 flex-grow">
                      <div className="w-24 sm:w-28 aspect-video rounded-2xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-150">
                        <img
                          src={promo.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'}
                          alt={promo.description}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {getStatusBadge(promo.status)}
                        </div>
                        <h4 className="font-poppins font-bold text-xs md:text-sm text-text-primary leading-snug line-clamp-2">
                          {promo.description}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] text-text-muted mt-2 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-text-muted" /> Requested on {new Date(promo.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats overlay if active/pinned */}
                    {(promo.status === 'ACTIVE' || promo.status === 'PINNED') && (
                      <div className="flex items-center gap-4 sm:border-l sm:border-neutral-100 sm:pl-4 self-stretch sm:self-center shrink-0">
                        <div className="flex flex-col text-center">
                          <span className="text-xs font-bold text-text-primary flex items-center gap-1 justify-center">
                            <Eye className="w-3.5 h-3.5 text-text-muted" /> --
                          </span>
                          <span className="text-[9px] font-bold text-text-muted mt-0.5">Impressions</span>
                        </div>
                        <div className="flex flex-col text-center">
                          <span className="text-xs font-bold text-text-primary flex items-center gap-1 justify-center">
                            <MousePointerClick className="w-3.5 h-3.5 text-text-muted" /> --
                          </span>
                          <span className="text-[9px] font-bold text-text-muted mt-0.5">Clicks</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </ShopkeeperLayout>
  );
}

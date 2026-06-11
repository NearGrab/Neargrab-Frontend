import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Loader2, AlertCircle } from 'lucide-react';
import ShopkeeperLayout from '../layout/ShopkeeperLayout';
import Button from '../../../shared/components/ui/Button';

// Zustand store
import useProductFormStore from '../../../store/useProductFormStore';

// Form sections
import ProductBasicInfoSection from '../components/products/ProductBasicInfoSection';
import ProductImagesSection from '../components/products/ProductImagesSection';
import PricingSection from '../components/products/PricingSection';
import StockAvailabilitySection from '../components/products/StockAvailabilitySection';
import AdditionalDetailsSection from '../components/products/AdditionalDetailsSection';

// Sidebar widgets
import ProductPreviewCard from '../components/products/ProductPreviewCard';
import ProductTipsCard from '../components/products/ProductTipsCard';

export default function AddProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();

  // Load store fields and actions
  const store = useProductFormStore();

  useEffect(() => {
    if (productId) {
      store.fetchProduct(productId);
    } else {
      store.resetForm();
      store.fetchCategories();
    }
  }, [productId]);

  const handleBack = () => {
    navigate('/shopkeeper/products');
  };

  // Compile visual state object for live preview
  const formData = useMemo(() => {
    return {
      productName: store.productName,
      description: store.description,
      tags: store.tags,
      price: store.price,
      mrp: store.mrp,
      unit: store.unit,
      stockAvailable: store.stockAvailable,
      images: store.images
    };
  }, [
    store.productName,
    store.description,
    store.tags,
    store.price,
    store.mrp,
    store.unit,
    store.stockAvailable,
    store.images
  ]);

  // Validation rules check
  const isFormValid = useMemo(() => {
    const hasName = !!store.productName.trim();
    const hasCategory = !!store.category;
    const hasDescription = !!store.description.trim() && store.description.length <= 120;
    const hasPrice = !!store.price && parseFloat(store.price) > 0;
    const hasUnit = !!store.unit;
    const hasPrimaryImage = store.images.some((img) => img.isPrimary);

    return hasName && hasCategory && hasDescription && hasPrice && hasUnit && hasPrimaryImage;
  }, [
    store.productName,
    store.category,
    store.description,
    store.price,
    store.unit,
    store.images
  ]);

  const handleSaveDraft = async () => {
    const success = await store.submitProduct(productId);
    if (success) {
      alert('Product Draft Saved Successfully!');
      navigate('/shopkeeper/products');
    } else {
      alert(`Failed to save draft: ${store.error || 'Check details and try again.'}`);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('Please fill out all required fields marked with * and upload a primary image.');
      return;
    }
    
    const success = await store.submitProduct(productId);
    if (success) {
      alert(productId ? 'Product updated successfully!' : 'Congratulations! Product published successfully!');
      navigate('/shopkeeper/products');
    } else {
      alert(`Failed to publish product: ${store.error || 'Check details and try again.'}`);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your edits? All progress will be lost.')) {
      store.resetForm();
      navigate('/shopkeeper/products');
    }
  };

  // Compile right sidebar widgets passed to Layout
  const rightSidebar = (
    <div className="flex flex-col gap-6">
      <ProductPreviewCard formData={formData} />
      <ProductTipsCard />
    </div>
  );

  return (
    <ShopkeeperLayout rightSidebar={rightSidebar}>
      <form onSubmit={handlePublish} className="flex flex-col gap-6 w-full text-left font-inter relative">
        
        {/* Loading Overlay */}
        {store.isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex flex-col items-center justify-center gap-3 z-50 rounded-2xl min-h-[400px]">
            <Loader2 className="w-10 h-10 text-brand-900 animate-spin" />
            <span className="font-poppins font-bold text-sm text-text-secondary">Saving product catalog entry...</span>
          </div>
        )}

        {/* Page Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="text-left">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-[10px] md:text-xs font-extrabold text-brand-900 hover:text-brand-700 font-poppins transition-colors uppercase tracking-wider mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Products</span>
            </button>
            <h1 className="font-poppins font-bold text-lg md:text-2xl text-text-primary leading-tight">
              {productId ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-[11px] md:text-xs text-text-muted mt-1 font-medium">
              Fill in the details below to list your product. All fields marked with <span className="text-red-500 font-bold">*</span> are required.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={store.isLoading}
            className="self-start sm:self-center font-bold text-[11px] h-9 md:h-10 cursor-pointer shadow-3xs hover:bg-[#F0FDF4]/30"
          >
            Save as Draft
          </Button>
        </div>

        {store.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-start gap-3 text-xs font-poppins">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Catalog Saving Error</span>
              <p className="mt-1">{store.error}</p>
            </div>
          </div>
        )}

        {/* Two-Column responsive Form Body Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Column 1: Basic details */}
          <div className="flex flex-col gap-6">
            <ProductBasicInfoSection
              productName={store.productName}
              brand={store.brand}
              category={store.category}
              subCategory={store.subCategory}
              description={store.description}
              tags={store.tags}
              onChangeField={store.updateField}
              onAddTag={store.addTag}
              onRemoveTag={store.removeTag}
            />
            <PricingSection
              price={store.price}
              mrp={store.mrp}
              unit={store.unit}
              onChangeField={store.updateField}
            />
            <StockAvailabilitySection
              stockAvailable={store.stockAvailable}
              onChangeField={store.updateField}
            />
          </div>

          {/* Column 2: Photos and supplementary specs */}
          <div className="flex flex-col gap-6">
            <ProductImagesSection
              images={store.images}
              onAddImage={store.addImage}
              onRemoveImage={store.removeImage}
              onSetPrimary={store.setPrimaryImage}
            />
            <AdditionalDetailsSection
              hsnCode={store.hsnCode}
              expiryDate={store.expiryDate}
              minimumOrderQty={store.minimumOrderQty}
              returnable={store.returnable}
              needsRefrigeration={store.needsRefrigeration}
              onChangeField={store.updateField}
            />
          </div>
        </div>

        {/* Bottom Submission Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-100 mt-4">
          <Button
            variant="outline"
            size="md"
            onClick={handleCancel}
            disabled={store.isLoading}
            className="font-bold text-[11px] md:text-xs h-10 px-5 cursor-pointer shadow-3xs bg-white hover:bg-neutral-50"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!isFormValid || store.isLoading}
            rightIcon={<Send className="w-3.5 h-3.5" />}
            className="font-bold text-[11px] md:text-xs h-10 px-6 cursor-pointer shadow-3xs disabled:bg-neutral-200 disabled:text-text-muted disabled:border-transparent"
          >
            {productId ? 'Update Product' : 'Save & Publish Product'}
          </Button>
        </div>

      </form>
    </ShopkeeperLayout>
  );
}

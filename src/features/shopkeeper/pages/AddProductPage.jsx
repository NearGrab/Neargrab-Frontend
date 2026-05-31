import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
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

  // Load store fields and actions
  const store = useProductFormStore();

  const handleBack = () => {
    // Navigate back or to shopkeeper dashboard by default
    navigate('/shopkeeper/dashboard');
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
    await store.saveDraft();
    alert('Product Draft Saved Successfully!');
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('Please fill out all required fields marked with * and upload a primary image.');
      return;
    }
    
    // Simulate successful publish action
    alert(`Congratulations! "${store.productName}" has been published successfully!`);
    store.resetForm();
    navigate('/shopkeeper/dashboard');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your edits? All progress will be lost.')) {
      store.resetForm();
      navigate('/shopkeeper/dashboard');
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
      <form onSubmit={handlePublish} className="flex flex-col gap-6 w-full text-left font-inter">
        
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
              Add New Product
            </h1>
            <p className="text-[11px] md:text-xs text-text-muted mt-1 font-medium">
              Fill in the details below to list your product. All fields marked with <span className="text-red-500 font-bold">*</span> are required.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            className="self-start sm:self-center font-bold text-[11px] h-9 md:h-10 cursor-pointer shadow-3xs hover:bg-[#F0FDF4]/30"
          >
            Save as Draft
          </Button>
        </div>

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
            className="font-bold text-[11px] md:text-xs h-10 px-5 cursor-pointer shadow-3xs bg-white hover:bg-neutral-50"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!isFormValid}
            rightIcon={<Send className="w-3.5 h-3.5" />}
            className="font-bold text-[11px] md:text-xs h-10 px-6 cursor-pointer shadow-3xs disabled:bg-neutral-200 disabled:text-text-muted disabled:border-transparent"
          >
            Save & Publish Product
          </Button>
        </div>

      </form>
    </ShopkeeperLayout>
  );
}

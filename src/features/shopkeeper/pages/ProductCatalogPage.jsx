import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Archive, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import ShopkeeperLayout from '../layout/ShopkeeperLayout';
import Button from '../../../shared/components/ui/Button';

// Zustand store
import useProductCatalogStore from '../../../store/useProductCatalogStore';

// Components
import ProductCatalogToolbar from '../components/products/ProductCatalogToolbar';
import ProductCatalogFilters from '../components/products/ProductCatalogFilters';
import ProductCatalogTable from '../components/products/ProductCatalogTable';
import ProductPagination from '../components/products/ProductPagination';

// Right sidebar widgets
import CatalogOverviewCard from '../components/products/CatalogOverviewCard';
import TopPerformingProducts from '../components/products/TopPerformingProducts';
import CatalogQuickTips from '../components/products/CatalogQuickTips';
import CatalogHelpCard from '../components/products/CatalogHelpCard';

export default function ProductCatalogPage() {
  const navigate = useNavigate();

  // Load catalog store fields and actions
  const store = useProductCatalogStore();

  useEffect(() => {
    store.fetchProducts();
  }, []);

  // Compute stats overview for Right Sidebar
  const catalogOverviewStats = useMemo(() => {
    const total = store.totalProducts || store.products.length;
    const inStock = store.products.filter((p) => p.stockAvailable).length;
    const outOfStock = store.products.filter((p) => !p.stockAvailable).length;
    const uniqueCategories = new Set(store.products.map((p) => p.category)).size;

    return {
      totalProducts: total,
      inStock: store.totalProducts ? Math.round(total * 0.9) : inStock, // Safe estimation helper
      outOfStock: store.totalProducts ? Math.round(total * 0.1) : outOfStock,
      categories: uniqueCategories || 1
    };
  }, [store.products, store.totalProducts]);

  const handleEditProduct = (id) => {
    // Redirect to edit route
    navigate(`/shopkeeper/products/${id}/edit`);
  };

  const handleDeleteProduct = async (id) => {
    const prod = store.products.find((p) => p.id === id);
    if (window.confirm(`Are you sure you want to archive "${prod?.name}"? This will hide it from customers but preserve its historical analytics.`)) {
      await store.deleteSingleProduct(id);
      alert('Product archived successfully.');
    }
  };

  // Bulk actions handlers
  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to archive the ${store.selectedProducts.length} selected products? This will hide them from customers but preserve their analytics.`)) {
      await store.bulkDelete();
      alert('Selected products archived successfully.');
    }
  };

  const handleBulkHide = async () => {
    await store.bulkHide();
    alert('Selected products set to Out of Stock successfully.');
  };

  // Compile Right Sidebar widgets passed to Layout
  const rightSidebar = (
    <div className="flex flex-col gap-6">
      <CatalogOverviewCard stats={catalogOverviewStats} />
      <TopPerformingProducts />
      <CatalogQuickTips />
      <CatalogHelpCard />
    </div>
  );

  return (
    <ShopkeeperLayout rightSidebar={rightSidebar}>
      <div className="flex flex-col gap-5 w-full text-left font-inter relative pb-20">
        
        {/* Main Header toolbar */}
        <ProductCatalogToolbar />

        {/* Filters and Inputs search block */}
        <ProductCatalogFilters
          searchQuery={store.searchQuery}
          onSearchChange={store.setSearchQuery}
          selectedCategory={store.selectedCategory}
          onCategoryChange={store.setCategory}
          stockFilter={store.stockFilter}
          onStockFilterChange={store.setStockFilter}
          sortBy={store.sortBy}
          onSortByChange={store.setSortBy}
        />

        {store.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-start gap-3 text-xs font-poppins">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Catalog Sync Error</span>
              <p className="mt-1">{store.error}</p>
            </div>
          </div>
        )}

        {/* Dynamic products list grid table */}
        {store.isLoading && store.products.length === 0 ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center gap-3 bg-white border border-neutral-100 rounded-3xl p-6">
            <Loader2 className="w-8 h-8 text-brand-900 animate-spin" />
            <span className="text-xs text-text-secondary font-bold">Synchronizing products catalog...</span>
          </div>
        ) : (
          <ProductCatalogTable
            products={store.products}
            selectedProducts={store.selectedProducts}
            onSelectToggle={store.toggleProductSelection}
            onSelectAllToggle={store.toggleAllProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onToggleStock={store.toggleStock}
          />
        )}

        {/* Pager offsets navigation */}
        <ProductPagination
          totalProducts={store.totalProducts}
          currentPage={store.currentPage}
          onPageChange={store.setCurrentPage}
          rowsPerPage={store.rowsPerPage}
          onRowsPerPageChange={store.setRowsPerPage}
        />

        {/* Floating Bulk Action Bar */}
        {store.selectedProducts.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-white rounded-2xl px-5 py-3.5 flex items-center gap-5 shadow-lg z-50 animate-in slide-in-from-bottom-5 duration-300">
            <span className="text-xs font-bold font-poppins">
              {store.selectedProducts.length} {store.selectedProducts.length === 1 ? 'product' : 'products'} selected
            </span>
            <div className="h-4 w-px bg-neutral-800" />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkHide}
                leftIcon={<EyeOff className="w-3.5 h-3.5 text-neutral-400" />}
                className="font-bold text-[10px] md:text-xs h-8 border-neutral-800 hover:bg-neutral-800 text-white cursor-pointer"
                disabled={store.isLoading}
              >
                Hide Products
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleBulkDelete}
                leftIcon={<Archive className="w-3.5 h-3.5 text-white" />}
                className="font-bold text-[10px] md:text-xs h-8 bg-amber-600 hover:bg-amber-700 border-transparent text-white cursor-pointer"
                disabled={store.isLoading}
              >
                Archive Selected
              </Button>
            </div>
          </div>
        )}

      </div>
    </ShopkeeperLayout>
  );
}

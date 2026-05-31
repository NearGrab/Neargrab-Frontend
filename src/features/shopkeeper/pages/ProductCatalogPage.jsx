import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Trash2, EyeOff, CheckCircle } from 'lucide-react';
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

  // 1. Reactive full client-side filtering and sorting
  const filteredProducts = useMemo(() => {
    let list = [...store.products];

    // Text query match
    if (store.searchQuery) {
      const lower = store.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.sku.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      );
    }

    // Category match
    if (store.selectedCategory && store.selectedCategory !== 'All Categories') {
      list = list.filter((p) => p.category === store.selectedCategory);
    }

    // Stock Status match
    if (store.stockFilter && store.stockFilter !== 'All') {
      if (store.stockFilter === 'In Stock') {
        list = list.filter((p) => p.stockAvailable && p.stockCount > 10);
      } else if (store.stockFilter === 'Out Of Stock') {
        list = list.filter((p) => !p.stockAvailable || p.stockCount === 0);
      } else if (store.stockFilter === 'Low Stock') {
        list = list.filter((p) => p.stockAvailable && p.stockCount <= 15 && p.stockCount > 0);
      }
    }

    // Sort matching
    if (store.sortBy) {
      if (store.sortBy === 'Oldest') {
        list = list.reverse();
      } else if (store.sortBy === 'Highest Views') {
        list = list.sort((a, b) => b.views - a.views);
      } else if (store.sortBy === 'Lowest Views') {
        list = list.sort((a, b) => a.views - b.views);
      } else if (store.sortBy === 'Price High To Low') {
        list = list.sort((a, b) => b.price - a.price);
      } else if (store.sortBy === 'Price Low To High') {
        list = list.sort((a, b) => a.price - b.price);
      }
    }

    return list;
  }, [store.products, store.searchQuery, store.selectedCategory, store.stockFilter, store.sortBy]);

  // 2. Pagination Slicer
  const paginatedProducts = useMemo(() => {
    const start = (store.currentPage - 1) * store.rowsPerPage;
    const end = start + store.rowsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, store.currentPage, store.rowsPerPage]);

  // 3. Dynamic Stats Overview recalculations for Right Sidebar
  const catalogOverviewStats = useMemo(() => {
    const total = store.products.length;
    const inStock = store.products.filter((p) => p.stockAvailable).length;
    const outOfStock = total - inStock;
    const uniqueCategories = new Set(store.products.map((p) => p.category)).size;

    return {
      totalProducts: total,
      inStock,
      outOfStock,
      categories: uniqueCategories
    };
  }, [store.products]);

  const handleEditProduct = (id) => {
    // Redirect to edit draft (reusing AddProduct route simulation)
    navigate('/shopkeeper/products/add');
  };

  const handleDeleteProduct = (id) => {
    const prod = store.products.find((p) => p.id === id);
    if (window.confirm(`Are you sure you want to permanently delete "${prod?.name}" from your catalog?`)) {
      const updatedList = store.products.filter((p) => p.id !== id);
      store.loadProducts(updatedList);
      alert('Product deleted successfully.');
    }
  };

  // Bulk actions handlers
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${store.selectedProducts.length} selected products?`)) {
      const updatedList = store.products.filter((p) => !store.selectedProducts.includes(p.id));
      store.loadProducts(updatedList);
      useProductCatalogStore.setState({ selectedProducts: [] });
      alert('Selected products deleted successfully.');
    }
  };

  const handleBulkHide = () => {
    const updatedList = store.products.map((p) => {
      if (store.selectedProducts.includes(p.id)) {
        return { ...p, stockAvailable: false, stockCount: 0 };
      }
      return p;
    });
    store.loadProducts(updatedList);
    useProductCatalogStore.setState({ selectedProducts: [] });
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

        {/* Dynamic products list grid table */}
        <ProductCatalogTable
          products={paginatedProducts}
          selectedProducts={store.selectedProducts}
          onSelectToggle={store.toggleProductSelection}
          onSelectAllToggle={store.toggleAllProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onToggleStock={store.toggleStock}
        />

        {/* Pager offsets navigation */}
        <ProductPagination
          totalProducts={filteredProducts.length}
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
              >
                Hide Products
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleBulkDelete}
                leftIcon={<Trash2 className="w-3.5 h-3.5 text-white" />}
                className="font-bold text-[10px] md:text-xs h-8 bg-red-600 hover:bg-red-700 border-transparent text-white cursor-pointer"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        )}

      </div>
    </ShopkeeperLayout>
  );
}

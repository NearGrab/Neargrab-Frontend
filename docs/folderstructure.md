# Frontend Folder Structure

This structure is based on the product docs and the available customer/shopkeeper designs in `Docs/03_Design/screens`. The frontend should cover the customer app and shopkeeper experience; the admin experience already exists separately in the `Admin` app.

## Recommended Structure

```text
Frontend/
  docs/
    folderstructure.md
  public/
  src/
    app/
      App.jsx
      providers/
        AppProviders.jsx
      router/
        AppRouter.jsx
        customerRoutes.jsx
        shopkeeperRoutes.jsx
        publicRoutes.jsx
    assets/
      images/
      icons/
      logos/
    shared/
      components/
        AppButton.jsx
        AppInput.jsx
        AppModal.jsx
        AppToast.jsx
        EmptyState.jsx
        LoadingState.jsx
      hooks/
        useDebouncedValue.js
        useDisclosure.js
      lib/
        apiClient.js
        constants.js
        formatters.js
        storage.js
      styles/
        base.css
        tokens.css
        utilities.css
    features/
      auth/
        components/
          LoginForm.jsx
          SignupForm.jsx
          AuthGate.jsx
        hooks/
          useAuth.js
        pages/
          LoginPage.jsx
          SignupPage.jsx
        services/
          authApi.js
        store/
          authStore.js
      customer/
        components/
          BottomNav.jsx
          CustomerHeader.jsx
          CustomerLayout.jsx
          HomeFeed.jsx
          NearbyShopList.jsx
          ProductAvailabilityBadge.jsx
          ProductCard.jsx
          ProductFilters.jsx
          ProductGrid.jsx
          ProductSearchBar.jsx
          ShopCard.jsx
          ShopInfoPanel.jsx
          ShopRating.jsx
          SponsoredBanner.jsx
          RecommendationRail.jsx
        hooks/
          useCurrentLocation.js
          useNearbyProducts.js
          useProductSearch.js
        pages/
          LandingPage.jsx
          HomePage.jsx
          SearchResultsPage.jsx
          ProductDetailsPage.jsx
          ProfilePage.jsx
          NotificationsPage.jsx
          SettingsPage.jsx
          MapRedirectPage.jsx
          NotFoundPage.jsx
        services/
          customerApi.js
          productDiscoveryApi.js
          shopDiscoveryApi.js
        store/
          locationStore.js
      shopkeeper/
        components/
          DashboardSummary.jsx
          ProductCatalogTable.jsx
          ProductForm.jsx
          ShopProfileForm.jsx
          ShopQrCard.jsx
          ShopkeeperHeader.jsx
          ShopkeeperLayout.jsx
        hooks/
          useShopProducts.js
          useShopProfile.js
        pages/
          BecomeShopkeeperPage.jsx
          ShopDashboardPage.jsx
          ProductCatalogPage.jsx
          AddProductPage.jsx
          EditProductPage.jsx
          ShopProfilePage.jsx
        services/
          shopkeeperApi.js
          shopProductApi.js
        store/
          shopkeeperStore.js
      reviews/
        components/
          ReviewCard.jsx
          ReviewForm.jsx
        hooks/
          useProductReviews.js
        pages/
          CreateReviewPage.jsx
        services/
          reviewApi.js
      chat/
        components/
          ChatThread.jsx
          MessageComposer.jsx
        hooks/
          useChatThread.js
        pages/
          ChatPage.jsx
        services/
          chatApi.js
    test/
      mocks/
      setup.js
    main.jsx
    index.css
```

## Why This Shape Fits Neargrab

The PRD defines three user groups: customers, shopkeepers, and admins. Since admin has its own `Admin` project, `Frontend/src/features` should focus on `customer`, `shopkeeper`, and the supporting workflows those users touch.

The customer design screens map directly to `features/customer/pages`: landing, login/signup through auth, home, search results, product details, profile, notifications, settings, map redirect, and not found states.

The shopkeeper design screens map to `features/shopkeeper/pages`: dashboard, add product, product catalog, shop profile, and shopkeeper listing/onboarding. Keeping these separate from customer pages prevents dashboard forms and customer discovery screens from getting mixed together.

Each feature should own its pages, components, hooks, services, and state. Product cards used only for customer discovery stay in `features/customer/components`; product forms used only by sellers stay in `features/shopkeeper/components`. Move something to `shared/` only after it is genuinely reused by multiple unrelated features.

## Folder Responsibilities

`app/` should contain app bootstrap code: providers, router setup, route grouping, and the top-level `App.jsx`.

`features/` should contain business workflows. Each feature owns its local `pages`, `components`, `hooks`, `services`, and `store` folders so its implementation stays close to the screens in the docs.

`shared/components/` should contain reusable UI primitives that are not tied to one business workflow: buttons, inputs, modals, toasts, loading states, and empty states.

`shared/hooks/` should contain only generic hooks such as disclosure state or debounced values. Feature-specific hooks, like product search or shop profile loading, should live inside the relevant feature.

`shared/lib/` should contain framework-light helpers such as API client setup, constants, storage helpers, and formatting utilities.

`shared/styles/` should hold app-wide CSS foundations. Use it for tokens, base styles, and utilities; keep feature-specific styling close to the feature when it grows.

## Suggested Route Groups

```text
/                         -> customer LandingPage
/home                     -> customer HomePage
/search                   -> customer SearchResultsPage
/products/:productId      -> customer ProductDetailsPage
/profile                  -> customer ProfilePage
/notifications            -> customer NotificationsPage
/settings                 -> customer SettingsPage
/map-redirect             -> customer MapRedirectPage
/login                    -> auth LoginPage
/signup                   -> auth SignupPage
/chat/:threadId           -> chat ChatPage
/reviews/new              -> reviews CreateReviewPage

/shopkeeper/become        -> shopkeeper BecomeShopkeeperPage
/shopkeeper/dashboard     -> shopkeeper ShopDashboardPage
/shopkeeper/products      -> shopkeeper ProductCatalogPage
/shopkeeper/products/new  -> shopkeeper AddProductPage
/shopkeeper/products/:id  -> shopkeeper EditProductPage
/shopkeeper/profile       -> shopkeeper ShopProfilePage
```

## Implementation Order

1. Move the current Vite starter files into the `app/` shape without changing behavior.
2. Add routing and layouts for public, authenticated customer, and shopkeeper sections.
3. Build shared components only for true primitives: buttons, inputs, modals, toasts, loading states, and empty states.
4. Implement customer pages in the order of the user flow: landing, home, search, product details, auth gate, profile/settings.
5. Implement shopkeeper pages in the order of the seller flow: become shopkeeper, dashboard, product catalog, add/edit product, shop profile.
6. Connect API services inside each feature first, then promote only repeated API/client logic into `shared/lib`.

## Naming Rules

Use PascalCase for React components and pages, such as `ProductDetailsPage.jsx`.

Use camelCase for hooks, utilities, stores, and API modules, such as `useProductSearch.js` and `shopProductApi.js`.

Keep page components inside `features/*/pages`, and keep components that are reused only within one feature inside `features/*/components`.

Promote code to `shared/` only when at least two features need it and the shared version does not contain feature-specific business language.

Do not place admin screens in this frontend structure unless the project later decides to merge the `Admin` app into `Frontend`.

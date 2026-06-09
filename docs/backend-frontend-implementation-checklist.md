# Backend to Frontend Implementation Checklist

This checklist connects the production-ready backend with the React customer/shopkeeper frontend and the Vue admin panel. The goal is to replace mock/local data with typed API services, protected routes, resilient loading/error states, and deployment-ready behavior for thousands of users.

Base API path: `/api/v1`

## 1. Shared API Foundation, Auth, and Route Guards

**Screens to connect**
- Customer frontend: `/login`, `/signup`, `/profile`, `/settings`, `/notifications`, `/cart`, `/shopkeeper/*`
- Admin panel: `/dashboard`, `/users`, `/products`, `/banners`

**Frontend routes and backend routes**
| Frontend screen | Backend routes |
| --- | --- |
| `/login` | `POST /api/v1/auth/login`, `POST /api/v1/auth/google`, `POST /api/v1/auth/otp/request`, `POST /api/v1/auth/otp/verify` |
| `/signup` | `POST /api/v1/auth/signup`, `POST /api/v1/auth/google`, `POST /api/v1/auth/otp/request`, `POST /api/v1/auth/otp/verify` |
| Auth session boot | `GET /api/v1/me`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout`, `POST /api/v1/auth/logout-all` |
| Admin login modal/layout | `POST /api/v1/admin/auth/login`, `GET /api/v1/admin/me` |

**Implementation checklist**
- Create a shared `apiClient` in both `Frontend` and `Admin` with `VITE_API_BASE_URL`, JSON parsing, `success/data/meta` unwrapping, request IDs, timeout, retry for idempotent `GET`s, and normalized error objects.
- Replace `Frontend/src/store/useAuthStore.js` mock login/signup with real access token, refresh token, user, role, and expiry handling.
- Replace `Admin/src/services/adminAuthService.js` local JSON authentication with real admin auth and persistent token storage.
- Add React protected route wrappers for user-only and shopkeeper-only screens; redirect unauthenticated users to `/login` and non-shopkeepers to `/shopkeeper/onboarding`.
- Add Vue admin route guards for all admin pages; block non-admin roles from the admin layout.
- Add automatic token refresh on `401` once per request, then logout and clear session if refresh fails.
- Add global empty/loading/error UI patterns so every connected screen handles slow networks and backend validation errors cleanly.

**Backend improvements**
- Confirm CORS origins for customer frontend and admin domains.
- Confirm cookie/token strategy for production. If refresh tokens remain in storage, document XSS mitigation and strict CSP.
- Add `POST /api/v1/admin/auth/logout` if admin logout should revoke sessions server-side, or document that admin uses the shared `/auth/logout`.

## 2. Customer Discovery, Search, Product, and Shop Browsing

**Screens to connect**
- `/`
- `/explore`
- `/search`
- `/product/:productId`
- `/product/:productId/map`
- `/shopkeeper/profile` currently renders the shop profile page; it should either become the logged-in merchant profile or be split into a public route such as `/shops/:shopId`.

**Frontend routes and backend routes**
| Frontend screen | Backend routes |
| --- | --- |
| `/explore` | `GET /api/v1/explore`, `GET /api/v1/categories`, `GET /api/v1/brands` |
| `/search` | `GET /api/v1/search/products`, `GET /api/v1/search/suggestions`, `POST /api/v1/search/events`, `POST /api/v1/product-requests` |
| `/product/:productId` | `GET /api/v1/products/:productId`, `GET /api/v1/products/:productId/stores`, `GET /api/v1/products/:productId/similar`, `GET /api/v1/products/:productId/reviews`, `POST /api/v1/products/:productId/view`, `POST /api/v1/products/:productId/save`, `DELETE /api/v1/products/:productId/save`, `POST /api/v1/products/:productId/feedback` |
| `/product/:productId/map` | `GET /api/v1/products/:productId/stores`, `POST /api/v1/shops/:shopId/lead` |
| Public shop page | `GET /api/v1/shops/:shopId`, `GET /api/v1/shops/:shopId/products`, `GET /api/v1/shops/:shopId/reviews`, `GET /api/v1/shops/:shopId/updates`, `POST /api/v1/shops/:shopId/lead`, `POST /api/v1/shops/:shopId/reviews` |

**Implementation checklist**
- Replace `exploreService`, `searchService`, `productService`, and `shopProfileService` mock data with real API calls.
- Connect location state from `useLocationStore` to `city`, `latitude`, `longitude`, and `radiusKm` query parameters.
- Map backend product card fields once in service mappers so cards, search results, top picks, similar products, and cart additions use the same shape.
- Add debounced suggestions and search event tracking on `/search`.
- Connect product save/unsave and review submit flows behind auth; prompt login for guests.
- Track product views and shop leads for directions/call/WhatsApp actions.
- Keep landing/legal pages static for now unless content management is required from admin.

**Backend improvements**
- Confirm `POST /api/v1/product-requests` is implemented and documented consistently.
- Add response cache headers for public `categories`, `brands`, product detail, and explore payloads.
- Verify search pagination metadata and filter names exactly match frontend filter state.

## 3. Customer Account, Cart, Reservations, Notifications, and Settings

**Screens to connect**
- `/profile`
- `/settings`
- `/notifications`
- `/cart`

**Frontend routes and backend routes**
| Frontend screen | Backend routes |
| --- | --- |
| `/profile` | `GET /api/v1/me`, `GET /api/v1/me/profile`, `PATCH /api/v1/me/profile`, `PATCH /api/v1/me` |
| `/settings` | `GET /api/v1/me/settings`, `PATCH /api/v1/me/settings`, `DELETE /api/v1/me`, `POST /api/v1/auth/password/forgot`, `POST /api/v1/auth/password/reset`, `POST /api/v1/auth/logout-all` |
| `/notifications` | `GET /api/v1/notifications`, `PATCH /api/v1/notifications/:notificationId/read`, `PATCH /api/v1/notifications/read-all`, `DELETE /api/v1/notifications/:notificationId`, `GET /api/v1/notifications/preferences`, `PATCH /api/v1/notifications/preferences` |
| `/cart` | `GET /api/v1/cart`, `POST /api/v1/cart/items`, `PATCH /api/v1/cart/items/:itemId`, `DELETE /api/v1/cart/items/:itemId`, `DELETE /api/v1/cart`, `POST /api/v1/reservations`, `GET /api/v1/reservations`, `PATCH /api/v1/reservations/:reservationId/cancel` |

**Implementation checklist**
- Replace `profileService`, `notificationService`, and `useCartStore` local/mock storage with backend services for authenticated users.
- Keep a guest cart in local storage only for unauthenticated users; merge guest items into `POST /api/v1/cart/items` after login.
- Add reservation checkout from cart grouped by shop using `POST /api/v1/reservations` with `source: "cart"`.
- Add notification tabs using backend `type`, `read`, and pagination metadata.
- Wire profile/settings forms to backend validation errors and optimistic save success states.
- Add account deletion, logout-all, notification preferences, and password reset flows only where the UI already exposes those actions.

**Backend improvements**
- Confirm `DELETE /api/v1/cart` vs older docs that mention `DELETE /api/v1/cart/items`; frontend should use the implemented route.
- Add a customer reservations screen or hide reservation list links until a route exists.
- Align older docs that mention `/api/v1/notification-preferences`; implementation currently mounts preferences at `/api/v1/notifications/preferences`.

## 4. Shopkeeper Onboarding, Dashboard, Profile, and Catalog

**Screens to connect**
- `/shopkeeper/onboarding`
- `/shopkeeper/dashboard`
- `/shopkeeper/products`
- `/shopkeeper/products/add`
- `/shopkeeper/profile`

**Frontend routes and backend routes**
| Frontend screen | Backend routes |
| --- | --- |
| `/shopkeeper/onboarding` | `GET /api/v1/shopkeeper/onboarding`, `POST /api/v1/shopkeeper/onboarding`, `PATCH /api/v1/shopkeeper/onboarding/details`, `PATCH /api/v1/shopkeeper/onboarding/address`, `PATCH /api/v1/shopkeeper/onboarding/contact`, `PATCH /api/v1/shopkeeper/onboarding/business`, `PATCH /api/v1/shopkeeper/onboarding/photos`, `POST /api/v1/shopkeeper/onboarding/submit`, `POST /api/v1/media/upload`, `POST /api/v1/media/upload/bulk` |
| `/shopkeeper/dashboard` | `GET /api/v1/shopkeeper/dashboard`, `GET /api/v1/shopkeeper/reviews`, `GET /api/v1/shopkeeper/leads`, `GET /api/v1/shopkeeper/reservations`, `PATCH /api/v1/shopkeeper/reservations/:reservationId/status` |
| `/shopkeeper/products` | `GET /api/v1/shopkeeper/products`, `PATCH /api/v1/shopkeeper/products/:productId/stock`, `PATCH /api/v1/shopkeeper/products/:productId`, `DELETE /api/v1/shopkeeper/products/:productId`, `POST /api/v1/shopkeeper/products/bulk` |
| `/shopkeeper/products/add` | `POST /api/v1/shopkeeper/products`, `POST /api/v1/media/upload/bulk`, `POST /api/v1/shopkeeper/products/:productId/images`, `DELETE /api/v1/shopkeeper/products/:productId/images/:imageId` |
| `/shopkeeper/profile` | `GET /api/v1/shopkeeper/profile`, `PATCH /api/v1/shopkeeper/profile`, `GET /api/v1/shopkeeper/profile/timings`, `PUT /api/v1/shopkeeper/profile/timings`, `POST /api/v1/media/upload`, `DELETE /api/v1/media/:mediaId` |

**Implementation checklist**
- Replace `shopkeeperDashboardService`, `productCatalogService`, `productService`, `useShopOnboardingStore`, `useProductCatalogStore`, and `useShopProfileStore` mock data with real calls.
- Save onboarding after each step and rehydrate the wizard from `GET /api/v1/shopkeeper/onboarding`.
- Upload images/documents before submitting onboarding/product/profile forms, then send returned `mediaId`s to the relevant route.
- Connect product catalog filters, pagination, stock toggle, soft delete, bulk updates, and edit flow.
- Add authenticated shopkeeper reservation actions for accept/reject/complete.
- Decide route ownership for `/shopkeeper/profile`: logged-in merchant profile should use `/api/v1/shopkeeper/profile`; public shop profile should get its own route like `/shops/:shopId`.

**Backend improvements**
- Confirm product edit UI needs a frontend route such as `/shopkeeper/products/:productId/edit`; backend already has `GET/PATCH /shopkeeper/products/:productId`.
- Confirm media docs and implemented routes use `/api/v1/media/upload` and `/api/v1/media/upload/bulk`.
- Add signed/remote storage configuration for production uploads if local uploads are only for development.

## 5. Admin Panel Integration

**Screens to connect**
- Admin `/dashboard`
- Admin `/users`
- Admin `/products`
- Admin `/banners`

**Admin routes and backend routes**
| Admin screen | Backend routes |
| --- | --- |
| `/dashboard` | `GET /api/v1/admin/dashboard` |
| `/users` | `GET /api/v1/admin/users`, `GET /api/v1/admin/users/:userId`, `PATCH /api/v1/admin/users/:userId`, `DELETE /api/v1/admin/users/:userId`, `GET /api/v1/admin/shops`, `GET /api/v1/admin/shops/:shopId`, `PATCH /api/v1/admin/shops/:shopId/verify` |
| `/products` | `GET /api/v1/admin/products`, `PATCH /api/v1/admin/products/:productId`, `PATCH /api/v1/admin/products/bulk`, `GET /api/v1/admin/pin-rules`, `POST /api/v1/admin/products/:productId/pin`, `POST /api/v1/admin/products/:productId/unpin` |
| `/banners` | `GET /api/v1/admin/banners`, `POST /api/v1/admin/banners`, `GET /api/v1/admin/banners/metrics`, `GET /api/v1/admin/banners/performance`, `GET /api/v1/admin/banners/:bannerId`, `PATCH /api/v1/admin/banners/:bannerId`, `DELETE /api/v1/admin/banners/:bannerId`, `POST /api/v1/admin/banners/:bannerId/pin`, `POST /api/v1/admin/banners/:bannerId/unpin`, `GET /api/v1/admin/pin-rules` |

**Implementation checklist**
- Replace `Admin/src/services/*.js` JSON imports with API services.
- Connect dashboard metric cards, charts, city table, source split, and recent activity to `GET /api/v1/admin/dashboard`.
- Connect user filters, pagination, suspend/activate/edit/delete flows to admin user routes.
- Connect shop verification actions from the users/shop moderation area to `PATCH /api/v1/admin/shops/:shopId/verify`.
- Connect product moderation, pin/unpin, bulk actions, and pin rule display to admin product routes.
- Connect banner list, metrics, performance, create/edit/delete, and pin/unpin to admin banner routes.
- Add role-based UI permissions for `SUPER_ADMIN`, `ADMIN`, `SUPPORT_ADMIN`, and `CONTENT_ADMIN`.

**Backend improvements**
- Align admin docs with implementation: dashboard is `GET /api/v1/admin/dashboard`, bulk product update is `PATCH /api/v1/admin/products/bulk`, pin rules are `GET /api/v1/admin/pin-rules`, and shop verification is `PATCH /api/v1/admin/shops/:shopId/verify`.
- Add admin content screens if `GET/PATCH /api/v1/admin/content` should be managed from UI.
- Confirm destructive admin actions have audit logs and backend-level authorization checks.

## 6. Production Readiness, Testing, and Deployment

**Implementation checklist**
- Add environment files for both frontends: `VITE_API_BASE_URL`, `VITE_APP_ENV`, upload limits, Google auth client ID, map provider keys, and analytics keys.
- Add frontend contract mappers/tests for high-risk payloads: auth, search products, product detail, cart, onboarding, shopkeeper products, admin dashboard, admin users/products/banners.
- Add end-to-end smoke tests for: signup/login, explore/search/product/cart reservation, shopkeeper onboarding/product create, admin login/user moderation/banner pin.
- Add build checks in CI: `npm run lint`, `npm run build`, and at least smoke tests for `Frontend`, `Admin`, and `Backend`.
- Add route-level code splitting and loading boundaries for heavy pages in React and Vue.
- Add observability: frontend error boundary reporting, API request timing, backend request IDs surfaced in UI error logs, and admin audit visibility.
- Add production security: CSP, rate-limit-aware error messages, no mock credentials, no raw OTP display in production, secure upload validation, and no local JSON fallback in connected screens.
- Add deployment checks: backend health check `/health`, frontend static asset cache policy, admin/customer domain CORS allowlist, database migration runbook, seed data policy, and rollback plan.

**Final acceptance criteria**
- No customer, shopkeeper, or admin production screen depends on mock JSON/local data except intentional guest cart fallback and static marketing content.
- Every protected screen redirects correctly when unauthenticated or unauthorized.
- Every mutating action shows pending, success, and failure states.
- Pagination/filter/search state is reflected in URL query params where users expect shareable views.
- Frontend and admin builds pass, backend tests pass, and the deployed environment can support real uploads, auth refresh, and API error recovery.

# Manual Smoke Test Runbook

This runbook outlines the steps to verify the stability, security, and integration of the Neargrab platform.

## Prerequisites
1. Ensure the Backend is running:
   ```bash
   cd Backend
   npm start
   ```
2. Ensure the Frontend is running:
   ```bash
   cd Frontend
   npm start
   ```
3. Ensure the Admin panel is running:
   ```bash
   cd Admin
   npm run dev
   ```

---

## Smoke Test Cases

### 1. Authentication & Session Boot
- **Objective**: Verify register, login, automatic token refresh, and logout.
- **Steps**:
  1. Open customer app at `http://localhost:5173/signup`.
  2. Register a new user. Verify username and format validation works.
  3. Log out and navigate to `http://localhost:5173/login`.
  4. Log back in with the created credentials.
  5. Check `localStorage` for `neargrab_access_token` and `neargrab_refresh_token`.
  6. Wait or simulate token expiration (clear access token) and perform a state modification (e.g. update user profile). Confirm that the token automatically refreshes without logging the user out.

### 2. Discover, Search & Reservation Flow
- **Objective**: Verify category discovery, product details, search suggestions, and placing reservations.
- **Steps**:
  1. Go to the Explore page `/explore`. Confirm category icons load and the local banner appears.
  2. Click the search bar at `/search`. Type a query (e.g., "Amul"). Verify debounced suggestions show.
  3. Click a product card to open `/product/:productId`. Check product image, store details, and map coordinates at `/product/:productId/map`.
  4. Add the product to the cart. Go to `/cart`.
  5. Click **Checkout & Reserve**. Verify that a reservation is created and cart items are cleared.

### 3. Shopkeeper Onboarding & Dashboard Flow
- **Objective**: Verify merchant application and document upload.
- **Steps**:
  1. Navigate to `/shopkeeper/onboarding`.
  2. Fill out Step 1 (Shop Details). Try uploading an image larger than 5MB or invalid formats; confirm client-side validation stops the upload.
  3. Complete onboarding steps (Address, Contact, Timings, Photos).
  4. Click **Submit Application**. Check that the application goes to pending verification.
  5. Once approved (see admin moderation), log in as shopkeeper. Verify access to `/shopkeeper/dashboard` and catalog management at `/shopkeeper/products`.

### 4. Admin Portal Moderation
- **Objective**: Verify admin dashboard, user/product moderation, and banner pinning.
- **Steps**:
  1. Go to `http://localhost:5174/dashboard` and log in as `admin` / `admin_secure_pass`.
  2. Click **Users**. Select a user and trigger **Deactivate User** or **Suspend User**. Verify confirmation modal appears.
  3. Click **Products**. Select a pending product and approve/flag it. Verify confirmation dialogue warns about flagging.
  4. Click **Banners**. Create a new hero banner. Verify pin rules and banner metrics display.

---

## Observability & Errors Verification
- **Request ID propagation**:
  1. Open Browser DevTools (Network tab).
  2. Make any API request. Check headers for `x-request-id`.
  3. Trigger an intentional error (e.g. incorrect password on login).
  4. Verify the console displays a structured error with the associated `requestId`.

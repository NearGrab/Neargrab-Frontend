# Neargrab Data Management Manual

This guide documents the **Data-Driven Architecture** of Neargrab's frontend. By separating our layout logic from the copy, we can manage visual details and text dynamically inside a single configuration file: `content.json`.

---

## 🗄️ Centralized Data Source: `content.json`

All page elements, support documentation text, call-to-actions, brand statements, metadata descriptions, and co-founder profiles are defined in:
🔗 **[src/features/landing/data/content.json](file:///home/ariont/Code/StartUps/Frontend/src/features/landing/data/content.json)**

---

## 📊 JSON Node Schema Breakdown

The JSON document is structured into isolated segments matching key UI modules:

### 1. `navbar`
Contains branding titles, standard navigation links, page redirects, and the main CTA action label:
```json
"navbar": {
  "brand": "Neargrab",
  "links": [
    { "label": "Home", "href": "/" },
    { "label": "About Us", "href": "/about" }
  ],
  "button": "Explore"
}
```

### 2. `hero`
Drives the main landing screen, header lines, body summary, button text redirects, visual badge highlights, and custom hero vector references.

### 3. `features`
Configures the four primary benefits grids of the landing page, containing titles, descriptions, and icon paths.

### 4. `forShopkeepers`
Focuses on the merchant acquisition layout block, listing detailed bullet point benefits, localized CTA buttons, and mock shop graphic pointers.

### 5. `stats`
Maintains nationwide performance metrics (Shops, Customers, Products, Cities) loaded as an array of values and labels.

### 6. `howItWorks`
Controls the structured 4-step sequence (Search ➔ Discover ➔ Verify ➔ Visit) mapping out how customers engage with Neargrab.

### 7. `footer`
Includes legal links (Privacy & Terms), site directories, secondary action buttons, corporate descriptions, and copyright timestamps.

### 8. `faqs`
Houses the interactive help center divided into standard categories (General, Customers, Shopkeepers). Each category possesses a specific icon name (e.g. `Store`, `ShoppingBag`) mapped to a Lucide vector icon.

### 9. `about`
Contains corporate narrative items, "Why Needed" sustainable commerce elements, "Vision & Values" outlines, and Co-Founder credentials (initials, biographic summaries, GitHub/social handles, and custom color badge themes).

---

## 🖼️ Media & Icon Path Resolution

Any image, custom illustration, or icon specified inside `content.json` is resolved relative to Vite's root directory:

> [!IMPORTANT]
> When defining a new image path in the JSON model, use absolute paths relative to the `/src` folder, for example:
> `"/src/assets/Landing/Hero.png"`
> Avoid relative notations like `../../assets/` inside `content.json` because the path is parsed by route containers located at different directory depths.

---

## 🛠️ Content Administrator Tutorials

Here are three common tutorials for updating the application content:

### 1. How to Modify Landing Page Text
To change any landing section title or paragraph:
1.  Open [src/features/landing/data/content.json](file:///home/ariont/Code/StartUps/Frontend/src/features/landing/data/content.json).
2.  Locate the matching key (e.g., `"hero" -> "description"`).
3.  Edit the text. Special characters like `\n` can be used to insert a hard line break in headings.
4.  Save the file. Vite's HMR will instantly render the updated copy.

### 2. How to Add a New FAQ Item
To add a question and answer:
1.  Locate the `"faqs" -> "categories"` array inside the JSON.
2.  Choose the category to modify (e.g., `id: "shoppers"`).
3.  Append a new object block to the `"items"` array:
    ```json
    {
      "question": "How long is a product reserved for pick-up?",
      "answer": "Most neighborhood stores reserve items for 24 hours. You can verify this directly via the store's profile page."
    }
    ```

### 3. How to Update a Co-Founder Profile
To modify or append a team profile:
1.  Scroll to `"about" -> "team" -> "members"`.
2.  Edit an existing item or add a new co-founder object:
    ```json
    {
      "name": "Ariont Sharma",
      "role": "Lead Architect",
      "bio": "Specialist in high-fidelity React engines and data-driven systems.",
      "initials": "AS",
      "color": "bg-emerald-100 text-brand-900 border-brand-200",
      "social": {
        "linkedin": "#",
        "twitter": "#",
        "github": "https://github.com/"
      }
    }
    ```

---

## 🗄️ Mock Databases & In-Memory Data Stores

To allow high-fidelity feature validation before actual database deployment, Neargrab implements in-memory localized database mocks.

### 1. Customer Explore Catalog (`src/features/explore/data/temp.json`)
Maintains the complete, high-fidelity list of categories, brick-and-mortar stores, ratings, and localized product records.
```json
{
  "categories": [
    { "id": "bakery", "name": "Breads & Bakery", "icon": "Croissant" }
  ],
  "stores": [
    {
      "id": "s1",
      "name": "Fresh Earth Bakery",
      "distance": "0.4 miles",
      "rating": 4.8
    }
  ]
}
```

### 2. Live Notifications Records (`src/features/notifications/data/tempNotifications.json`)
Maintains alert history arrays containing unique IDs, categories, timestamps, read flags, and interactive redirect anchors.
```json
[
  {
    "id": "noti_001",
    "type": "order",
    "title": "Reservation Confirmed!",
    "message": "Fresh Earth Bakery accepted your order.",
    "time": "10 mins ago",
    "read": false,
    "store": "Fresh Earth Bakery",
    "avatarColor": "bg-emerald-100 text-emerald-800"
  }
]
```

---

## 📝 Additional Administrator Tutorials

### How to Add or Modify Simulated Notification Alerts
To change or add mock notification records:
1. Open [src/features/notifications/data/tempNotifications.json](file:///home/ariont/Code/StartUps/Frontend/src/features/notifications/data/tempNotifications.json).
2. Append or edit an alert entry following this structure:
   ```json
   {
     "id": "noti_new_09",
     "type": "promo",
     "title": "Midnight Madness Flash Sale!",
     "message": "Organic Green Grocers is offering 30% off all physical stocks.",
     "time": "Just now",
     "read": false,
     "store": "Organic Green Grocers",
     "avatarColor": "bg-amber-100 text-amber-800"
   }
   ```
3. Save the file. The next time the customer accesses `/notifications`, the newly created mock item will appear dynamically at the top of the timeline.

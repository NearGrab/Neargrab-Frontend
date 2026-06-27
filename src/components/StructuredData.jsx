import React from 'react';

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Neargrab",
    "url": "https://www.neargrab.in",
    "logo": "https://www.neargrab.in/logo.png",
    "description": "India's hyperlocal shopping platform connecting customers with local shops near them.",
    "sameAs": [
      "https://www.instagram.com/neargrab",
      "https://www.linkedin.com/company/neargrab",
      "https://twitter.com/neargrab"
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Neargrab",
    "url": "https://www.neargrab.in",
    "applicationCategory": "ShoppingApplication",
    "operatingSystem": "Web, Android, iOS",
    "description": "Neargrab lets users search for products at local shops nearby, view availability, compare prices, and navigate to stores.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "200"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
    </>
  );
}

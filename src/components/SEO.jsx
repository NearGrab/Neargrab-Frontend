import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Neargrab — Discover & Buy from Local Shops Near You',
  description = "Neargrab helps you find products at local shops near you — search availability, compare prices, and navigate directly to the store. India's local shopping platform.",
  canonical = 'https://www.neargrab.in/',
  ogImage = 'https://www.neargrab.in/og-image.png',
}) {
  return (
    <Helmet>
      {/* HTML Language tag */}
      <html lang="en-IN" />

      {/* Title */}
      <title>{title}</title>

      {/* Meta tags */}
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Neargrab" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical link */}
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}

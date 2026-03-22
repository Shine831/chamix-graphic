import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://chamixgraphic.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CHAMIX GRAPHIC | Infographiste & Designer de Prestige à Douala, Cameroun",
    template: "%s | CHAMIX GRAPHIC",
  },
  description:
    "CHAMIX GRAPHIC — Expert en infographie, branding, identité visuelle et design de prestige à Logpom Bassong, Douala. Création de logos, packaging, affiches, cartes de visite et supports marketing pour entreprises ambitieuses au Cameroun.",
  keywords: [
    "infographiste Douala",
    "graphiste Cameroun",
    "design graphique Douala",
    "branding Cameroun",
    "identité visuelle Douala",
    "logo design Cameroun",
    "packaging Douala",
    "carte de visite design Cameroun",
    "designer graphique Logpom",
    "infographie professionnelle",
    "direction artistique Cameroun",
    "CHAMIX GRAPHIC",
    "graphiste Logpom Bassong",
    "design de prestige Douala",
    "création visuelle Cameroun",
    "affiche publicitaire Douala",
    "print design Cameroun",
  ],
  authors: [{ name: "CHAMIX GRAPHIC" }],
  creator: "CHAMIX GRAPHIC",
  publisher: "CHAMIX GRAPHIC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CM",
    url: siteUrl,
    siteName: "CHAMIX GRAPHIC",
    title: "CHAMIX GRAPHIC | Infographiste & Designer de Prestige à Douala",
    description:
      "Expert en infographie, branding et identité visuelle à Douala, Cameroun. Design de prestige pour leaders ambitieux. Contactez-nous sur WhatsApp.",
    images: [
      {
        url: "/images/projects/media__1774196305133.jpg",
        width: 1200,
        height: 630,
        alt: "CHAMIX GRAPHIC — Design de Prestige à Douala, Cameroun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHAMIX GRAPHIC | Design de Prestige à Douala",
    description:
      "Expert en infographie, branding et identité visuelle au Cameroun. Design qui domine le marché.",
    images: ["/images/projects/media__1774196305133.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased dark"
    >
      <head>
        {/* Google Fonts: Archivo & Space Grotesk */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data: LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${siteUrl}/#business`,
              name: "CHAMIX GRAPHIC",
              description:
                "Expert en infographie, branding, identité visuelle et design de prestige à Douala, Cameroun.",
              url: siteUrl,
              telephone: "+237659233477",
              email: "bambousrong@gmail.com",
              image: `${siteUrl}/images/projects/media__1774196305133.jpg`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Logpom Bassong",
                addressLocality: "Douala",
                addressRegion: "Littoral",
                addressCountry: "CM",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 4.0511,
                longitude: 9.7679,
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Douala",
                },
                {
                  "@type": "Country",
                  name: "Cameroun",
                },
              ],
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "18:00",
              },
              sameAs: [],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Design Graphique & Infographie",
                    description:
                      "Création de logos, identités visuelles, packaging, affiches et supports marketing.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Branding & Identité Visuelle",
                    description:
                      "Refonte et création d'identité de marque complète pour entreprises.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Direction Artistique",
                    description:
                      "Direction artistique pour campagnes marketing et événements.",
                  },
                },
              ],
            }),
          }}
        />
        {/* JSON-LD: ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "CHAMIX GRAPHIC",
              url: siteUrl,
              description:
                "Studio de design graphique professionnel spécialisé dans le branding et l'identité visuelle de prestige.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Logpom Bassong",
                addressLocality: "Douala",
                addressCountry: "CM",
              },
              knowsAbout: [
                "Graphic Design",
                "Branding",
                "Visual Identity",
                "Packaging Design",
                "Print Design",
                "Logo Design",
                "Infographie",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f5f5f5] selection:bg-[#DC143C] selection:text-white">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Le Goût du Voyage | Cuisine fusion à Rodez — Terroir & Monde",
  description:
    "Restaurant bistronomique au cœur de Rodez. Le chef Thomas Sabrié, formé chez Joël Robuchon, propose une cuisine fusion mêlant terroir aveyronnais et saveurs du monde. 4.9★ sur Google.",
  keywords: [
    "restaurant Rodez",
    "cuisine fusion",
    "bistronomique",
    "terroir aveyronnais",
    "Thomas Sabrié",
    "Le Goût du Voyage",
    "gastronomie Aveyron",
  ],
  openGraph: {
    title: "Le Goût du Voyage | Cuisine fusion à Rodez",
    description:
      "Restaurant bistronomique au cœur de Rodez. Cuisine fusion mêlant terroir aveyronnais et saveurs du monde par le chef Thomas Sabrié.",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Goût du Voyage",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Le Goût du Voyage",
              description:
                "Restaurant bistronomique de cuisine fusion mêlant terroir aveyronnais et saveurs du monde.",
              image: "",
              address: {
                "@type": "PostalAddress",
                streetAddress: "38 rue de Bonald",
                addressLocality: "Rodez",
                postalCode: "12000",
                addressRegion: "Aveyron",
                addressCountry: "FR",
              },
              telephone: "+33565427510",
              email: "restaurant.le.gout.du.voyage@gmail.com",
              servesCuisine: ["Fusion", "Française", "Bistronomique"],
              priceRange: "€€",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "158",
                bestRating: "5",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Wednesday",
                  opens: "12:00",
                  closes: "14:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Thursday", "Friday", "Saturday"],
                  opens: "12:00",
                  closes: "14:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Thursday", "Friday", "Saturday"],
                  opens: "19:30",
                  closes: "21:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "12:00",
                  closes: "14:00",
                },
              ],
              url: "",
              menu: "",
              acceptsReservations: "True",
            }),
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-dm-sans)] bg-noir text-creme antialiased">
        {children}
      </body>
    </html>
  );
}

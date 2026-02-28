export interface GalleryImage {
  id: string;
  title: string;
  src: string;
  alt: string;
}

// Shaped for future API-driven media management.
export const galleryImages: GalleryImage[] = [
  {
    id: "bot-dashboard-table",
    title: "Bot Dashboard Table",
    src: "/assets/bot-dashboard.png",
    alt: "Bot dashboard table screenshot",
  },
  {
    id: "tryst-link-logo",
    title: "Tryst.link",
    src: "/assets/tryst-logo.png",
    alt: "Tryst.link logo",
  },
  {
    id: "skipthegames-logo",
    title: "Skipthegames",
    src: "/assets/skipthegames-logo.png",
    alt: "Skipthegames logo",
  },
  {
    id: "megapersonals-view",
    title: "MegaPersonals",
    src: "/assets/megapersonals-purposes.jpg",
    alt: "MegaPersonals screenshot",
  },
  {
    id: "sales-accounts",
    title: "Sales Accounts",
    src: "/assets/sales-accounts.jpg",
    alt: "Sales accounts image",
  },
];

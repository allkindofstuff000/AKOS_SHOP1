export type ServiceMediaType = "video" | "image" | "none";

export interface ServiceLogo {
  id: string;
  name: string;
  src: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailPoints?: string[];
  extraText?: string;
  highlightInfo?: string;
  highlightHandle?: string;
  highlightCtaHref?: string;
  features: string[];
  logos?: ServiceLogo[];
  priceText: string;
  availableCount: number;
  mediaType: ServiceMediaType;
  mediaSrc: string;
  mediaGallery?: string[];
  ctaText: string;
}

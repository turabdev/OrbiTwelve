export interface HeroSocial {
  label: string;
  href: string;
}

export interface HeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  trust?: string;
  background?: string;
  thumbnail?: string;
  socials?: HeroSocial[];
}

export interface ClientMarqueeSection {
  title: string;
}

export interface ClientMarqueeClient {
  name: string;
  icon: string;
}

export interface ClientMarqueeProps {
  section: ClientMarqueeSection;
  clients: ClientMarqueeClient[];
}

export interface PortfolioCarouselSection {
  eyebrow: string;
  title: string;
  description: string;
}

export interface PortfolioCarouselItem {
  slug: string;
  title: string;
  category: string;
  media: string;
  poster?: string;
}

export interface PortfolioCarouselProps {
  section: PortfolioCarouselSection;
  items: PortfolioCarouselItem[];
}

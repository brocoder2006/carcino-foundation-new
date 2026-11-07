export interface TeamMember {
  name: string;
  role: string;
  image: string;
  mask: string;
  color: string;
  description?: string;
  imagePosition?: string;
  imageScale?: number;
  transformOrigin?: string;
}

export interface TeamMemberTooltipItem {
  id: number;
  name: string;
  designation: string;
  image: string;
  category?: string;
  bio?: string;
  badge?: string;
  badgeColor?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

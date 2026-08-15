export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  summary: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  handle?: string; // shown as @handle on the card — falls back to a slug of `name`
  status?: string; // shown next to the handle — falls back to "Team Member"
  avatarUrl?: string; // real photo when available — falls back to a generated initials avatar
}
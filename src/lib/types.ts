export interface Publication {
  id: string;
  slug: string;
  title: string;
  summary: string;
  authors: string[];
  publishDate: string;
  category: PublicationCategory;
  tags: string[];
  featured: boolean;
  pdfUrl?: string;
  readingTime?: number;
  relatedSlugs?: string[];
}

export type PublicationCategory =
  | "Research Report"
  | "Systematic Review"
  | "Policy Brief"
  | "Working Paper"
  | "Evaluation"
  | "Learning Brief";

export interface Project {
  id: string;
  slug: string;
  title: string;
  sector: string;
  region: string;
  client: string;
  duration: string;
  status: "Active" | "Completed";
  description: string;
  outcomes: string[];
  services: string[];
  featured: boolean;
  imageAlt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  initials: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
}

export interface Value {
  id: string;
  name: string;
  description: string;
}

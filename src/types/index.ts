export type Role = 'user' | 'super_admin' | 'member' | 'core_committee' | 'faculty';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
  bio: string | null;
  social_links: SocialLinks | null;
  skills: string[] | null;
  achievements: string[] | null;
  is_approved: boolean;
  updated_at: string | null;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  tags: string[] | null;
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  status: 'ongoing' | 'completed';
  contributors: string[] | null; // UUIDs of profiles
  is_published: boolean;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author_id: string;
  tags: string[] | null;
  likes_count: number;
  view_count: number;
  is_published: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  image_url: string;
  description: string | null;
  author_id: string;
  is_published: boolean;
  created_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  year: string | null;
  branch: string | null;
  skills: string[] | null;
  sop: string | null;
  portfolio_link: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile>;
        Update: Partial<Profile>;
      };
      projects: {
        Row: Project;
        Insert: Partial<Project>;
        Update: Partial<Project>;
      };
      articles: {
        Row: Article;
        Insert: Partial<Article>;
        Update: Partial<Article>;
      };
      gallery_items: {
        Row: GalleryItem;
        Insert: Partial<GalleryItem>;
        Update: Partial<GalleryItem>;
      };
      applications: {
        Row: Application;
        Insert: Partial<Application>;
        Update: Partial<Application>;
      };
    };
  };
};

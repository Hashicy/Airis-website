-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  role text check (role in ('user', 'super_admin', 'member', 'core_committee', 'faculty')) default 'user',
  bio text,
  social_links jsonb default '{}'::jsonb,
  skills text[],
  achievements text[],
  is_approved boolean default false,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- PROJECTS TABLE
create table projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  content text,
  tags text[],
  image_url text,
  demo_url text,
  github_url text,
  status text check (status in ('ongoing', 'completed')) default 'ongoing',
  contributors uuid[] references profiles(id), 
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ARTICLES TABLE
create table articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  author_id uuid references profiles(id) not null,
  tags text[],
  likes_count int default 0,
  view_count int default 0,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GALLERY ITEMS TABLE
create table gallery_items (
  id uuid default uuid_generate_v4() primary key,
  title text,
  image_url text not null,
  description text,
  author_id uuid references profiles(id) not null,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- APPLICATIONS TABLE
create table applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  full_name text not null,
  email text not null,
  year text,
  branch text,
  skills text[],
  sop text,
  portfolio_link text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES

-- Profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( is_approved = true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Projects
alter table projects enable row level security;

create policy "Published projects are viewable by everyone."
  on projects for select
  using ( is_published = true );

create policy "Authenticated users can create projects."
  on projects for insert
  with check ( auth.role() = 'authenticated' );

-- Articles
alter table articles enable row level security;

create policy "Published articles are viewable by everyone."
  on articles for select
  using ( is_published = true );

create policy "Authenticated users can create articles."
  on articles for insert
  with check ( auth.role() = 'authenticated' );

-- Gallery
alter table gallery_items enable row level security;

create policy "Published gallery items are viewable by everyone."
  on gallery_items for select
  using ( is_published = true );

create policy "Authenticated users can submit to gallery."
  on gallery_items for insert
  with check ( auth.role() = 'authenticated' );

-- Applications
alter table applications enable row level security;

create policy "Users can view their own application."
  on applications for select
  using ( auth.uid() = user_id );

create policy "Users can submit application."
  on applications for insert
  with check ( auth.uid() = user_id );

-- TRIGGERS
-- Handle new user signup -> create profile entry automatically
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

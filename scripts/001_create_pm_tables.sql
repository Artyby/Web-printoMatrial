-- Pm_Image table for gallery images
CREATE TABLE IF NOT EXISTS public.pm_image (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pm_Admin table for admin authentication with hash
CREATE TABLE IF NOT EXISTS public.pm_admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_hash TEXT NOT NULL UNIQUE,
  name TEXT DEFAULT 'Admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Pm_Contact table for contact form submissions
CREATE TABLE IF NOT EXISTS public.pm_contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.pm_image ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pm_contact ENABLE ROW LEVEL SECURITY;

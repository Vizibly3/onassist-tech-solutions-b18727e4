-- Add banned column to profiles table
ALTER TABLE public.profiles ADD COLUMN banned boolean DEFAULT false;

-- Create an index for better performance on banned status
CREATE INDEX idx_profiles_banned ON public.profiles(banned);

-- Update the RLS policy to allow admins to update banned status
CREATE POLICY "Admins can update user ban status"
ON public.profiles
FOR UPDATE
USING (has_role('admin'::user_role));
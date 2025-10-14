/*
  # Create quote submissions table

  1. New Tables
    - `quote_submissions`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `company` (text, optional)
      - `category` (text, required - website/marketing/videos/branding)
      - `service` (text, required - specific service slug)
      - `budget` (text, optional)
      - `timeline` (text, optional)
      - `brief` (text, required - project description)
      - `goals` (jsonb, optional - array of selected goals)
      - `reference_links` (text, optional - competitor/reference links)
      - `submitted_at` (timestamptz, default now)
      - `status` (text, default 'new' - new/contacted/qualified/closed)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `quote_submissions` table
    - Add policy for anonymous users to insert their submissions
    - Add policy for service role to read all submissions (for admin access)

  3. Notes
    - Public can only insert (submit quotes)
    - Only service role can read/update for backend processing
*/

CREATE TABLE IF NOT EXISTS quote_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text DEFAULT '',
  category text NOT NULL,
  service text NOT NULL,
  budget text DEFAULT '',
  timeline text DEFAULT '',
  brief text NOT NULL,
  goals jsonb DEFAULT '[]'::jsonb,
  reference_links text DEFAULT '',
  submitted_at timestamptz DEFAULT now(),
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quotes"
  ON quote_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all quotes"
  ON quote_submissions
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update quotes"
  ON quote_submissions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_quote_submissions_status ON quote_submissions(status);
CREATE INDEX IF NOT EXISTS idx_quote_submissions_created_at ON quote_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_submissions_email ON quote_submissions(email);

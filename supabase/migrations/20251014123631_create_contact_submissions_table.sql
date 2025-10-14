/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, optional)
      - `message` (text, required)
      - `submitted_at` (timestamptz, default now)
      - `status` (text, default 'new' - new/read/replied)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert their messages
    - Add policy for service role to read all submissions

  3. Notes
    - Public can only insert (submit contact forms)
    - Only service role can read/update for backend processing
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all contacts"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update contacts"
  ON contact_submissions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

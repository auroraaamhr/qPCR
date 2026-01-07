/*
  # Create qPCR Curves Table

  1. New Tables
    - `qpcr_curves`
      - `id` (uuid, primary key) - Unique identifier for each curve
      - `name` (text) - Sample name or curve identifier
      - `parameters` (jsonb) - qPCR parameters (baseline, threshold, Ct value, etc)
      - `data` (jsonb) - Array of cycle data points with fluorescence values
      - `created_at` (timestamp) - When the curve was generated

  2. Security
    - Enable RLS on `qpcr_curves` table
    - Allow anonymous users to read and write (for demo purposes)
*/

CREATE TABLE IF NOT EXISTS qpcr_curves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parameters jsonb NOT NULL,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE qpcr_curves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access for qpcr curves"
  ON qpcr_curves
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

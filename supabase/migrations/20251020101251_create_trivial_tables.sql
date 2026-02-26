-- Crear tablas para el Trivial de Soporte Vital
-- 1. Tabla de preguntas
-- 2. Tabla de sesiones de juego
-- 3. Tabla de respuestas individuales

-- Tabla de preguntas
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  type text NOT NULL CHECK (type IN ('multiple', 'true-false')),
  question text NOT NULL,
  options jsonb,
  correct jsonb NOT NULL,
  explanation text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Tabla de sesiones de juego
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  difficulty text NOT NULL,
  categories jsonb NOT NULL,
  score integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  total_questions integer DEFAULT 0,
  average_time numeric DEFAULT 0,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Tabla de respuestas individuales
CREATE TABLE IF NOT EXISTS question_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES game_sessions(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  user_answer jsonb,
  is_correct boolean DEFAULT false,
  time_taken numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_answers ENABLE ROW LEVEL SECURITY;

-- Políticas para questions (lectura pública)
CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  TO public
  USING (true);

-- Políticas para game_sessions (crear y leer públicamente)
CREATE POLICY "Anyone can create sessions"
  ON game_sessions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read sessions"
  ON game_sessions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can update sessions"
  ON game_sessions FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Políticas para question_answers (crear y leer públicamente)
CREATE POLICY "Anyone can create answers"
  ON question_answers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read answers"
  ON question_answers FOR SELECT
  TO public
  USING (true);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_question_answers_session ON question_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_question_answers_question ON question_answers(question_id);
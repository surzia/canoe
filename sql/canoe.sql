CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_type INT NOT NULL,
    options JSONB,
    correct_answer TEXT
);

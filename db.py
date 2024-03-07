import json
import sqlite3


def get_db_connection():
    connection = sqlite3.connect('quiz.db')
    connection.row_factory = sqlite3.Row
    return connection


def get_all_questions():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM questions')
    questions = cursor.fetchall()
    connection.close()
    return questions


def get_incorrect_questions():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM questions WHERE is_incorrect is true')
    questions = cursor.fetchall()
    connection.close()
    return questions


def get_question(question_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM questions WHERE id = ?', (question_id,))
    question = cursor.fetchone()
    connection.close()
    return question


def update_question(question_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('UPDATE questions SET is_incorrect = true WHERE id = ?', (question_id,))
    connection.commit()
    connection.close()


def complete_question(question_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('UPDATE questions SET is_completed = true WHERE id = ?', (question_id,))
    connection.commit()
    connection.close()


def create_db():
    connection = sqlite3.connect('quiz.db')
    cursor = connection.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_text TEXT NOT NULL,
            option_a TEXT NOT NULL,
            option_b TEXT NOT NULL,
            option_c TEXT NOT NULL,
            option_d TEXT NOT NULL,
            correct_answer TEXT NOT NULL,
            is_incorrect BOOLEAN NOT NULL
        )
    ''')

    connection.commit()
    connection.close()


def create_quiz_table():
    connection = sqlite3.connect('quiz.db')
    cursor = connection.cursor()
    with open('static/questions.json', 'r', encoding='utf-8') as file:
        questions = json.load(file)
        for q in questions:
            cursor.execute('''
                    INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, is_incorrect, is_completed)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                q['题目'], q['A'], q['B'], q['C'], q['D'], q['答案'], False, False
            ))
        connection.commit()
        connection.close()


if __name__ == '__main__':
    # create_db()
    # create_quiz_table()
    res = get_all_questions()
    for r in res:
        print(r['question_text'])

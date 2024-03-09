import json

from flask import Flask, render_template, request
from db import get_all_questions, get_question, update_question, get_incorrect_questions, complete_question, mark_success_question

app = Flask(__name__)

total_question_count = len(get_all_questions())


@app.route('/')
def index():
    question_objects = get_all_questions()
    return render_template('index.html', questions=question_objects)


@app.route('/quiz/<int:question_id>', methods=['GET'])
def quiz(question_id):
    if 0 <= question_id <= total_question_count:
        question = get_question(question_id)
        return render_template('quiz.html',
                               question=question,
                               question_id=question_id,
                               total_questions=total_question_count)
    else:
        return "Question not found."


@app.route('/incorrect_questions')
def incorrect_questions():
    incorrect_question_objects = get_incorrect_questions()
    return render_template('incorrect_questions.html', incorrect_questions_list=incorrect_question_objects)


@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    question_id = int(request.form['question_id'])
    user_answer = request.form['user_answer']

    question = get_question(question_id)
    is_correct = user_answer.upper() == question['correct_answer'].upper()

    result = {'is_correct': is_correct, 'correct_answer': question['correct_answer']}

    if not is_correct:
        update_question(question_id)
    else:
        mark_success_question(question_id)
    complete_question(question_id)

    return render_template('quiz.html', question=question, question_id=question_id, result=result,
                           total_questions=total_question_count)


if __name__ == '__main__':
    app.run(debug=True)

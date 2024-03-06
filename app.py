import json

from flask import Flask, render_template, request

app = Flask(__name__)

# Load questions from JSON file
with open('static/questions.json', 'r', encoding='utf-8') as file:
    questions = json.load(file)

incorrect_questions_set = set()


class Question:
    def __init__(self, question_text, option_a, option_b, option_c, option_d, correct_answer):
        self.question_text = question_text
        self.options = {'A': option_a, 'B': option_b, 'C': option_c, 'D': option_d}
        self.correct_answer = correct_answer
        self.is_completed = False


# Create Question objects from loaded data
question_objects = [Question(q['题目'], q['A'], q['B'], q['C'], q['D'], q['答案']) for q in questions]


@app.route('/')
def index():
    return render_template('index.html', questions=question_objects)


@app.route('/quiz/<int:question_id>', methods=['GET'])
def quiz(question_id):
    if 0 <= question_id < len(question_objects):
        question = question_objects[question_id]
        return render_template('quiz.html',
                               question=question,
                               question_id=question_id,
                               total_questions=len(question_objects))
    else:
        return "Question not found."


@app.route('/incorrect_questions')
def incorrect_questions():
    incorrect_questions_list = [{'question': question_objects[q_id], 'id': q_id} for q_id in incorrect_questions_set]
    return render_template('incorrect_questions.html', incorrect_questions_list=incorrect_questions_list)


@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    question_id = int(request.form['question_id'])
    user_answer = request.form['user_answer']

    question = question_objects[question_id]
    is_correct = user_answer.upper() == question.correct_answer.upper()

    result = {'is_correct': is_correct, 'correct_answer': question.correct_answer}

    if not is_correct:
        incorrect_questions_set.add(question_id)
    elif question_id in incorrect_questions_set:
        incorrect_questions_set.remove(question_id)

    return render_template('quiz.html', question=question, question_id=question_id, result=result,
                           total_questions=len(question_objects))


if __name__ == '__main__':
    app.run(debug=True)

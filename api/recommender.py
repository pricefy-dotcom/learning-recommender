import joblib
import numpy as np
import os

# Load the model and scaler
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model = joblib.load(os.path.join(BASE_DIR, 'models', 'performance_model.pk1'))
scaler = joblib.load(os.path.join(BASE_DIR, 'models', 'scaler.pk1'))

# Resource recommendations per category
RECOMMENDATIONS = {
    'Struggling': [
        {
            'title': 'Khan Academy - Math Fundamentals',
            'url': 'https://www.khanacademy.org/math',
            'type': 'Video lessons',
            'reason': 'Build foundational math skills at your own pace.'
        },
        {
            'title': 'Wolfram Alpha - Step-by-Step Solutions',
            'url': 'https://www.wolframalpha.com',
            'type': 'Problem Solver',
            'reason': 'See detailed step-by-step solutions to understand where you are struggling.'
        },
        {
            'title': 'Quizlet - Math Flashcards',
            'url': 'https://www.quizlet.com',
            'type': 'Flashcards',
            'reason': 'Reinforce core concepts with repetion and active recall.'
        },
        {
            'title': 'Coursera - Learning How to Learn',
            'url': 'https://www.coursera.org/learn/learning-how-to-learn',
            'type': 'Course',
            'reason': 'Improve your study techniques and memory retention.'
        }
    ],
    'Average': [
        {
            'title': 'Khan Academy - Math Fundamentals',
            'url': 'https://www.khanacademy.org/math',
            'type': 'Practice',
            'reason': 'Targeted practice to push grades from average to strong.'
        },
        {
            'title': 'Desmos Graphing Calculator',
            'url': 'https://www.desmos.com',
            'type': 'Tool',
            'reason': 'Visualize math concepts to deepen understanding.'
        },
        {
            'title': 'MIT OpenCourseWare - Mathematics',
            'url': 'https://ocw.mit.edu/courses/mathematics/',
            'type': 'Course Materials',
            'reason': 'Challenge yourself with university level problem sets.'
        },
        {
            'title': 'Pomodoro Timer - Study Technique',
            'url': 'https://pomofocus.io',
            'type': 'Study Tool',
            'reason': 'Structure your study sessions for maximum focus and retention.'
        }
    ],
    'Excelling': [
        {
            'title': 'MIT OpenCourseWare - Advanced Mathematics',
            'url': 'https://ocw.mit.edu/courses/mathematics/',
            'type': 'Advanced Course',
            'reason': 'Push beyond the curriculum with university content.'
        },
        {
            'title': 'Project Euler - Math Programming Challenges',
            'url': 'https://projecteuler.net',
            'type': 'Challenges',
            'reason': 'Apply math skills to challenging computational problems.'
        },
        {
            'title': 'Brilliant.org - Advanced Problem Solving',
            'url': 'https://brilliant.org',
            'type': 'Interactive Learning',
            'reason': 'Tackle competition level math and logic problems.'
        },
        {
            'title': 'Art of Problem Solving',
            'url': 'https://artofproblemsolving.com',
            'type': 'Community + Courses',
            'reason': 'Connect with other high achieving math students and go deeper.'
        }
    ]
}

def get_recommendations(student_data: dict) -> dict:
    # Arrange features in the same order as training
    features = [
        student_data['G1'],
        student_data['G2'],
        student_data['failures'],
        student_data['Medu'],
        student_data['Fedu'],
        student_data['higher'],
        student_data['studytime'],
        student_data['absences'],
        student_data['goout'],
        student_data['Walc'],
        student_data['Dalc'],
        student_data['age'],
        student_data['romantic'],
        student_data['traveltime']
    ]

    # Scale and predict
    scaled = scaler.transform([features])
    prediction = model.predict(scaled)[0]
    confidence = model.predict_proba(scaled)[0].max()

    return {
        'performance_category': prediction,
        'confidence': round(float(confidence), 2),
        'recommendations': RECOMMENDATIONS[prediction]
    }
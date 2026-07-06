# Personalized Learning Recommendation Engine

<<<<<<< HEAD
A full-stack machine learning web application that predicts student 
performance and recommends personalized learning resources based on 
academic and lifestyle factors.

🔗 **Live Demo:** [https://learning-recommender-beta.vercel.app](https://learning-recommender-beta.vercel.app)

---
=======
A full-stack machine learning web application that predicts student
performance and recommends personalized learning resources based on
academic and lifestyle factors.

** Live Demo: https://learning-recommender-git-main-pricefy.vercel.app/
>>>>>>> 7e9de5c (Update loading with spinner and server wake up message)

## Problem

Students waste time studying topics they already understand while 
struggling areas go unaddressed. There is no personalized guidance 
for self-directed learners that adapts to their unique profile.

## Solution

<<<<<<< HEAD
A web app where students input their academic performance and lifestyle 
factors to receive personalized resource recommendations based on their 
predicted performance category — Struggling, Average, or Excelling.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Machine Learning | Python, scikit-learn, pandas, numpy |
| Backend API | FastAPI, uvicorn |
| Frontend | React, CSS |
| Deployment | Vercel (frontend), Render (backend) |
| Version Control | Git, GitHub |

---

## Model Performance

- **Algorithm:** Random Forest Classifier
- **Accuracy:** 87%
- **Dataset:** Student Performance Dataset (395 students, 33 features)

| Category | Precision | Recall | F1 Score |
|---|---|---|---|
| Struggling | 0.82 | 0.88 | 0.85 |
| Average | 0.87 | 0.87 | 0.87 |
| Excelling | 1.00 | 0.87 | 0.93 |

---

## Key Findings

- **G1 and G2** (prior period grades) are by far the strongest 
  predictors of final performance, accounting for ~67% of model 
  importance
- **Past failures** is the strongest non-grade predictor
- **Study time alone** has surprisingly little effect on grades
- **Parental education** (especially mother's) positively correlates 
  with student performance
- **Absences data** contained anomalies worth noting — some students 
  with zero absences received zero final grades, suggesting possible 
  data collection issues

---

## Limitations

- Dataset contains only 395 students from two Portuguese schools — 
  results may not generalize globally
- Grades use the Portuguese 0–20 scale which differs from other 
  grading systems
- Some zero final grades may reflect data collection issues rather 
  than true student performance
- Free tier deployment on Render may cause ~50 second cold start 
  delays after inactivity

---

## Getting Started Locally

### Prerequisites
- Python 3.13.2
- Node.js v24+
- Git

### Backend Setup
```bash
git clone https://github.com/pricefy-dotcom/learning-recommender.git
cd learning-recommender
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd api
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## Future Improvements

- Expand dataset to include more schools and regions
- Add subject specific recommendations beyond mathematics
- Integrate OpenAI API for dynamic AI generated study plans
- Build a teacher dashboard with class wide analytics
- Add user accounts so students can track progress over time
- Mobile responsive design

---

## Dataset

Source: https://www.kaggle.com/datasets/whenamancodes/student-performance/data

Math.csv is used, not Portuguese.csv

## Author

**Tyler Price**
- GitHub: [@pricefy-dotcom](https://github.com/pricefy-dotcom)
=======
## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Machine Learning | Python, scikit-learn, pandas, numpy |
| Backend API | FastAPI, uvicorn |
| Frontend | React, CSS |
| Deployment | Vercel (frontend), Render (backend) |
| Version Control | Git, GitHub |

---

## 🤖 Model Performance

- **Algorithm:** Random Forest Classifier
- **Accuracy:** 87%
- **Dataset:** Student Performance Dataset (395 students, 33 features)

| Category | Precision | Recall | F1 Score |
|---|---|---|---|
| Struggling | 0.82 | 0.88 | 0.85 |
| Average | 0.87 | 0.87 | 0.87 |
| Excelling | 1.00 | 0.87 | 0.93 |

---


## Key Findings

- **G1 and G2** (prior period grades) are the strongest predictors of final performance, accounting for 67% of model importance
- **Past Failures** is the strongest non-grade predictor
- **Study time** has surprisingly little effect on grades
- **Parental education** (especially mother's) positively correlates with student performance
- **Absences data** contained anomalies worth noting, some students with zero absences received zero final grades, suggesting possible data collection issues.

---

## Limitations

- Dataset contains only 395 students from two Portuguese schools. Results may not generalize globally.
- Grades use the Portuguese 0-20 scale which differs from other grading systems.
- Some zero final grades may reflect data may reflect data collection issues rather than true student performance.
- Free tier deployment on Render may cause ~50 second cold start delays after inactivity

---

## Getting Started Locally

### Prerequisites
- Python 3.13.2
- Node.js v24+
- Git

### Backend Setup
```
git clone https://github.com/pricefy-dotcom/learning-recommender.git
cd learning-recommender
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd api
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
---

## Future Improvements

- Expand dataset to include more schools, regions and countries
- Add specific subject recommendations beyond mathematics
- Integrate OpenAI API for dynamic AI generated study plans
- Build a teacher dashboard with class wide analytics
- Add user accounts so students can track progress over time
- Mobile responsive design

## Target User
Middle/high school students or self-directed adult learners.

## Project Phases
- [X] 1: Planning + dataset selection
- [X] 2: Data cleaning + exploration
- [X] 3-4: Model building
- [X] 5: API development
- [X] 6: Frontend
- [X] 7: Deployment
- [X] 8: Documentation + polish

## Dataset
Source: ASSISTments (real Portuguese student math performance data)

## Success Criteria
A deployed app that takes student scores as input and returns
relevant, topic-specific learning resources.

## Author
**Tyler Price**
- Github: [@pricefy-dotcom](https://github.com/pricefy-dotcom)
>>>>>>> 7e9de5c (Update loading with spinner and server wake up message)
- LinkedIn: https://www.linkedin.com/in/tylertprice/

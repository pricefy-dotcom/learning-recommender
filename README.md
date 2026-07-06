# 🎓 Personalized Learning Recommendation Engine

A full-stack machine learning web application that predicts student 
performance and recommends personalized learning resources based on 
academic and lifestyle factors.

🔗 **Live Demo:** [https://learning-recommender-beta.vercel.app](https://learning-recommender-beta.vercel.app)

---

## 📌 Problem

Students waste time studying topics they already understand while 
struggling areas go unaddressed. There is no personalized guidance 
for self-directed learners that adapts to their unique profile.

## 💡 Solution

A web app where students input their academic performance and lifestyle 
factors to receive personalized resource recommendations based on their 
predicted performance category — Struggling, Average, or Excelling.

---

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

## 🔍 Key Findings

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

## ⚠️ Limitations

- Dataset contains only 395 students from two Portuguese schools — 
  results may not generalize globally
- Grades use the Portuguese 0–20 scale which differs from other 
  grading systems
- Some zero final grades may reflect data collection issues rather 
  than true student performance
- Free tier deployment on Render may cause ~50 second cold start 
  delays after inactivity

---

## 🚀 Getting Started Locally

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

## 🔮 Future Improvements

- Expand dataset to include more schools and regions
- Add subject specific recommendations beyond mathematics
- Integrate OpenAI API for dynamic AI generated study plans
- Build a teacher dashboard with class wide analytics
- Add user accounts so students can track progress over time
- Mobile responsive design

---

## 👤 Author

**Tyler Price**
- GitHub: [@pricefy-dotcom](https://github.com/pricefy-dotcom)
- LinkedIn: https://www.linkedin.com/in/tylertprice/

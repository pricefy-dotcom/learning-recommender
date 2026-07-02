from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from api.recommender import get_recommendations

app = FastAPI(
    title="Learning Recommendation Engine",
    description="Predicts student performance and recommends learning resources",
    version="1.0.0"
)

# Allow requests from the React frontend later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Define what the API expects to receive
class StudentInput(BaseModel):
    G1: int
    G2: int
    failures: int
    Medu: int
    Fedu: int
    higher: int
    studytime: int
    absences: int
    goout: int
    Walc: int
    Dalc: int
    age: int
    romantic: int
    traveltime: int

@app.get("/")
def root():
    return {"message": "Learning Recommendation Engine API is running ✅"}

@app.post("/recommend")
def recommend(student: StudentInput):
    result = get_recommendations(student.dict())
    return result
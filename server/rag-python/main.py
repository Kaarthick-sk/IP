import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS for all origins since this is a placeholder
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectMembersRequest(BaseModel):
    skills_required: list[str] | str
    project_requirements: str

class AnalyzeProjectRequest(BaseModel):
    project_data: dict | str
    query: str

@app.get("/")
def read_root():
    return {"message": "RAG Service is running"}

@app.post("/rag/select-members")
def select_members(request: ProjectMembersRequest):
    # Dummy response
    return {"recommended_members": ["emp1", "emp2", "emp3"]}

@app.post("/rag/analyze-project")
def analyze_project(request: AnalyzeProjectRequest):
    # Dummy response
    return {"analysis": "This project may face risks related to deadlines and resource allocation."}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

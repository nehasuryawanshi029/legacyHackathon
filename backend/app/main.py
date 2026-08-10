from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI(
    title="ATLANTIS AI Student Intelligence Platform",
    description="Backend API powering personalized learning, dynamic study planning, adaptive tutoring, and career skill mapping.",
    version="1.0.0"
)

# Configure CORS for local development with Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def root():
    return {
        "status": "online",
        "platform": "ATLANTIS Integrated AI Student Intelligence Platform",
        "version": "1.0.0",
        "tagline": "Your learning journey, intelligently navigated."
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

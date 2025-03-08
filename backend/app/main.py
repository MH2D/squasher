# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import matches, players

# Initialize database on startup


app = FastAPI(
    title="Squash Leaderboard API",
    description="API for tracking squash games and player rankings",
    version="1.0.0",
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(players.router, prefix="/api/players", tags=["players"])
app.include_router(matches.router, prefix="/api/matches", tags=["matches"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Squash Leaderboard API!"}

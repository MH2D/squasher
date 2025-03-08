# app/schemas/match.py
from datetime import datetime

from pydantic import BaseModel


class MatchBase(BaseModel):
    player1_id: str
    player2_id: str
    player1_score: int
    player2_score: int


class MatchCreate(MatchBase):
    pass


class MatchResponse(MatchBase):
    id: int
    date_played: datetime

    class Config:
        orm_mode = True

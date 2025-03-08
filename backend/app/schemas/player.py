# app/schemas/player.py
from typing import Optional

from pydantic import BaseModel


class PlayerBase(BaseModel):
    name: str


class PlayerCreate(PlayerBase):
    pass


class PlayerUpdate(BaseModel):
    name: Optional[str] = None


class PlayerResponse(PlayerBase):
    id: int
    rating: float
    games_played: int
    games_won: int

    class Config:
        orm_mode = True

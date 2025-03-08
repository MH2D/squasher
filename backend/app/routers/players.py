# app/routers/players.py
import uuid

from app.data.database import get_db, save_db
from app.schemas.player import PlayerCreate, PlayerUpdate
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.post("/")
def create_player(player: PlayerCreate):
    print(dict(player))
    db = get_db()
    db["players"].loc[str(uuid.uuid4())] = {
        **dict(player),
        "rating": 0,
        "games_played": 0,
        "games_won": 0,
    }
    save_db(db)
    return dict(player)


@router.get("/")
def get_all_players():
    db = get_db()
    players = db["players"].reset_index().to_dict(orient="records")
    return players


@router.get("/{player_id}")
def get_player(player_id: str):
    db = get_db()
    player = db["players"].loc[player_id].to_dict()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player


@router.put("/{player_id}")
def update_player(player_id: int, player_update: PlayerUpdate):
    db = get_db()
    player = db["players"].loc[player_id].to_dict()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    # Update only provided fields
    update_data = player_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        player[key] = value

    db["players"].loc[player_id] = player
    save_db(db)
    return player

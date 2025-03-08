# app/routers/matches.py
import uuid

from app.data.database import get_db, save_db
from app.schemas.match import MatchCreate
from fastapi import APIRouter, HTTPException
from loguru import logger

router = APIRouter()


@router.post(
    "/",
)
def create_match(match: MatchCreate):
    logger.critical("hi")
    # Validate players exist
    db = get_db()
    if match.player1_id == match.player2_id:
        raise HTTPException(status_code=400, detail="Players must be different")

    # Create match
    db["matchs"].loc[str(uuid.uuid4())] = dict(match)
    save_db(db)
    print(db["players"])
    print(match)
    player1 = db["players"].loc[match.player1_id]
    player2 = db["players"].loc[match.player2_id]

    # Update player stats
    player1["games_played"] += 1
    player2["games_played"] += 1

    # Determine winner and update stats
    if match.player1_score > match.player2_score:
        player1["games_won"] += 1
        # Update ELO ratings
        player1, player2 = update_elo_ratings(player1, player2, 1)
    elif match.player2_score > match.player1_score:
        player2["games_won"] += 1
        # Update ELO ratings
        player1, player2 = update_elo_ratings(player1, player2, 2)

    db["players"].loc[match.player1_id] = player1
    db["players"].loc[match.player2_id] = player2
    save_db(db)

    return dict(match)


@router.get("/")
def get_all_matches():
    db = get_db()
    matches = db["matchs"].reset_index().to_dict(orient="records")
    return matches


# ELO rating update function
def update_elo_ratings(player1, player2, winner):
    # K-factor determines how much ratings change
    k_factor = 32

    # Calculate expected scores
    expected_score1 = 1 / (1 + 10 ** ((player2["rating"] - player1["rating"]) / 400))
    expected_score2 = 1 / (1 + 10 ** ((player1["rating"] - player2["rating"]) / 400))

    # Actual scores
    actual_score1 = 1 if winner == 1 else 0
    actual_score2 = 1 if winner == 2 else 0

    # Update["rating"]s
    player1["rating"] += k_factor * (actual_score1 - expected_score1)
    player2["rating"] += k_factor * (actual_score2 - expected_score2)
    return player1, player2

import os

import pandas as pd


def get_db():
    current_path = os.getcwd()
    db = {
        "matchs": pd.read_csv(f"{current_path}/app/data/matchs.csv", index_col=0),
        "players": pd.read_csv(f"{current_path}/app/data/players.csv", index_col=0),
    }
    return db


def save_db(db):
    current_path = os.getcwd()
    db["matchs"].to_csv(f"{current_path}/app/data/matchs.csv")
    db["players"].to_csv(f"{current_path}/app/data/players.csv")

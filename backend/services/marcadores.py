import os

import pymongo
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from models.marcador import (Marcador, MarcadorList, MarcadorNew, MarcadorQuery,
                           MarcadorUpdate)

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB") or ""

marcadores_bp = APIRouter(prefix="/marcadores", tags=["marcadores"])

client = pymongo.MongoClient(MONGO_URL)
db = client[MONGO_DB]
marcadores = db.marcadores

##Tomo todos los marcadores de un usuario recibiendo su email
@marcadores_bp.get("/{email}")
async def get_marcadores(email: str):
    emarcadores = marcadores.find({"email": email})
    marcadores_list = []
    for marcador in emarcadores:
        marcadores_list.append(Marcador(**marcador))
    return {"eventos": marcadores_list}

##Creo un nuevo marcador
@marcadores_bp.post("/")
async def create_marcador(marcador: MarcadorNew):
    marcador_dict = marcador.dict()
    marcador_id = marcadores.insert_one(marcador_dict).inserted_id
    return {"id": str(marcador_id)}
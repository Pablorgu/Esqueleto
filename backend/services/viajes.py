import json
import os
from typing import Optional

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Request
from models.viaje import Viaje, ViajeFilter, ViajeId, ViajeList, ViajeNew, ViajeUpdate
from pymongo import MongoClient

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB") or ""

viajes_router = APIRouter(prefix="/viajes", tags=["viajes"])

# Configuración de MongoDB
client = MongoClient(MONGO_URL)
db = client[MONGO_DB]
viajes = db.viajes

@viajes_router.get("/")
def get_viajes(filtro: ViajeFilter = ViajeFilter()):
    filter = filtro.to_mongo_dict(exclude_none=True)
    viajes_data = viajes.find(filter)
    return ViajeList(viajes=[viaje for viaje in viajes_data]).model_dump(exclude_none=True)

@viajes_router.post("/")
def post_viaje(viaje: ViajeNew):
    viaje_id = viajes.insert_one(viaje.dict()).inserted_id
    return {"id": str(viaje_id)}

@viajes_router.get("/viajes/{email}")
def get_viajes_by_email(email: str):
    viajes = viajes.find({"email": email})
    return [viaje for viaje in viajes]  

@viajes_router.get("/marcadores/{email}")
def get_marcadores_by_email(email: str):
    viajes_data = viajes.find({"emailUsuario": email})
    marcadores_ids = [viaje["idMarcador"] for viaje in viajes_data]
    marcadores = viajes.find({"_id": {"$in": marcadores_ids}})
    return [marcador for marcador in marcadores]
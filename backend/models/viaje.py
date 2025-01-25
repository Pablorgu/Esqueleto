import re
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator
from pydantic_mongo import PydanticObjectId
from models.baseMongo import MongoBase

class ViajeId(BaseModel, MongoBase):
    idViaje: PydanticObjectId

class ViajeFilter(BaseModel, MongoBase):
    idMarcador: Optional[PydanticObjectId] = None
    emailUsuario: Optional[str] = None
    imagen: Optional[str] = None

    @field_validator("emailUsuario")
    def make_regex(cls, v):
        if v is not None:
            return {"$regex": v, "$options": "i"}
        return v

class Viaje(BaseModel, MongoBase):
    id: PydanticObjectId = Field(alias="_id")
    idMarcador: PydanticObjectId
    emailUsuario: str
    imagen: str

class ViajeNew(BaseModel, MongoBase):
    idMarcador: PydanticObjectId
    emailUsuario: str
    imagen: str

class ViajeUpdate(BaseModel, MongoBase):
    idMarcador: Optional[PydanticObjectId] = None
    emailUsuario: Optional[str] = None
    imagen: Optional[str] = None

class ViajeList(BaseModel):
    viajes: List[Viaje]

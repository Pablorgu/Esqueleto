from typing import List, Optional
from pydantic import BaseModel, Field, field_validator
from pydantic_mongo import PydanticObjectId

from models.baseMongo import MongoBase


class MarcadorId(BaseModel, MongoBase):
    idMapa: PydanticObjectId

class MarcadorFilter(BaseModel,MongoBase):
    lat:Optional[str] = None
    lon:Optional[str] = None


    @field_validator("lat", "lon", mode="before")
    def make_regex(cls, v):
        if v is not None:
            return {"$regex": v, "$options": "i"}  # Convertir en regex si no es None
        return v


class Marcador(BaseModel, MongoBase):
    id: PydanticObjectId = Field(alias="_id")
    lat: str
    lon: str


class MarcadorNew(BaseModel, MongoBase):
    lat: str
    lon: str


class MarcadorUpdate(BaseModel, MongoBase):
    lat: Optional[str] = None
    lon: Optional[str] = None


class MarcadorList(BaseModel):
    marcadores: List[Marcador]

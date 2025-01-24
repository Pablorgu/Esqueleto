from datetime import datetime
from typing import List, Optional

from models.baseMongo import MongoBase
from pydantic import BaseModel, Field, field_validator
from pydantic_mongo import PydanticObjectId


class Marcador(BaseModel, MongoBase):
    id: PydanticObjectId = Field(alias="_id")
    email: str
    lat: str
    lon: str
    imagen: str

class MarcadorNew(BaseModel, MongoBase):
    email: str
    lat: str
    lon: str
    imagen: str
    

class MarcadorUpdate(BaseModel, MongoBase):
    email: Optional[str] = None
    lat: Optional[str] = None
    lon: Optional[str] = None
    imagen: Optional[str] = None

class MarcadorQuery(BaseModel):
    email: Optional[str] = None
    lat: Optional[str] = None
    lon: Optional[str] = None
    imagen: Optional[str] = None

class MarcadorList(BaseModel):
    marcadores: List[Marcador]

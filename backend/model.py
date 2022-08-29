from pydantic import BaseModel


class Config:
    orm_mode = True


class Jobs_List(BaseModel):
    title: str
    description: str

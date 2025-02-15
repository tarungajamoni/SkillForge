from sqlalchemy import Column, Integer, String
from app.db.database import Base, engine
from pydantic import BaseModel, EmailStr

# 1. SQLAlchemy Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# 2. Create DB tables if they don't exist
Base.metadata.create_all(bind=engine)

# 3. Pydantic Schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime 
from app.db.database import Base, engine
from pydantic import BaseModel, EmailStr

# SQLAlchemy Models
# User
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# Course
class Course(Base):
    __tablename__ = 'courses'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    modules = relationship('Module',back_populates="course", cascade='all,delete')

# Module
class Module(Base):
    __tablename__ = 'modules'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    order = Column(Integer)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)

    course = relationship("Course",back_populates="modules")

    lessons = relationship("Lesson", back_populates="module", cascade="all,delete")

# Lesson
class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text)
    order = Column(Integer)
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False)

    module = relationship("Module", back_populates='lessons')

# Create all DB tables if they don't exist
Base.metadata.create_all(bind=engine)

# Pydantic Schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class CourseCreate(BaseModel):
    title: str
    description: str

class ModuleCreate(BaseModel):
    title: str
    description: str
    order: int
    course_id: int

class LessonCreate(BaseModel):
    title: str
    content: str
    video_url: str = None
    order: int
    module_id: int

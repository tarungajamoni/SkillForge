from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.db.models import Course, Module, Lesson

router = APIRouter()

@router.get('/',response_model=List[dict])
def get_courses(db:Session = Depends(get_db)):
    courses = db.query(Course).all()
    return [{"id": course.id, "title":course.title, 'description':course.description, 'created_at':course.created_at} for course in courses]

@router.get("/{course_id}/modules", response_model=List[dict])
def get_course_module(course_id: int, db:Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    modules = course.modules
    return [{"id": module.id, "title":module.title, 'description':module.description, 'order':module.order} for module in modules]

@router.get("/{module_id}/lessons", response_model=List[dict])
def get_module_module(module_id: int, db:Session = Depends(get_db)):
    module = db.query(Course).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    lessons = module.lessons
    return [{"id": lesson.id, "title":lesson.title, 'content':lesson.content, 'order':lesson.order} for lesson in lessons]
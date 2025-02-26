from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.db.models import Course, Module, Lesson, CourseSchema, ModuleSchema, LessonSchema

router = APIRouter()

@router.get('/',response_model=List[dict])
def get_courses(db:Session = Depends(get_db)):
    courses = db.query(Course).all()
    return [{"id": course.id, "title":course.title, 'description':course.description, 'created_at':course.created_at} for course in courses]

@router.post("/")
def create_course(course: CourseSchema, db: Session = Depends(get_db)):
    new_course = Course(title=course.title, description=course.description)
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@router.put('/{course_id}')
def update_course(course_id:int, course:CourseSchema, db:Session = Depends(get_db)):
    db_course = db.query(Course).filter(Course.id==course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    db_course.title = course.title
    db_course.description = course.description
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete('/{course_id}')
def delete_course(course_id:int, db:Session = Depends(get_db)):
    db_course = db.query(Course).filter(Course.id==course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(db_course)
    db.commit()
    return {"message":"Course deleted successfully"}

@router.get("/{course_id}/modules", response_model=List[dict])
def get_modules(course_id: int, db:Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    modules = db.query(Module).filter(Module.course_id==course_id).all()
    return [{"id": module.id, "title":module.title, 'description':module.description, 'order':module.order} for module in modules]

@router.post("/{course_id}/modules")
def create_module(course_id: int, module: ModuleSchema, db: Session = Depends(get_db)):
    new_module = Module(title=module.title, description=module.description, course_id=course_id)
    db.add(new_module)
    db.commit()
    db.refresh(new_module)
    return new_module

@router.put('/modules/{module_id}')
def update_module(module_id:int, module:ModuleSchema, db:Session = Depends(get_db)):
    db_module = db.query(Module).filter(Module.id==module_id).first()
    if not db_module:
        raise HTTPException(status_code=404, detail="Module not found")
    db_module.title = module.title
    db_module.description = module.description
    db.commit()
    db.refresh(db_module)
    return db_module

@router.delete('/modules/{module_id}')
def delete_module(module_id:int, db:Session = Depends(get_db)):
    db_module = db.query(Module).filter(Module.id==module_id).first()
    if not db_module:
        raise HTTPException(status_code=404, detail="Module not found")
    db.delete(db_module)
    db.commit()
    return {"message":"Module deleted successfully"}

@router.get("/{module_id}/lessons", response_model=List[dict])
def get_lesson(module_id: int, db:Session = Depends(get_db)):
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Lesson not found")
    lessons = db.query(Lesson).filter(Lesson.module_id == module_id).all()
    return [{"id": lesson.id, "title":lesson.title, 'description':lesson.description, 'order':lesson.order} for lesson in lessons]

@router.post("/{module_id}/lessons")
def create_lesson(module_id:int, lesson: LessonSchema, db: Session = Depends(get_db)):
    new_lesson = Lesson(title=lesson.title, description=lesson.description, module_id=module_id)
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return new_lesson

@router.put('/lessons/{lesson_id}')
def update_lesson(lesson_id:int, lesson:LessonSchema, db:Session = Depends(get_db)):
    db_lesson = db.query(Lesson).filter(Lesson.id==lesson_id).first()
    if not db_lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    db_lesson.title = lesson.title
    db_lesson.description = lesson.description
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

@router.delete('/lessons/{lesson_id}')
def delete_lesson(lesson_id:int, db:Session = Depends(get_db)):
    db_lesson = db.query(Lesson).filter(Lesson.id==lesson_id).first()
    if not db_lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    db.delete(db_lesson)
    db.commit()
    return {"message":"Lesson deleted successfully"}
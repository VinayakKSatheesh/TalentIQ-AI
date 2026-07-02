from fastapi import APIRouter

from app.api.health import router as health_router
from app.api.search import router as search_router
from app.api.candidate import router as candidate_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(search_router)
api_router.include_router(candidate_router)
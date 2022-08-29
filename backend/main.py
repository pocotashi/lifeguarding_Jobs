from database import (
    fetch_all_job_list,
    fetch_one_job_list,
    create_jobs_list,
    remove_jobs_list,
    update_jobs_list
)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import Jobs_List

app = FastAPI()


origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def read_root():
    return {"Ping": "Pong"}


@app.get("/api/jobs_list/")
async def get_jobs_list():
    response = await fetch_all_job_list()
    return response


@app.get("/api/jobs_list{title}/", response_model=Jobs_List)
async def get_jobs_list_by_id(title):
    response = await fetch_one_job_list(title)
    if response:
        return response
    raise HTTPException(404, f"There is no job post with this title {title}")


@app.post("/api/jobs_list/", response_model=Jobs_List)
async def post_jobs_list(jobs_list: Jobs_List):
    response = await create_jobs_list(jobs_list.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@app.put("/api/jobs_list{title}/", response_model=Jobs_List)
async def put_jobs_list(title: str, desc: str):
    response = await update_jobs_list(title, desc)
    if response:
        return response
    raise HTTPException(404, f"There is no job post with this title {title}")


@app.delete("/api/jobs_list{title}/")
async def delete_jobs_list(title):
    response = await remove_jobs_list(title)
    if response:
        return "Successfully deleted job post"
    raise HTTPException(404, f"There is no job post with this title {title}")

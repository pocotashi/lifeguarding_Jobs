from pydoc import cli, doc
from xml.dom.minidom import Document
from model import Jobs_List

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.JobsList
collection = database.jobslist


async def fetch_one_job_list(title):
    document = await collection.find_one({"title": title})
    return document


async def fetch_all_job_list():
    jobslist = []
    cursor = collection.find({})
    async for document in cursor:
        jobslist.append(Jobs_List(**document))
    return jobslist


async def create_jobs_list(jobslist):
    document = jobslist
    result = await collection.insert_one(document)
    return result


async def update_jobs_list(title, desc):
    await collection.update_one({"title": title}, {"$set": {
        "description": desc
    }})

    document = await collection.find_one({"title": title})
    return document


async def remove_jobs_list(title):
    await collection.delete_one({"title": title})
    return True

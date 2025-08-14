from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import fitz  # PyMuPDF
from pymongo import MongoClient
import os

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection setup
client = MongoClient("mongodb://localhost:27017/")
db = client["doxtract_db"]
collection = db["extracted_docs"]

# Dummy login endpoint
@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    if username == "admin" and password == "password":
        return {"token": "dummy-token"}
    return JSONResponse(content={"error": "Invalid credentials"}, status_code=401)

# Upload and extract PDF text, then store in MongoDB
@app.post("/upload")
async def upload_document(document: UploadFile = File(...)):
    content = await document.read()

    # Save to temp file
    with open("temp.pdf", "wb") as f:
        f.write(content)

    # Extract text from PDF
    doc = fitz.open("temp.pdf")
    extracted_text = ""
    for page in doc:
        extracted_text += page.get_text()
    doc.close()

    # Optional: remove temp file
    os.remove("temp.pdf")

    # Save to MongoDB
    data = {
        "filename": document.filename,
        "text": extracted_text
    }
    result = collection.insert_one(data)

    return {
        "message": "Upload successful and data stored in MongoDB.",
        "filename": document.filename,
        "document_id": str(result.inserted_id),
        "text": extracted_text
    }

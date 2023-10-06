# to run:       uvicorn main:app
# to reload:    uvicorn main:app --reload

""""________________________________________
    |                                       |
    |           imports                     |
    |_______________________________________|
"""
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai

#custom imports
from functions.openai_requests import convert_audio_to_text, get_bot_response
from functions.database import get_recent_messages, store_message, reset_messages
from functions.elevenlabs_requests import convert_text_to_audio

""""________________________________________
    |                                       |
    |           app funcs                   |
    |_______________________________________|
"""
# init app
app = FastAPI()

# Cors - origins
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:4174",
    "http://localhost:3000",
]

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])


@app.get("/reset/")
async def first_response():
    reset_messages()
    print("messages reset")
    return {"message": "messages reset"}


@app.get("/first-response/")
async def first_response():
    reset_messages()
    bot_response = get_bot_response("")

    audio_out = convert_text_to_audio(bot_response)

    def iterfile():
        yield audio_out

    return StreamingResponse(iterfile(), media_type="audio/mpeg")




# post bot response
# nopt playing in browswer when using post request

@app.post("/post-audio/")
async def post_audio(file: UploadFile = File(...)):

    # # get my audio file
    # audio_in = open("sto bene.mp3", "rb")

    # save file from request
    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())

    audio_in = open(file.filename, "rb")

    # decode
    message = convert_audio_to_text(audio_in)
    print(message)

    # create a generator to stream the response chunk by chunk
    def iterfile():
        yield audio_out

    return StreamingResponse(iterfile(), media_type="application/octet-stream")

@app.post("/post-audio-get/")
async def get_audio(file: UploadFile = File(...)):

    # # get my audio file
    # audio_in = open("sto bene.mp3", "rb")

    # save file from request
    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())

    audio_in = open(file.filename, "rb")

    # decode
    message = convert_audio_to_text(audio_in)

    # get GPT response
    bot_response = get_bot_response(message)
    print(bot_response)

    # convert to audio
    audio_out = convert_text_to_audio(bot_response)

    # create a generator to stream the response chunk by chunk
    def iterfile():
        yield audio_out

    return StreamingResponse(iterfile(), media_type="application/octet-stream")




    #return {"message": bot_response}

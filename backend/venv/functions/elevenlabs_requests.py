from elevenlabs import generate, play, save, stream
from decouple import config

from elevenlabs import set_api_key

# api key config
ELEVEN_API_KEY = config("ELEVEN_API_KEY")
set_api_key(ELEVEN_API_KEY)
def convert_text_to_audio(text: str) -> bytes:
    audio = generate(text=text, voice="Bella",model="eleven_multilingual_v2")
    return audio


# audio = generate(
#   text="Hello! 你好! Hola! नमस्ते! Bonjour! こんにちは! مرحبا! 안녕하세요! Ciao! Cześć! Привіт! வணக்கம்!",
#   voice="Bella"
#   #model="eleven_multilingual_v2"
# )

# save(audio, "response.mp3")

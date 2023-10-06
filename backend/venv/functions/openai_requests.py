import openai
from decouple import config
from functions.database import get_recent_messages, store_message, reset_messages

#read api key from .env file
openai.api_key = config('OPEN_AI_KEY')
openai.organization = config('OPEN_AI_ORG')

# openAI whisper

def convert_audio_to_text(audio_file):
    try:
        transcript = openai.Audio.transcribe("whisper-1",audio_file)
        message = transcript['text']
        return message
    except Exception as e:
        print(e)
        return

    response = openai.File.create(file=open(audio_file, 'rb'))
    file_id = response.id
    response = openai.File(file_id).get()
    return response['object']

#get bot response
def get_bot_response(message, language="italian", subject="food"):
    messages = get_recent_messages()
    if message:
        user_message = {"role": "user", "content": message}

        #store message
        store_message(user_message)
        messages.append(user_message)

    print(messages)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=50,
    )
    print(response)

    # store response message


    message_text = response['choices'][0]['message']['content']
    bot_message = {"role": "assistant", "content":message_text}
    store_message(bot_message)


    return message_text



def initial_response(language="italian", subject="food"):
    messages = get_recent_messages()
    if message:
        user_message = {"role": "user", "content": message}

        #store message
        store_message(user_message)
        messages.append(user_message)

    print(messages)
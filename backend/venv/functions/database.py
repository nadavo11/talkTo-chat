import json
import random

# get recent messages
def get_recent_messages():

    file_name = 'history.json'
    initial_instructions = {"role": "system", "content": f"You are an italian teacher, managing a conversation in italian. your name is Ciara. speak in simple italian. use basic words, and make short responses. "}

    messages =[initial_instructions]

    #get last messages
    try:
        with open(file_name) as json_file:
            data = json.load(json_file)
            if data:
                last_messages = [item for item in data]
                messages = messages + last_messages[-5:]

    except Exception as e:
        print(e)
        pass

    return messages

def store_message(message):

    file_name = 'history.json'

    # get last messages
    messages = get_recent_messages()[1:]

    # add new message
    messages.append(message)

    with open(file_name, "w") as json_file:
        json.dump(messages, json_file)

    # close file
    json_file.close()
    # try:
    #     with open(file_name,"w") as json_file:
    #         data = json.load(json_file)
    #         data.append(message)
    #         json.dump(data, json_file)
    # except Exception as e:
    #     print("store messege error: ",e)
    #     pass

    return

def reset_messages():

    #overrite file
    file_name = 'history.json'
    open(file_name, 'w').close()

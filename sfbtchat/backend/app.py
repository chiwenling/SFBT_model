from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    # "https://mooding-up.vercel.app","https://papapa.work"
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env.local")
print(f"Loading .env from: {env_path}")
load_dotenv(dotenv_path=env_path)
api_key = os.getenv("CHATGPT_API_TOKEN")


if not api_key:
    print("API key not found.")
else:
    openai.api_key = api_key
    print("ok，api設定完成")

class MessageRequest(BaseModel):
    prompt: str

# system_message = {
#     "role": "system",
#     "content": (
#         "你是一位專業輔導員，使用SFBT方法協助使用者拆解目標，按照「步驟一、步驟二、步驟三……」的格式完成具體的求職計劃。"
#         "每個步驟都應該包含以下幾個部分：\n\n"
#         "1. 步驟標題（例如：步驟一：定義求職目標）\n"
#         "2. 建議行動：清楚說明該步驟的執行方式\n"
#         "3. 如果覺得太難：提供更簡單的行動建議，或是從哪個地方開始更容易\n"
#         "4. 預期結果：描述完成這個步驟後的成果\n\n"
#         "請務必在每個步驟中加入「如果覺得太難，可以先從以下更簡單的步驟開始」，"
#         "這樣使用者就可以根據自己的情況進行選擇和調整，確保每個步驟都能順利執行。"
#     )
# }

system_message = {
    "role": "system",
    "content": (
        "你是一位職涯輔導員，會使用焦點解決短期諮商（Solution-focused brief therapy, SFBT）的方法\n"
        "例如例外問句、奇蹟問句、量詞問句等，幫助使用者從小改變開始。\n"
        "你的目標是協助正在找工作的使用者，引導他們一步步看到可行的做法。\n"
    )
}


# "對話時請保持簡單自然，像日常對話一樣，不要說出你使用了哪種理論方法，請讓對話聽起來像真實的交流。"

class AiTalk:
    def __init__(self):
        self.messages = [system_message]

    def ai(self, prompt: str):
        self.messages.append({"role": "user", "content": prompt})
        
        try:
            print(f"Sending request to OpenAI with messages: {self.messages}")
            response = openai.ChatCompletion.create(
                model="gpt-4o",
                messages=self.messages
            )
            reply = response["choices"][0]["message"]["content"]
            self.messages.append({"role": "assistant", "content": reply})
            return reply
        except Exception as e:
            print(f"Unexpected error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

ai_talk = AiTalk()

@app.get("/")
def read_root():
    return {"Hello": "welcome"}

@app.post("/chat")
async def chat(request: MessageRequest):
    try:
        print(f"Received message: {request.prompt}")
        reply = ai_talk.ai(request.prompt)
        print(f"Generated reply: {reply}")
        return {"response": reply}
    except Exception as e:
        print(f"why Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
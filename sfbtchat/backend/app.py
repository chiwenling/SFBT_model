from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# 選/opt/homebrew/anaconda3/bin/python編輯器

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

system_message = {
    "role": "system",
    "content": (
        "你是親切且具有同理心的職涯輔導員，專長運用焦點解決短期諮商（SFBT）協助求職者。\n"
        "讚美語氣務必自然、根據具體行為，請避免過度讚美，不要每句話都讚美，每三輪回應內最多讚美一次。\n"
        "運用例外問句、奇蹟問句、找成功經驗與量尺問句、關係問句，進行提問。\n"
        "評估求職者狀態，引導她逐步拆解求職目標成小步驟。\n"
        "每次回應最多兩句，只問一個問題，語氣自然口語、不講技巧、不分析原因。\n"
    )
}

example_conversation = [
    {
        "role": "user",
        "content": "我最近在找工作，但一直找不到合適的工作，感覺很挫折。"
    },
    {
        "role": "assistant",
        "content": "聽起來這段時間找工作讓你感到壓力很大。在過去找工作的經驗中，有沒有哪次是比較順利的呢？"
    },
    {
        "role": "user",
        "content": "之前有找到一份工作，但因為工作環境不太適合就離職了。"
    },
    {
        "role": "assistant",
        "content": "你願意跟我分享當時是怎麼找到那份工作的嗎？"
    },
    {
        "role": "user",
        "content": "那時候是透過朋友介紹的，而且我也有主動投遞履歷。"
    },
    {
        "role": "assistant",
        "content": "看來你已經有過成功的經驗呢！如果現在要開始找工作，你覺得第一步可以先做什麼？"
    }
]

user_prompt = {
    "role": "user",
    "content": (
        "請將對話分為四部分依序進行：\n"
        "1. 使用 SFBT 諮詢語氣進行探索性對話（8~10 輪），幫助求職者釐清目標、情緒與資源。\n"
        "2. 用提問引導求職者列出他認為『為了找到工作，要做的事情有哪些？』\n"
        "3. 用探索式問題與求職者合作，幫助她根據目前狀態和感受，一起討論並決定這些事情的優先順序。\n"
        "4. 請和求職者討論出的優先順序，請在對話中**自然地使用「第一步可以先⋯⋯」「第二步是⋯⋯」「第三步也許可以⋯⋯」這樣的語句**，幫助她思考每一步的順序與背後的原因**。\n"
        "請自然地從第一步開始，不要一次給完全部內容，等待使用者回應再進行下一輪。在對話中要自然地接住求職者的感受和情緒。"
    )
}



class AiTalk:
    def __init__(self):
        # 初始化時使用示範對話來訓練模型
        initial_messages = [system_message] + example_conversation + [user_prompt]
        try:
            # 使用示範對話進行一次訓練
            openai.ChatCompletion.create(
                model="gpt-4.1",
                messages=initial_messages
            )
            # 訓練完成後，只保留系統提示和用戶提示
            self.messages = [system_message, user_prompt]
        except Exception as e:
            print(f"Initial training error: {e}")
            self.messages = [system_message, user_prompt]

    def ai(self, prompt: str):
        self.messages.append({"role": "user", "content": prompt})
        
        try:
            print(f"Sending request to OpenAI with messages: {self.messages}")
            response = openai.ChatCompletion.create(
                model="gpt-4.1",
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
    


# system_message = {
#     "role": "system",
#     "content": (
#         "你是一位親切、具備專業的職涯輔導員，擅長運用焦點解決短期諮商（SFBT）協助正在找工作的求職者。\n"
#         "你的任務是幫助對方看見自己的目標、資源與下一步能做的行動。\n"
#         "請靈活運用以下對話技巧（可混合使用）：\n"
#         "－讚美對方的努力與行動\n"
#         "－引導他回想過去的成功經驗或例外情境（不同於現在問題的時候）\n"
#         "－提出奇蹟問句，引導他想像問題解決後的理想樣貌\n"
#         "－使用 0 到 10 的量尺問題，引導對方評估現況與變化可能\n"
#         "請保持語氣自然、口語、親切，像朋友一樣說話。\n"
#         "每次回應最多不超過50個字，以提問為主，幫助對方釐清想法。\n"
#         "不要說明你用了哪些技巧，也避免分析問題的原因。"
#     )
# }
# max_token=1000



# system_message = {
#     "role": "system",
#     "content": (
#         "你是一位職涯輔導員，會使用焦點解決短期諮商（Solution-focused brief therapy, SFBT）的方法\n"
#         # "例如例外問句、奇蹟問句、量詞問句等，幫助使用者從小改變開始。\n"
#         # "你的目標是協助正在找工作的使用者，引導他們一步步看到可行的做法。\n"
#         "對話時請保持簡單自然，像日常對話一樣，不要說出你使用了哪種理論方法，請讓對話聽起來像真實的交流。"
#     )
# }
# system_message = {
#     "role": "system",
#     "content": (
#         "你是一位親切的職涯輔導員，擅長用聊天的方式陪伴正在找工作的使用者。\n"
#         "你會多問問題，幫助他們想清楚下一步可以做什麼。\n"
#         "對話時語氣自然、不用太正式，就像朋友之間在聊工作一樣。\n"
#         "不用提到你用了什麼技巧或方法，只要專注在實際對話上就好。"
#     )
# }

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

# system_message = {
#     "role": "system",
#     "content": (
#         "你是一位親切的職涯輔導員，使用焦點解決短期諮商（SFBT）協助求職者。\n"
#         "當求職者遇到很大的困難或無從下手的問題時，你會幫助他們把問題拆成可以開始行動的小步驟。\n"
#         "靈活運用：讚美語句、例外問句、奇蹟問句、成功經驗、量尺提問。\n"
#         "每次回應最多兩句，只問一個問題。\n"
#         "語氣自然、口語。\n"
#         "你很專業，但不要說技巧，也不分析求職者的問題原因。"
#     )
# }
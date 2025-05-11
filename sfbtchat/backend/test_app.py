from dotenv import load_dotenv
import os
import openai
from app import AiTalk

def test_ai_with_real_api():
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env.local")
    load_dotenv(dotenv_path=env_path)
    api_key = os.getenv("CHATGPT_API_TOKEN")
    assert api_key is not None
    openai.api_key = api_key
    ai_talk = AiTalk()
    reply = ai_talk.ai("你好嗎？")
    assert isinstance(reply, str)
    assert len(reply) > 0
    print(f"AI 回應: {reply}")

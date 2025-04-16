import os
from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()  # загружает переменные из .env

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Нет сообщения"}), 400

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Ты — юридический консультант по законодательству Казахстана. Отвечай ясно и по делу. Не давай советы, если не уверен."},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

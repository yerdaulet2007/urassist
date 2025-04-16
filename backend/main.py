import os
from flask import Flask, request, jsonify, render_template
import openai
from flask_cors import CORS
from dotenv import load_dotenv
# Загружаем переменные окружения из .env
load_dotenv()

# Определяем абсолютные пути к папкам templates и static
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATES_PATH = os.path.join(BASE_DIR, '..', 'templates')
STATIC_PATH = os.path.join(BASE_DIR, '..', 'static')

# Инициализация Flask с указанием путей к шаблонам и статике
app = Flask(__name__, template_folder=TEMPLATES_PATH, static_folder=STATIC_PATH)
CORS(app)

# Подключение OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

# Роут для главной страницы
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

# Роут для остальных страниц (если нужно)
@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/calculator")
def calculator():
    return render_template("calculator.html")

@app.route("/ai")
def ai():
    return render_template("ai.html")

@app.route("/articles")
def articles():
    return render_template("articles.html")

# Роут для обработки POST-запроса от AI формы
@app.route("/ask", methods=["POST"])
def ask():
    import traceback
    print("🛠 POST /ask был вызван")

    data = request.json
    print("Полученные данные:", data)

    user_message = data.get("message", "")
    print("📩 user_message:", user_message)

    print("🔑 OpenAI API key начинается с:", openai.api_key[:5])

    if not user_message:
        return jsonify({"error": "Нет сообщения"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Ты — юридический консультант по законодательству Казахстана. Отвечай ясно и по делу. Не давай советы, если не уверен."},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response.choices[0].message["content"]
        print(f"🤖 Ответ от OpenAI: {reply}")
        return jsonify({"reply": reply})
    except Exception as e:
        traceback_str = traceback.format_exc()
        print("❌ Произошла ошибка:")
        print(traceback_str)
        return jsonify({"error": str(e), "traceback": traceback_str}), 500



# Запуск приложения
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

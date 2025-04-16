import os
from flask import Flask, request, jsonify, render_template
import openai
from flask_cors import CORS
from dotenv import load_dotenv
import traceback  # Импортируем для отладки

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
    print("🛠 POST /ask был вызван")
    try:
        data = request.get_json()
        print("📩 Получен JSON:", data)

        user_message = data.get("message", "")
        print("💬 Сообщение от пользователя:", user_message)

        if not user_message:
            return jsonify({"error": "Нет сообщения"}), 400

        # Новый код с правильным использованием v1/chat/completions
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",  # В зависимости от версии используем подходящую модель
            messages=[
                {"role": "system", "content": "Ты — юридический консультант по законодательству Казахстана. Отвечай ясно и по делу. Не давай советы, если не уверен."},
                {"role": "user", "content": user_message}
            ]
        )

        reply = response['choices'][0]['message']['content'].strip()  # Обрабатываем ответ
        print("✅ Ответ от OpenAI:", reply)
        return jsonify({"reply": reply})

    except Exception as e:
        print("❌ Ошибка:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# Запуск приложения
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

import os
from flask import Flask, request, jsonify
import openai  # Используйте openai, а не OpenAI
from flask_cors import CORS
from dotenv import load_dotenv

# Загружаем переменные окружения из .env файла
load_dotenv()

app = Flask(__name__)

# Разрешаем кросс-доменные запросы
CORS(app)

# Инициализация OpenAI с использованием API-ключа из переменных окружения
openai.api_key = os.getenv("OPENAI_API_KEY")

# Маршрут для обработки POST-запросов на /ask
@app.route("/ask", methods=["POST"])
def ask():
    # Получаем данные из запроса
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Нет сообщения"}), 400

    try:
        # Отправляем запрос к OpenAI API для получения ответа
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Ты — юридический консультант по законодательству Казахстана. Отвечай ясно и по делу. Не давай советы, если не уверен."},
                {"role": "user", "content": user_message}
            ]
        )

        # Извлекаем ответ и возвращаем его в формате JSON
        reply = response.choices[0].message["content"]
        return jsonify({"reply": reply})

    except Exception as e:
        # Возвращаем ошибку, если что-то пошло не так
        return jsonify({"error": str(e)}), 500

# Маршрут для домашней страницы
@app.route("/", methods=["GET"])
def home():
    return "Hello, welcome to Urassist!"  # Или возвращайте HTML страницу, если необходимо

if __name__ == "__main__":
    # Получаем порт из переменной окружения (для Render) или используем 5000 по умолчанию
    port = int(os.environ.get("PORT", 5000))
    # Запускаем приложение на всех адресах, чтобы оно было доступно извне
    app.run(host="0.0.0.0", port=port)

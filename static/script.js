function setLanguage(lang) {
    alert(`Язык установлен: ${lang.toUpperCase()}\n(в будущем подгрузим переводы)`);
  
    // В будущем: здесь будет логика замены текста на нужный язык
  }
  
  $(document).ready(function () {
    // При клике на кнопку показываем соответствующую форму
    $(".consultation-button").on("click", function () {
      var section = $(this).data("section");
      $(".form-container").hide(); // Скрыть все формы
      loadForm(section); // Загружаем нужную форму
    });
  
    // Функция для загрузки формы по названию секции
    function loadForm(section) {
      var formHtml = "";
    
      switch (section) {
        case "registration":
          formHtml = `
            <h3>📄 Регистрация ИП/ТОО</h3>
            <form data-section="registration">
              <label>Выберите форму бизнеса:</label><br>
              <div class="radio-group">
                <label><input type="radio" name="business-form" value="ИП"> ИП</label>
                <label><input type="radio" name="business-form" value="ТОО"> ТОО</label>
              </div>
    
              <label>Регион:</label><br>
              <select name="region">
                <option value="Алматы">Алматы</option>
                <option value="Нур-Султан">Нур-Султан</option>
                <option value="Шымкент">Шымкент</option>
              </select><br>
    
              <label>Вид деятельности:</label><br>
              <input type="text" name="activity-type" placeholder="ОКЭД..."><br>
    
              <label>Будет ли у вас наёмный персонал?</label><br>
              <div class="radio-group">
                <label><input type="radio" name="staff" value="yes"> Да</label>
                <label><input type="radio" name="staff" value="no"> Нет</label>
              </div>
    
              <label>Когда планируете начать работу?</label><br>
              <input type="date" name="start-date"><br><br>
    
              <button type="submit">Получить пошаговую инструкцию</button>
            </form>
          `;
          break;
    
        case "fines":
          formHtml = `
            <h3>💸 Штрафы и проверки</h3>
            <form data-section="fines">
              <label>Тип бизнеса:</label><br>
              <div class="radio-group">
                <label><input type="radio" name="business-type" value="ИП"> ИП</label>
                <label><input type="radio" name="business-type" value="ТОО"> ТОО</label>
              </div>
    
              <label>Есть ли офис/точка продаж?</label><br>
              <div class="radio-group">
                <label><input type="radio" name="office" value="yes"> Да</label>
                <label><input type="radio" name="office" value="no"> Нет</label>
              </div>
    
              <label>Вас уже проверяли?</label><br>
              <div class="radio-group">
                <label><input type="radio" name="checked" value="yes"> Да</label>
                <label><input type="radio" name="checked" value="no"> Нет</label>
              </div>
    
              <label>Причина запроса:</label><br>
              <select name="reason">
                <option value="проверка">Пришла проверка</option>
                <option value="чек">Не пробили чек</option>
                <option value="жалоба">Жалоба клиента</option>
                <option value="налоги">Просрочка налогов</option>
              </select><br><br>
    
              <button type="submit">Узнать риски / Что делать в этой ситуации?</button>
            </form>
          `;
          break;
    
        case "legislation":
          formHtml = `
            <h3>📍 Местное законодательство</h3>
            <form data-section="legislation">
              <label>Регион:</label><br>
              <select name="region">
                <option value="Алматы">Алматы</option>
                <option value="Нур-Султан">Нур-Султан</option>
                <option value="Шымкент">Шымкент</option>
              </select><br>
    
              <label>Сфера деятельности:</label><br>
              <select name="activity">
                <option value="торговля">Торговля</option>
                <option value="услуги">Услуги</option>
                <option value="строительство">Строительство</option>
                <option value="общепит">Общепит</option>
              </select><br>
    
              <label>Интересующая тема:</label><br>
              <select name="topic">
                <option value="аренда">Аренда гос. имущества</option>
                <option value="торговля">Уличная торговля</option>
                <option value="санитарные">Санитарные нормы</option>
                <option value="рабочее-время">Рабочее время</option>
              </select><br><br>
    
              <button type="submit">Показать местные правила</button>
            </form>
          `;
          break;
    
        case "rent":
          formHtml = `
            <h3>🏢 Аренда и недвижимость</h3>
            <form data-section="rent">
              <label>Где планируете арендовать помещение?</label><br>
              <select name="region">
                <option value="Алматы">Алматы</option>
                <option value="Нур-Султан">Нур-Султан</option>
                <option value="Шымкент">Шымкент</option>
              </select><br>
    
              <label>Назначение помещения:</label><br>
              <select name="purpose">
                <option value="офис">Офис</option>
                <option value="магазин">Магазин</option>
                <option value="склад">Склад</option>
                <option value="производство">Производство</option>
              </select><br>
    
              <label>Сторона сделки:</label><br>
              <div class="radio-group">
                <label><input type="radio" name="role" value="арендатор"> Я арендатор</label>
                <label><input type="radio" name="role" value="арендодатель"> Я арендодатель</label>
              </div><br>
    
              <button type="submit">Получить консультацию по аренде</button>
            </form>
          `;
          break;
    
        case "protection":
          formHtml = `
            <h3>🛡 Защита прав предпринимателя</h3>
            <form data-section="protection">
              <label>Проблема:</label><br>
              <select name="problem">
                <option value="проверка">Проверка госорганов</option>
                <option value="жалоба">Жалоба клиента</option>
                <option value="конкуренты">Давление со стороны конкурентов</option>
                <option value="арендодатель">Нарушение со стороны арендодателя</option>
              </select><br>
    
              <label>Есть ли документы?</label><br>
              <div class="radio-group">
                <label><input type="radio" name="has-documents" value="yes"> Да</label>
                <label><input type="radio" name="has-documents" value="no"> Нет</label>
              </div>
    
              <label>Что вы хотите получить?</label><br>
              <select name="action">
                <option value="жалоба">Шаблон жалобы</option>
                <option value="советы">Советы по защите</option>
                <option value="анализ">Анализ ситуации</option>
              </select><br><br>
    
              <button type="submit">Получить консультацию</button>
            </form>
          `;
          break;
    
        case "custom-query":
          formHtml = `
            <h3>📝 Свой запрос</h3>
            <form data-section="custom-query">
              <label>Опишите ваш запрос:</label><br>
              <textarea name="custom-query" rows="6" cols="15" placeholder="Введите ваш запрос..."></textarea><br><br>
              <button type="submit">Отправить запрос</button>
            </form>
          `;
          break;
    
        default:
          formHtml = "<p>Выберите одну из доступных тем для консультации.</p>";
      }
    
      $("#formContainer").html(formHtml).fadeIn(1000);
    }
    

  
  $(document).on('submit', 'form', function (e) {
    e.preventDefault();
  
    const section = $(this).data('section'); // узнаём, какая форма
    const formData = $(this).serializeArray();
    const data = {};
    formData.forEach(item => data[item.name] = item.value);
  
    let userMessage = "";
  
    switch (section) {
      case 'registration':
        userMessage = `
        Ты юрист в Казахстане. Пользователь хочет зарегистрировать бизнес.
        
        Форма бизнеса: ${data["business-form"]}
        Регион: ${data["region"]}
        Вид деятельности: ${data["activity-type"]}
        Есть ли сотрудники: ${data["staff"]}
        Дата начала деятельности: ${data["start-date"]}
        
        Дай подробную пошаговую инструкцию, включая выбор режима налогообложения, необходимые документы, куда обращаться и какие действия предпринимать.
        `;
        

        break;
  
      case 'fines':
        userMessage = `
        Ты юрист в Казахстане. Пользователь столкнулся с проверками или штрафами.
        
        Тип бизнеса: ${data["business-type"]}
        Наличие офиса: ${data["office"]}
        Проводились ли проверки ранее: ${data["checked"]}
        Причина обращения: ${data["reason"]}
        
        Опиши возможные риски, меры, которые нужно принять, и как себя защитить в такой ситуации.
        `;        
        break;
  
      case 'legislation':
        userMessage = `
        Ты юрист в Казахстане. Пользователь хочет узнать местное законодательство.

        Регион: ${data["region"]}
        Сфера деятельности: ${data["activity"]}
        Интересующая тема: ${data["topic"]}

        Предоставь актуальную информацию по местному законодательству для указанной сферы и темы.
        `;

        
        break;
  
      case 'rent':
        userMessage = `
        Ты юрист в Казахстане. Пользователь интересуется вопросами аренды.
        
        Регион аренды: ${data["region"]};
        Назначение помещения: ${data["purpose"]};
        Сторона сделки: ${data["role"]};
        
        Дай рекомендации по договору аренды, правам и обязанностям сторон, рискам и на что обратить внимание.
        `;
        
        break;
  
      case 'protection':
        userMessage = `
        Ты юрист в Казахстане. Пользователь хочет защитить свои права как предприниматель.
        
        Проблема: ${data["problem"]};
        Есть ли документы: ${data["has-documents"]};
        Желаемое действие: ${data["action"]};
        
        Дай юридические советы, что делать, как поступить и какие документы/шаблоны могут понадобиться.
        `;
        
        break;
  
      case 'custom-query':
        userMessage = `
        Ты юрист в Казахстане. Пользователь задал собственный вопрос:

        ${data["custom-query"]}

        Ответь подробно и по существу.
        `;

        break;
    }
  
    $('#chat-box').append(`<div class="chat-bubble user">${userMessage}</div>`);
  
    $.ajax({
      type: 'POST',
      url: 'https://urassist.onrender.com/ask',
      data: JSON.stringify({ message: userMessage }),
      contentType: 'application/json',
      success: function(response) {
        console.log('Response from server:', response);  // Логируем весь ответ от сервера
    
        if (response && response.reply) {
          // Добавляем ответ от бота в контейнер
          $('#chat-box').append(`<div class="chat-bubble bot">${response.reply}</div>`);
          // Прокручиваем контейнер вниз
          $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
        } else {
          $('#chat-box').append(`<div class="chat-bubble bot">Ответ не был получен.</div>`);
        }
      },
      error: function(xhr, status, error) {
        console.error('Error in request:', error);  // Логируем ошибку
        $('#chat-box').append(`<div class="chat-bubble bot">Произошла ошибка. Попробуйте позже.</div>`);
      }
    });
    
    
  
    this.reset();
  });
  })
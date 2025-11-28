// База данных сценариев фишинга (расширенная база)
const scenarios = [
    {
        subject: "Сброс пароля от корпоративного аккаунта",
        from: "support@company.com",
        body: `Здравствуйте! Мы заметили подозрительную активность. Пожалуйста, сбросьте ваш пароль, перейдя по ссылке: <a href="#">secure-login-portal.com</a>.`,
        isPhishing: true,
        explanation: "Подозрительная ссылка: домен не соответствует официальному домену компании."
    },
    {
        subject: "Ваш платеж не прошел",
        from: "bank.alerts@gmail.com", // Явный признак фишинга - публичный домен
        body: `Уважаемый клиент, ваш недавний платеж не был авторизован. Пожалуйста, войдите в свой аккаунт через эту форму для подтверждения: <a href="#">войти в личный кабинет</a>.`,
        isPhishing: true,
        explanation: "Письмо пришло с публичного почтового адреса (gmail.com), а не с официального домена банка."
    },
    {
        subject: "Обновление политики отпусков на 2025 год",
        from: "HR-Dep@ourcompany.corp",
        body: `Привет всем. Ознакомьтесь, пожалуйста, с новыми правилами отпусков в приложенном документе PDF. Это важно.`,
        isPhishing: false,
        explanation: "Это легитимное письмо от отдела кадров с внутренней информацией. Признаков фишинга нет."
    },
    {
    subject: "Официальное приглашение на ежегодную конференцию",
    from: "events@itconf.ru",
    body: `
        Добрый день!<br>
        Приглашаем Вас принять участие в ежегодной конференции IT-специалистов.<br>
        Подробности мероприятия находятся по адресу: <a href="#">it-conference.ru</a>.<br>
        До встречи!
    `,
    isPhishing: false,
    explanation: "Официальное приглашение на известное событие, признаков фишинга нет."
},
{
    subject: "Срочное уведомление о неоплаченных штрафах ГИБДД",
    from: "gibdd@inform.gov.ru",
    body: `
        Ваше транспортное средство имеет неоплаченные штрафы. Просим оплатить их незамедлительно.<br>
        Инструкция по оплате доступна по ссылке: <a href="#">pay-fines.ru</a>. 
    `,
    isPhishing: true,
    explanation: "Подделка официального письма, поддельный домен (pay-fines.ru), требование срочной оплаты штрафов."
},
{
    subject: "Внимание! Ваш почтовый ящик почти исчерпал лимит хранения",
    from: "support@mail.ru",
    body: `
        Осталось менее 10% свободного места на Вашем ящике.<br>
        Удалите ненужные письма или расширьте объем хранилища по ссылке: <a href="#">upgrade-storage.mail.ru</a>.
    `,
    isPhishing: true,
    explanation: "Использование фальшивого домена (upgrade-storage.mail.ru), попытки заставить пользователя перейти по сомнительным ссылкам."
},
{
    subject: "Вы выиграли поездку на Мальдивы!",
    from: "vacations@happy-travels.ru",
    body: `
        Вы стали счастливым обладателем бесплатной поездки на Мальдивы!<br>
        Узнать подробности и подтвердить поездку можно по ссылке: <a href="#">win-vacation.ru</a>.
    `,
    isPhishing: true,
    explanation: "Попытка привлечь внимание обещаниями бесплатного отдыха, наличие мошеннической ссылки."
},
{
    subject: "Уведомление о доставке посылки",
    from: "logistics@cdek.ru",
    body: `
        Ваша посылка доставлена на указанный адрес.<br>
        Следите за статусом доставки на официальном сайте: <a href="#">cdek.ru</a>.
    `,
    isPhishing: false,
    explanation: "Настоящее уведомление от службы доставки СДЭК, признаков фишинга нет."
},
{
    subject: "Ваш заказ отменен из-за нехватки товаров",
    from: "shop@ozon.ru",
    body: `
        К сожалению, Ваш заказ №XXXXXX был отменен из-за отсутствия товара на складе.<br>
        Детали отмены можно посмотреть в личном кабинете на сайте Ozon.
    `,
    isPhishing: false,
    explanation: "Корректное сообщение от известного российского ритейлера Ozon, признаки фишинга отсутствуют."
},
{
    subject: "Поздравляем с повышением квалификации!",
    from: "training@education-center.ru",
    body: `
        Сердечно поздравляем с успешным прохождением курса повышения квалификации!<br>
        Скачать сертификат можно по следующей ссылке: <a href="#">cert.education-center.ru</a>.
    `,
    isPhishing: false,
    explanation: "Реальное поздравительное письмо от образовательного центра, признаков мошенничества нет."
},
{
    subject: "Ваш компьютер заражен вирусом",
    from: "virus.alert@kaspersky.ru",
    body: `
        Наш антивирус обнаружил вредоносное ПО на вашем компьютере.<br>
        Выполните проверку системы, используя ссылку: <a href="#">check.kaspersky.ru</a>.
    `,
    isPhishing: true,
    explanation: "Попытка ввести в заблуждение пользователей ложным сообщением от Касперского, использование недостоверной ссылки."
},
{
    subject: "Поздравляем с победой в конкурсе фотографий",
    from: "photo.contest@artgallery.ru",
    body: `
        Поздравляем, Ваша фотография победила в конкурсе ArtGallery!<br>
        Информацию о получении награды смотрите по ссылке: <a href="#">awards.artgallery.ru</a>.
    `,
    isPhishing: false,
    explanation: "Подлинное письмо от галереи искусства, признаки мошенничества отсутствуют."
},
{
    subject: "Срочно! Банк требует подтверждение данных",
    from: "confirm@sberbank.ru",
    body: `
        Требуется ваше подтверждение персональных данных.<br>
        Подтвердите данные по ссылке: <a href="#">verify.sberbank.ru</a>.
    `,
    isPhishing: true,
    explanation: "Популярная схема фишинга с использованием имени крупного банка, целью которой является кража личной информации."
},
{
    subject: "Обновление профиля Google Account",
    from: "google.support@gmail.com",
    body: `
        Необходима актуализация Вашего профиля Google Account.<br>
        Актуализируйте профиль по ссылке: <a href="#">update-profile.google.ru</a>.
    `,
    isPhishing: true,
    explanation: "Фишинг-письмо, использующее название известной компании и создание впечатления официальной коммуникации."
},
{
    subject: "Поздравляем с получением кредита!",
    from: "credit@alfabank.ru",
    body: `
        По Вашей кредитной заявке принято положительное решение.<br>
        Подробности можно увидеть на странице личного кабинета: <a href="#">alfa-bank.ru</a>.
    `,
    isPhishing: false,
    explanation: "Настоящий ответ от Альфа-Банка, признаков фишинга нет."
},
{
    subject: "Важно! Аккаунт Facebook временно заблокирован",
    from: "fb.support@facebook.com",
    body: `
        Ваш аккаунт временно приостановлен ввиду нарушений правил.<br>
        Разблокировать аккаунт можно по ссылке: <a href="#">unlock.facebook.com</a>.
    `,
    isPhishing: true,
    explanation: "Типичный способ обмануть пользователей, заставляя поверить в блокировку аккаунта социальной сети."
},
{
    subject: "Поражение устройства Trojan Horse",
    from: "avast@antivirus.cz",
    body: `
        Наш антивирус Avast выявил троянского коня на вашем устройстве.<br>
        Удалите угрозу, следуя инструкции: <a href="#">clean.avast.com</a>.
    `,
    isPhishing: true,
    explanation: "Фиктивное предупреждение от антивируса Avast, направленное на получение доступа к устройству."
},
{
    subject: "Информационное письмо от Сбербанка",
    from: "info@sberbank.ru",
    body: `
        Сбербанк информирует о предстоящих изменениях в тарифах услуг.<br>
        Информация доступна на официальном сайте: <a href="#">sberbank.ru</a>.
    `,
    isPhishing: false,
    explanation: "Нормальная рассылка от Сбербанка, признаков мошенничества нет."
},
{
    subject: "Бесплатная доставка заказа № XXXX",
    from: "delivery@wildberries.ru",
    body: `
        Заказ № XXXX отправляется бесплатно!<br>
        Получите доставку по указанному адресу: <a href="#">track.wildberries.ru</a>.
    `,
    isPhishing: false,
    explanation: "Нормальное письмо от Wildberries, признаков фишинга нет."
},
{
    subject: "Получите зарплату досрочно",
    from: "payroll@yourcompany.ru",
    body: `
        Вашему вниманию предлагается досрочная выдача заработной платы.<br>
        Получить её можно по следующему адресу: <a href="#">early-payment.yourcompany.ru</a>.
    `,
    isPhishing: true,
    explanation: "Приманка для сотрудников компании с предложением раннего получения зарплаты."
},
{
    subject: "Важно! Технический сбой в службе безопасности",
    from: "sec-admin@yandex.ru",
    body: `
        Наблюдается критический технический сбой в системе безопасности.<br>
        Авторизуйтесь для восстановления безопасности: <a href="#">fix-security.yandex.ru</a>.
    `,
    isPhishing: true,
    explanation: "Мошенническое письмо, маскирующееся под техническую проблему Yandex."
},
    // Добавляйте сюда новые сценарии аналогично указанным выше примерам
    // (чем больше сценариев, тем лучше!)
];

// Переменные состояния игры
let currentGameStage = 1;
let correctAnswersCount = 0;
let selectedScenarios = []; // Хранит сценарии текущего раунда

// Функция перемешивания массива для случайного порядка
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Выбор случайных сценариев для каждого запуска игры
function selectRandomScenarios(count) {
    const shuffledScenarios = [...scenarios]; // Копируем оригинальный массив
    shuffleArray(shuffledScenarios);          // Переставляем порядок
    return shuffledScenarios.slice(0, count); // Возвращаем первые N сценариев
}

// Лог события
function logEvent(message) {
    const log = document.getElementById('eventLog');
    const newEntry = document.createElement('p');
    newEntry.textContent = `> [${new Date().toLocaleTimeString()}] ${message}`;
    log.appendChild(newEntry);
    log.scrollTop = log.scrollHeight; // Прокрутка вниз
}

// Начало игры
function startGame() {
    document.getElementById('menuScreen').style.display = 'none';   // Скрываем меню
    document.getElementById('gameScreen').style.display = 'flex';  // Показываем экран игры
    document.getElementById('gameResults').style.display = 'none'; // Скрываем результаты
    currentGameStage = 1;
    correctAnswersCount = 0;
    logEvent("Игра началась. Первый уровень загружается.");

    // Выбираем случайные сценарии для текущего раунда
    selectedScenarios = selectRandomScenarios(10); // Меняем число раундов тут
    loadStage(currentGameStage);
}

// Загружаем сцену для текущего этапа
function loadStage(stageNumber) {
    if (stageNumber > selectedScenarios.length) {
        endGame();
        return;
    }

    const currentScenario = selectedScenarios[stageNumber - 1];

    document.getElementById('stageCounter').textContent = `Этап #${stageNumber}. Ваш ход`;
    document.getElementById('correctAnswers').textContent = correctAnswersCount;
    document.getElementById('emailSubject').textContent = `Тема: ${currentScenario.subject}`;
    document.getElementById('emailFrom').textContent = `От: ${currentScenario.from}`;
    document.getElementById('emailBody').innerHTML = currentScenario.body;
}

// Пользователь сделал выбор (легитимное / фишинг)
function handleChoice(isPhishingGuess) {
    const currentScenario = selectedScenarios[currentGameStage - 1];
    const emailActions = document.querySelector('.email-actions');

    // Блокировка кнопок после выбора
    Array.from(emailActions.children).forEach(button => button.disabled = true);

    if (isPhishingGuess === currentScenario.isPhishing) {
        correctAnswersCount++; // Корректный ответ
        logEvent(`[Этап ${currentGameStage}]: ✔️ Правильно! ${currentScenario.explanation}`);
    } else {
        logEvent(`[Этап ${currentGameStage}]: ❌ Ошибка! ${currentScenario.explanation}`);
    }

    // Переходим на следующий этап спустя небольшую паузу
    setTimeout(() => {
        currentGameStage++;
        if (currentGameStage <= selectedScenarios.length) {
            loadStage(currentGameStage);
            // Разблокируем кнопки
            Array.from(emailActions.children).forEach(button => button.disabled = false);
        } else {
            endGame();
        }
    }, 2500); // Задержка в 2.5 сек для чтения пояснения
}

// Завершаем игру и показываем результаты
function endGame() {
     document.getElementById('eventLog').innerHTML = '';



    document.querySelector('.email-viewer').style.display = 'none';
    document.getElementById('gameResults').style.display = 'flex';
    document.getElementById('resultTitle').textContent = "Симуляция завершена!";

    let resultMessage = `Вы завершили все этапы. Ваш итоговый результат: ${correctAnswersCount} из ${selectedScenarios.length} правильных ответов.`;
    if (correctAnswersCount === selectedScenarios.length) {
        resultMessage += " Отличная работа! Вы эксперт по кибербезопасности.";
        document.getElementById('resultTitle').style.color = '#00ff00';
    } else if (correctAnswersCount >= 7) {
        resultMessage += " Хороший результат. Вы знаете основы безопасности.";
        document.getElementById('resultTitle').style.color = '#00ffff';
    } else {
        resultMessage += " Вам стоит потренироваться ещё немного.";
        document.getElementById('resultTitle').style.color = '#ff0055';
    }

    document.getElementById('resultMessage').textContent = resultMessage;
    logEvent("Игра окончена.");
}

// Повторный старт игры
function resetGame() {
    document.querySelector('.email-viewer').style.display = 'block';
    logEvent("Игра перезапущена.");
    startGame();
}

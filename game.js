// База данных сценариев фишинга (10 этапов)
const scenarios = [
    {
        stage: 1,
        subject: "Сброс пароля от корпоративного аккаунта",
        from: "support@company.com",
        body: `Здравствуйте! Мы заметили подозрительную активность. Пожалуйста, сбросьте ваш пароль, перейдя по ссылке: <a href="#">secure-login-portal.com</a>.`,
        isPhishing: true,
        explanation: "Подозрительная ссылка: домен не соответствует официальному домену компании.",
    },
    {
        stage: 2,
        subject: "Ваш платеж не прошел",
        from: "bank.alerts@gmail.com", // Явный признак фишинга - публичный домен
        body: `Уважаемый клиент, ваш недавний платеж не был авторизован. Пожалуйста, войдите в свой аккаунт через эту форму для подтверждения: <a href="#">войти в личный кабинет</a>.`,
        isPhishing: true,
        explanation: "Письмо пришло с публичного почтового адреса (gmail.com), а не с официального домена банка.",
    },
    {
        stage: 3,
        subject: "Обновление политики отпусков на 2025 год",
        from: "HR-Dep@ourcompany.corp",
        body: `Привет всем. Ознакомьтесь, пожалуйста, с новыми правилами отпусков в приложенном документе PDF. Это важно.`,
        isPhishing: false,
        explanation: "Это легитимное письмо от отдела кадров с внутренней информацией. Признаков фишинга нет.",
    },
    {
        stage: 4,
        subject: "Вам положена компенсация от государства!",
        from: "gosuslugi-noreply@mail.ru", // Почти официальный, но mail.ru
        body: `Мы обнаружили, что вам положена государственная выплата. Чтобы получить деньги, заполните форму на сайте: <a href="#">https://gosuslugi-portal.ru</a>.`,
        isPhishing: true,
        explanation: "Поддельный домен (gosuslugi-portal.ru вместо gosuslugi.ru) и призыв к срочному вводу данных.",
    },
    {
        stage: 5,
        subject: "Просьба от руководителя: Срочно купите подарочные карты",
        from: "ivan.ivanov@ourcompany.corp",
        body: `Привет. Я на совещании и не могу говорить. Мне нужно срочно купить подарочные карты для клиентов. Пожалуйста, купи их на 20 000 руб. и отправь мне коды. Я потом возмещу. Это срочно!`,
        isPhishing: true,
        explanation: "Классический пример 'Business Email Compromise' (BEC). Руководство никогда не просит покупать подарочные карты и отправлять коды по почте.",
    },
     {
        stage: 6,
        subject: "Уведомление о регистрации на вебинар по кибербезопасности",
        from: "webinar@security-experts.com",
        body: `Спасибо за регистрацию на наш вебинар. Доступ к трансляции будет отправлен за час до начала.`,
        isPhishing: false,
        explanation: "Стандартное автоматическое письмо подтверждения, не содержит подозрительных ссылок или запросов личных данных.",
    },
    {
        stage: 7,
        subject: "Ваш аккаунт в Instagram будет заблокирован",
        from: "instagram.security.alert@outlook.com",
        body: `Мы получили жалобы на нарушение авторских прав. Ваш аккаунт будет заблокирован через 24 часа, если вы не подадите апелляцию здесь: <a href="#">instagr.am</a>.`,
        isPhishing: true,
        explanation: "Домен instagr.am не является официальным доменом Instagram. Присутствует срочность и угроза блокировки.",
    },
    {
        stage: 8,
        subject: "Запрос на добавление в друзья в LinkedIn",
        from: "connections@linkedin.com",
        body: `Привет, [Ваше Имя]! Иван Петров хочет добавить вас в свою сеть контактов LinkedIn.`,
        isPhishing: false,
        explanation: "Это стандартное уведомление от официального сервиса. Ссылка ведет на официальный сайт.",
    },
    {
        stage: 9,
        subject: "⚠️ КРИТИЧЕСКОЕ ОБНОВЛЕНИЕ БЕЗОПАСНОСТИ ДЛЯ ВАШЕГО ПК",
        from: "windows-update@microsoft.com",
        body: `Уважаемый пользователь! Ваша система Windows подверглась риску. Запустите срочное сканирование, скачав и запустив файл из вложения (update.exe).`,
        isPhishing: true,
        explanation: "Microsoft никогда не рассылает обновления безопасности через исполняемые файлы (.exe) по почте. Обновления приходят через Центр обновлений Windows.",
    },
    {
        stage: 10,
        subject: "Подтверждение заказа №12345 на сумму 15,000 руб.",
        from: "no-reply@onlinestore.com",
        body: `Спасибо за ваш заказ! Ваш заказ был успешно оформлен. Если вы считаете это ошибкой, отмените заказ здесь: <a href="#">https://my-order-cancelation.com</a>.`,
        isPhishing: true,
        explanation: "Уведомление о покупке, которую вы не совершали, заставляет паниковать и перейти по подозрительной ссылке `my-order-cancelation.com`.",
    },
];

let currentGameStage = 1;
let correctAnswersCount = 0;

function logEvent(message) {
    const log = document.getElementById('eventLog');
    const newEntry = document.createElement('p');
    newEntry.textContent = `> [${new Date().toLocaleTimeString()}] ${message}`;
    log.appendChild(newEntry);
    log.scrollTop = log.scrollHeight; // Прокручиваем вниз
}

function startGame() {
    document.getElementById('menuScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'flex';
    document.getElementById('gameResults').style.display = 'none';
    currentGameStage = 1;
    correctAnswersCount = 0;
    logEvent("Игра началась. Уровень 1 загружен.");
    loadStage(currentGameStage);
}

function loadStage(stageNumber) {
    if (stageNumber > scenarios.length) {
        endGame();
        return;
    }

    const currentScenario = scenarios[stageNumber - 1];
    
    document.getElementById('stageCounter').textContent = `Этап #${stageNumber}. Ваш ход`;
    document.getElementById('correctAnswers').textContent = correctAnswersCount;
    document.getElementById('emailSubject').textContent = `Тема: ${currentScenario.subject}`;
    document.getElementById('emailFrom').textContent = `От: ${currentScenario.from}`;
    document.getElementById('emailBody').innerHTML = currentScenario.body;
}

function handleChoice(isPhishingGuess) {
    const currentScenario = scenarios[currentGameStage - 1];
    const emailActions = document.querySelector('.email-actions');

    // Отключаем кнопки после выбора
    Array.from(emailActions.children).forEach(button => button.disabled = true);

    if (isPhishingGuess === currentScenario.isPhishing) {
        correctAnswersCount++;
        logEvent(`[Этап ${currentGameStage}]: ✔️ Правильно! ${currentScenario.explanation}`);
    } else {
        logEvent(`[Этап ${currentGameStage}]: ❌ Ошибка! ${currentScenario.explanation}`);
    }

    // Небольшая задержка перед переходом на следующий этап
    setTimeout(() => {
        currentGameStage++;
        if (currentGameStage <= scenarios.length) {
            loadStage(currentGameStage);
            // Включаем кнопки обратно
            Array.from(emailActions.children).forEach(button => button.disabled = false);
        } else {
            endGame();
        }
    }, 2500); // 2.5 секунды задержки для прочтения объяснения
}

function endGame() {
    document.querySelector('.email-viewer').style.display = 'none';
    document.getElementById('gameResults').style.display = 'flex';
    document.getElementById('resultTitle').textContent = "Симуляция завершена!";
    
    let message = `Вы завершили все 10 этапов. Ваш итоговый результат: ${correctAnswersCount} из 10 правильных ответов.`;
    if (correctAnswersCount === 10) {
        message += " Отличная работа! Вы эксперт по кибербезопасности.";
        document.getElementById('resultTitle').style.color = '#00ff00';
    } else if (correctAnswersCount >= 7) {
         message += " Хороший результат. Вы знаете основы безопасности.";
         document.getElementById('resultTitle').style.color = '#00ffff';
    } else {
         message += " Стоит пройти дополнительное обучение по распознаванию угроз.";
         document.getElementById('resultTitle').style.color = '#ff0055';
    }

    document.getElementById('resultMessage').textContent = message;
    logEvent("Игра окончена.");
}

function resetGame() {
    document.querySelector('.email-viewer').style.display = 'block';
    logEvent("Игра перезапущена.");
    startGame();
}

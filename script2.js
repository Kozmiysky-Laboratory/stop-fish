document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('stage-1-container').classList.remove('hidden');
    initializeGame();
});

let currentStageTimer;
const gameResults = [];
let activeScenario;

const scenarios = [
    // SCENARIO 1: Брутфорс и вымогатель (Ваш оригинал)
    {
        name: "Брутфорс и вымогатель",
        correctActions: { 1: 'isolate', 2: 'block-ip', 3: 'edr-deploy', 4: 'full-isolate', 5: 'forensics', 6: 'system-rebuild', 7: 'waf-deploy', 8: 'threat-hunting', 9: 'dr-test', 10: 'regulator-notify', 11: 'roadmap-plan', 12: 'final-score' },
        stageSummaries: {
            1: "Обнаружена подозрительная активность: кто-то пытается просканировать открытые порты сервера извне. Ваши действия?",
            2: "Благодаря мониторингу вы засекли, что злоумышленник перешел к брутфорс-атаке на SSH порт сервера!",
            3: "Злоумышленник получил учетные данные и вошел в систему. Обнаружен несанкционированный вход!",
            4: "Атакующий переместился на сервер базы данных и пытается распространить вымогательское ПО. Срочно реагируйте!",
            5: "Сегмент изолирован, но требуется убедиться в полном отсутствии вредоносного ПО в сети и подготовить отчетность.",
            6: "Отчетность готова. Теперь необходимо восстановить рабочие системы из чистых бэкапов.",
            7: "Системы пересобраны и функционируют. Финальный шаг: усилить периметр безопасности.",
            8: "Периметр усилен. Теперь переходим к проактивному поиску следов присутствия злоумышленника внутри сети.",
            9: "Периметр усилен. Теперь переходим к проактивному поиску следов присутствия злоумышленника внутри сети.",
            10: "Необходимо соблюсти все нормативные требования после инцидента. Приступайте к подготовке документации.",
            11: "Документы готовы. Теперь нужно разработать долгосрочную стратегию по предотвращению подобных инцидентов в будущем.",
            12: "Все этапы реагирования и восстановления пройдены. Осталось только оценить общие результаты ваших действий."
        }
    },
    
    // SCENARIO 2: Фишинговая атака с кражей данных
    {
        name: "Фишинговая атака",
        correctActions: { 1: 'monitor', 2: '2fa', 3: 'review-logs', 4: 'full-isolate', 5: 'lesson-learned', 6: 'backup', 7: 'awareness-training', 8: 'update-siem', 9: 'simulated-phishing', 10: 'legal-review', 11: 'budget-req', 12: 'final-score' },
        stageSummaries: {
            1: "Поступило сообщение от сотрудника о подозрительном письме. Обнаружен потенциальный фишинг. Ваши действия?",
            2: "Сотрудник перешел по ссылке и ввел данные. Аккаунт скомпрометирован! Злоумышленник пытается авторизоваться.",
            3: "Авторизация прошла успешно. Атакующий начал горизонтальное перемещение внутри сети. Нужно понять куда.",
            4: "Обнаружен доступ к конфиденциальным файлам с захваченного хоста. Требуется срочная локализация.",
            5: "Данные, возможно, были украдены. Сегмент изолирован, но требуется анализ извлеченных уроков.",
            6: "Системы требуют восстановления данных из резервных копий.",
            7: "Для предотвращения повторных атак требуется усилить осведомленность персонала.",
            8: "Проактивный мониторинг и обновление правил SIEM.",
            9: "Тестирование персонала на фишинг.",
            10: "Юридический анализ последствий утечки.",
            11: "Запрос бюджета на новые ИБ-решения.",
            12: "Все этапы пройдены. Финальная оценка."
        }
    },

    // SCENARIO 3: Уязвимость в публичном сервисе
    {
        name: "Уязвимость в сервисе",
        correctActions: { 1: 'patch', 2: 'monitor', 3: 'isolate', 4: 'honeypot', 5: 'forensics', 6: 'restore-services', 7: 'waf-deploy', 8: 'vulnerability-scan', 9: 'policy-review', 10: 'audit-prepare', 11: 'hire-specialist', 12: 'final-score' },
        stageSummaries: {
            1: "Система мониторинга показывает аномалии в работе публичного веб-сервиса. Похоже, используется свежая уязвимость.",
            2: "Злоумышленник пытается внедрить SQL-инъекцию. Требуется мониторинг для понимания вектора.",
            3: "Атака продолжается. Требуется превентивная изоляция сервиса.",
            4: "Перенаправление трафика на ловушку (honeypot) для анализа атаки и защиты основной системы.",
            5: "Криминалистический анализ следов инцидента.",
            6: "Восстановление критических сервисов после очистки.",
            7: "Развертывание WAF для защиты от подобных атак в будущем.",
            8: "Регулярное сканирование уязвимостей.",
            9: "Пересмотр политик доступа к сервису.",
            10: "Подготовка к аудиту соответствия стандартам.",
            11: "Найм специалиста по AppSec.",
            12: "Все этапы пройдены. Финальная оценка."
        }
    },

    // SCENARIO 4: Инсайдерская угроза
    {
        name: "Инсайдерская угроза",
        correctActions: { 1: 'review-logs', 2: 'isolate', 3: 'reset-pass', 4: 'forensics', 5: 'comm-inc', 6: 'system-rebuild', 7: 'awareness-training', 8: 'threat-hunting', 9: 'policy-review', 10: 'legal-review', 11: 'hire-specialist', 12: 'final-score' },
        stageSummaries: {
            1: "Отдел кадров сообщил об увольнении ключевого системного администратора. Обнаружен подозрительный трафик на внешний USB-накопитель.",
            2: "Необходимо немедленно изолировать все учетные записи и хосты, к которым имел доступ сотрудник.",
            3: "Принудительный сброс паролей для всех потенциально затронутых систем.",
            4: "Криминалистический анализ рабочего места и логов доступа уволенного сотрудника.",
            5: "Коммуникация о инциденте с руководством и ключевыми сотрудниками (HR, юристы).",
            6: "Пересборка затронутых систем, возможно бэкдоры.",
            7: "Тренинг по киберграмотности и политике использования носителей.",
            8: "Threat Hunting для поиска скрытых следов.",
            9: "Пересмотр политик доступа (RBAC).",
            10: "Юридический анализ действий сотрудника.",
            11: "Найм нового специалиста и его проверка.",
            12: "Все этапы пройдены. Финальная оценка."
        }
    },

    // SCENARIO 5: DDoS Атака
    {
        name: "DDoS Атака",
        correctActions: { 1: 'monitor', 2: 'block-ip', 3: 'waf-deploy', 4: 'comm-inc', 5: 'lesson-learned', 6: 'restore-services', 7: 'pentest', 8: 'update-siem', 9: 'policy-review', 10: 'regulator-notify', 11: 'budget-req', 12: 'final-score' },
        stageSummaries: {
            1: "Публичный веб-сайт компании недоступен. Обнаружен резкий всплеск трафика с разных IP-адресов. Это DDoS.",
            2: "Мониторинг показывает, что атака идет с конкретных диапазонов IP. Пробуем блокировать их.",
            3: "Блокировка частичная, атака продолжается. Требуется развертывание WAF/DDoS-защиты.",
            4: "Ситуация критическая, необходимо коммуницировать об инциденте с PR-отделом и клиентами.",
            5: "Услуги восстановлены, требуется анализ извлеченных уроков для предотвращения повторов.",
            6: "Восстановление критических сервисов до полной работоспособности.",
            7: "Внеплановый пентест инфраструктуры.",
            8: "Обновление правил IDS/IPS/SIEM для детектирования DDoS.",
            9: "Пересмотр политик отказоустойчивости.",
            10: "Уведомление регуляторов (если применимо, зависит от юрисдикции).",
            11: "Запрос бюджета на усиление канала связи.",
            12: "Все этапы пройдены. Финальная оценка."
        }
    },
    
     // SCENARIO 6: Атака через цепочку поставок (Supply Chain)
    {
        name: "Supply Chain Attack",
        correctActions: { 1: 'patch', 2: 'isolate', 3: 'review-logs', 4: 'edr-deploy', 5: 'forensics', 6: 'validate-integrity', 7: 'pentest', 8: 'vulnerability-scan', 9: 'policy-review', 10: 'audit-prepare', 11: 'hire-specialist', 12: 'final-score' },
        stageSummaries: {
            1: "Обнаружена скомпрометированная библиотека в используемом стороннем ПО. Возможно заражение через обновление.",
            2: "Немедленная изоляция всех систем, получивших подозрительное обновление.",
            3: "Анализ логов на предмет аномальной активности, связанной с этим ПО.",
            4: "Развертывание EDR для глубокого анализа хостов.",
            5: "Криминалистический анализ для определения источника и масштаба компрометации.",
            6: "Проверка целостности данных и систем после очистки.",
            7: "Внеплановый пентест инфраструктуры, особенно периметра.",
            8: "Регулярное сканирование уязвимостей стороннего ПО.",
            9: "Пересмотр политик работы с поставщиками и обновлениями.",
            10: "Подготовка к внешнему аудиту.",
            11: "Найм специалиста по AppSec и управлению поставщиками.",
            12: "Все этапы пройдены. Финальная оценка."
        }
    },
    
    // SCENARIO 7: Компрометация внутренней сети с помощью трояна-шпиона
    {
        name: "Троян-шпион",
        correctActions: { 1: 'monitor', 2: 'threat-hunting', 3: 'edr-deploy', 4: 'full-isolate', 5: 'forensics', 6: 'system-rebuild', 7: 'waf-deploy', 8: 'update-siem', 9: 'awareness-training', 10: 'legal-review', 11: 'roadmap-plan', 12: 'final-score' },
        stageSummaries: {
            1: "Обнаружен необычный исходящий трафик на неизвестный IP. Похоже на активность трояна-шпиона.",
            2: "Необходимо немедленно начать Threat Hunting – активный поиск скрытых угроз и следов присутствия.",
            3: "Развертывание EDR-решения для лучшей видимости и реагирования на рабочих станциях.",
            4: "Полностью изолировать скомпрометированный сегмент сети для остановки утечки данных.",
            5: "Криминалистический анализ зараженных систем.",
            6: "Пересборка затронутых систем.",
            7: "Усиление периметра защиты.",
            8: "Обновление правил SIEM.",
            9: "Тренинг по киберграмотности для сотрудников.",
            10: "Юридический анализ последствий утечки.",
            11: "Планирование ИБ-дорожной карты.",
            12: "Все этапы пройдены. Финальная оценка."
        }
    },
];

const stageTimers = { 1: 60, 2: 45, 3: 30, 4: 45, 5: 60, 6: 120, 7: 90, 8: 120, 9: 90, 10: 180, 11: 120, 12: 60 };


function initializeGame() {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    activeScenario = scenarios[randomIndex];
    console.log(`Запущен сценарий: ${activeScenario.name}`);
    startStage(1);
}

function startStage(stageNumber) {
    const container = document.getElementById(`stage-${stageNumber}-container`);
    const threatSummaryElement = document.getElementById(`stage-${stageNumber}-threat-summary`);
    
    threatSummaryElement.textContent = activeScenario.stageSummaries[stageNumber];

    let timeLeft = stageTimers[stageNumber];
    const timerElement = document.getElementById(`time-left-${stageNumber}`);
    timerElement.textContent = timeLeft;

    clearInterval(currentStageTimer); 
    currentStageTimer = setInterval(() => { 
        timeLeft--; 
        timerElement.textContent = timeLeft; 
        if (timeLeft <= 0) { 
            clearInterval(currentStageTimer); 
            handleStageAction(stageNumber, 'TIMEOUT'); 
        } 
    }, 1000);

    const optionsContainer = container.querySelector('.stage-options');
    if (optionsContainer) {
        const newOptionsContainer = optionsContainer.cloneNode(true);
        optionsContainer.parentNode.replaceChild(newOptionsContainer, optionsContainer);
        newOptionsContainer.addEventListener('click', function(event) {
            const option = event.target.closest('.option');
            if (option) { 
                clearInterval(currentStageTimer); 
                handleStageAction(stageNumber, option.getAttribute('data-action')); 
            }
        });
    }

    if (stageNumber === 12) {
         const optionsContainer = document.getElementById('stage-12-options');
         optionsContainer.innerHTML = `<button class="final-restart-button" id="showResultsButton">Посмотреть финальный результат игры</button>`;
         document.getElementById('showResultsButton').addEventListener('click', function() {
            clearInterval(currentStageTimer);
            displayFinalResults();
        });
    }
}


function handleStageAction(stageNumber, action) {
    const isCorrect = (action === activeScenario.correctActions[stageNumber]);
    
    gameResults.push({
        stage: stageNumber,
        success: isCorrect,
        action: action,
        scenario: activeScenario.name
    });

    document.getElementById(`stage-${stageNumber}-container`).classList.add('hidden');
    
    const nextStage = stageNumber + 1;

    if (nextStage <= 12) {
        document.getElementById(`stage-${nextStage}-container`).classList.remove('hidden'); 
        startStage(nextStage);
    } else {
        displayFinalResults();
    }
}


function displayFinalResults(timedOut = false) {
    const errors = gameResults.filter(result => !result.success);
    const successCount = gameResults.length - errors.length;

    let finalMessage = "";
    let resultTitle = "";
    let titleColor = "";

    if (timedOut && gameResults.length < 12) {
         resultTitle = "ПРОВАЛ МИССИИ";
        finalMessage = `Вы не успели пройти все этапы реагирования вовремя. Критические системы предприятия были скомпрометированы. (Сценарий: ${activeScenario.name})`;
        titleColor = "#ff0055";
    }
    else if (timedOut) {
        resultTitle = "ПОРАЖЕНИЕ (Время вышло)";
        finalMessage = `Время на финальную оценку вышло. Процесс не был завершен вовремя. (Сценарий: ${activeScenario.name})`;
        titleColor = "#ff0055";
    } else if (errors.length === 0 && gameResults.length >= 12) {
        resultTitle = "ПОБЕДА! Угроза нейтрализована.";
        finalMessage = `Вы успешно прошли все 12 этапов без единой критической ошибки. Предприятие в безопасности. (Сценарий: ${activeScenario.name})`;
        titleColor = "#00ffcc";
    } else {
        resultTitle = "НЕЙТРАЛИЗАЦИЯ С ПОТЕРЯМИ";
        finalMessage = `Вы допустили ${errors.length} ошибок во время реагирования. Предприятие понесло ущерб, но угроза остановлена. (Сценарий: ${activeScenario.name})`;
        titleColor = "#FFA500";
    }

    let errorDetails = "";
    if (errors.length > 0) {
        errorDetails = "<h4>Список ошибок:</h4><ul>";
        errors.forEach(err => {
            errorDetails += `<li>Этап ${err.stage}: Неверное или запоздалое действие (${err.action})</li>`;
        });
        errorDetails += "</ul>";
    }

    const stage12Main = document.querySelector('#stage-12-container main');
    stage12Main.innerHTML = `
        <h2 style="color: ${titleColor};">${resultTitle}</h2>
        <p>${finalMessage}</p>
        ${errorDetails}
        <button class="final-restart-button" onclick="window.location.reload()">Начать игру заново</button>
    `;
    
    const style = document.querySelector('style');
    if (style) style.remove();
}

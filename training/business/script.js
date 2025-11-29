document.addEventListener('DOMContentLoaded', () => {
    // 1. ДАННЫЕ ЛОГОВ
    const logData = [
        { date: '2025-01-15', time: '08:23:14', status: 200, ip: '45.142.212.61', method: 'GET', url: '/dashboard', isAttack: false },
        { date: '2025-01-15', time: '08:24:31', status: 200, ip: '198.51.100.42', method: 'GET', url: '/accounts', isAttack: false },
        { date: '2025-01-15', time: '08:25:47', status: 302, ip: '87.120.45.78', method: 'GET', url: '/oldpage', isAttack: false },
        
        // !!! АТАКА 1: Попытка входа (Bruteforce)
        { date: '2025-01-15', time: '08:28:19', status: 401, ip: '51.195.67.123', method: 'POST', url: '/login?user=john&pass=wr', isAttack: true },
        
        { date: '2025-01-15', time: '08:29:42', status: 200, ip: '45.142.212.61', method: 'POST', url: '/transfer', isAttack: false },
        { date: '2025-01-15', time: '08:31:05', status: 200, ip: '185.220.101.56', method: 'GET', url: '/help', isAttack: false },
        { date: '2025-01-15', time: '08:32:28', status: 200, ip: '198.51.100.42', method: 'GET', url: '/transactions', isAttack: false },
        { date: '2025-01-15', time: '08:33:51', status: 302, ip: '93.184.216.34', method: 'GET', url: '/legacy', isAttack: false },
        
        // !!! АТАКА 2: Еще одна попытка входа (Bruteforce)
        { date: '2025-01-15', time: '08:38:00', status: 401, ip: '151.80.31.167', method: 'POST', url: '/login?user=sarah&pass=test123', isAttack: true },
        
        { date: '2025-01-15', time: '08:39:20', status: 200, ip: '74.125.224.23', method: 'GET', url: '/balance', isAttack: false },
        { date: '2025-01-15', time: '08:40:55', status: 200, ip: '208.80.152.45', method: 'GET', url: '/cards', isAttack: false },
        
        // !!! АТАКА 3: Попытка перехода по подозрительной ссылке (Возможно, XSS или Phishing)
        { date: '2025-01-15', time: '08:42:01', status: 200, ip: '123.45.67.89', method: 'GET', url: '/user_data?id=10;alert("XSS")', isAttack: true },
    ];

    const logBody = document.getElementById('logBody');
    const feedbackDiv = document.getElementById('feedback');
    const totalAttacks = logData.filter(log => log.isAttack).length;

    // 2. ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ ЛОГОВ И ДОБАВЛЕНИЯ КЛИКА
    function renderLogs() {
        logBody.innerHTML = '';
        logData.forEach((log, index) => {
            const row = logBody.insertRow();
            row.id = `log-row-${index}`;
            row.setAttribute('data-index', index);
            row.onclick = toggleRowSelection; // Добавляем обработчик клика

            // DATE/TIME
            row.insertCell().textContent = `${log.date}\n${log.time}`;

            // STATUS (с классом для цвета)
            const statusCell = row.insertCell();
            statusCell.innerHTML = `<span class="status-cell status-${log.status}">${log.status} ${getStatusText(log.status)}</span>`;

            // IP ORIGIN
            row.insertCell().textContent = log.ip;

            // METHOD (с классом для цвета)
            const methodCell = row.insertCell();
            methodCell.innerHTML = `<span class="method-${log.method.toLowerCase()}">${log.method}</span>`;

            // REQUEST URL
            row.insertCell().textContent = log.url;
        });
    }

    // 3. ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ВЫБОРА СТРОКИ
    function toggleRowSelection() {
        // Добавляем/удаляем класс 'selected' при клике
        this.classList.toggle('selected');
    }

    // 4. ГЛАВНАЯ ИГРОВАЯ ЛОГИКА: ПРОВЕРКА ОТВЕТА
    window.checkAnswer = function() {
        const selectedRows = logBody.querySelectorAll('tr.selected');
        let correctPicks = 0;
        let incorrectPicks = 0;
        
        // Сбрасываем все стили для проверки
        logBody.querySelectorAll('tr').forEach(row => {
            row.classList.remove('selected', 'suspicious-correct', 'suspicious-false', 'suspicious-missed');
        });

        // 4.1. Проверка выбранных строк
        selectedRows.forEach(row => {
            const index = parseInt(row.getAttribute('data-index'));
            const logEntry = logData[index];

            if (logEntry.isAttack) {
                // Правильный выбор атаки
                correctPicks++;
                row.classList.add('suspicious-correct');
            } else {
                // Ошибочный выбор обычной активности
                incorrectPicks++;
                row.classList.add('suspicious-false');
            }
        });

        // 4.2. Поиск пропущенных атак (False Negatives)
        logData.forEach((log, index) => {
            const row = document.getElementById(`log-row-${index}`);
            if (log.isAttack && !row.classList.contains('suspicious-correct')) {
                // Пропущенная атака (подсвечиваем оранжевым)
                row.classList.add('suspicious-missed');
            }
        });

        // 4.3. Вывод результата
        const missedAttacks = totalAttacks - correctPicks;
        const totalScore = correctPicks - incorrectPicks; // Очки за правильные, штраф за неправильные
        
        let message = `
            Вы завершили анализ!
            <br><br>
            ✔️ Правильно найдено атак: **${correctPicks}** из ${totalAttacks}.
            <br>
            ❌ Ошибочно выбрано легальных запросов: **${incorrectPicks}**.
            <br>
            ⚠️ Пропущено атак: **${missedAttacks}**.
            <br>
            <strong>ИТОГОВЫЙ СЧЕТ: ${totalScore}</strong>.
        `;

        if (totalScore > 0 && missedAttacks === 0 && incorrectPicks === 0) {
            feedbackDiv.className = 'feedback success';
            message += `<br><br><strong>ПОБЕДА!</strong> Вы идеально идентифицировали все угрозы.`;
        } else {
            feedbackDiv.className = 'feedback error';
            message += `<br><br><strong>Нужна доработка.</strong> Проанализируйте подсвеченные ошибки.`;
        }

        feedbackDiv.innerHTML = message;
    }

    // Вспомогательная функция для получения текста статуса
    function getStatusText(status) {
        switch (status) {
            case 200: return 'OK';
            case 302: return 'Redirect';
            case 401: return 'Unauthorized';
            case 404: return 'Not Found';
            default: return 'Code';
        }
    }

    // Инициализация
    renderLogs();
});
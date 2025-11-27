document.addEventListener('DOMContentLoaded', () => {
    // Удаляем или комментируем код, который искал кнопку StartButton,
    // так как в trainer.html ее нет, а тренажер виден сразу.

    const passwordInput = document.getElementById('passwordInput');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const strengthText = document.getElementById('strengthText');

    // Проверяем, существуют ли нужные элементы на текущей странице, прежде чем добавлять слушатель событий
    if (passwordInput && strengthIndicator && strengthText) {
        // Обработка ввода пароля в реальном времени
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const strength = checkPasswordStrength(password);
            updateStrengthIndicator(strength);
        });
    } else {
        // Если это главная страница index.html, где тренажер сначала скрыт,
        // этот блок кода не будет выполняться, так как мы используем ссылку.
        console.log("Password trainer elements not found. This might be the main index page.");
    }


    // Функция оценки надежности пароля (остается без изменений)
    function checkPasswordStrength(password) {
        let score = 0;
        if (!password) return 0;

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        const isLong = password.length >= 12;

        if (hasUpperCase) score++;
        if (hasLowerCase) score++;
        if (hasDigit) score++;
        if (hasSpecialChar) score++;
        if (isLong) score++;

        if (password.length >= 8) score += 0.5;
        if (password.length >= 16) score += 0.5;

        return score;
    }

    // Функция обновления интерфейса (остается без изменений)
    function updateStrengthIndicator(strength) {
        let width = (strength / 5) * 100;
        let color = '#ff0000';
        let text = 'Очень слабый';

        if (strength >= 1.5) {
            color = '#ff9800';
            text = 'Средний';
        }
        if (strength >= 3) {
            color = '#4caf50';
            text = 'Надежный';
        }
        if (strength >= 4.5) {
            color = '#8bc34a';
            text = 'Очень надежный';
        }

        strengthIndicator.style.width = `${width}%`;
        strengthIndicator.style.backgroundColor = color;
        strengthText.innerHTML = `Надежность: **${text}**`;
        strengthText.style.color = color;
    }
});

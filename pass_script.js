document.addEventListener('DOMContentLoaded', () => {
    // ... (остальной код остается без изменений)

    const passwordInput = document.getElementById('passwordInput');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const strengthText = document.getElementById('strengthText');
    const togglePassword = document.getElementById('togglePassword');

    if (passwordInput && strengthIndicator && strengthText && togglePassword) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const strength = checkPasswordStrength(password);
            updateStrengthIndicator(strength);
        });

        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });

    } else {
        console.log("Password trainer elements not found. This might be the main index page.");
    }


    // Функция оценки надежности пароля (ОБНОВЛЕННАЯ ВЕРСИЯ)
    function checkPasswordStrength(password) {
        let score = 0;
        if (!password) return 0;

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        // Убрали isLong как отдельный булевый флаг, теперь длина дает баллы динамически

        // Баллы за наличие разных типов символов
        if (hasUpperCase) score += 1; // Увеличили вес до 1 балла
        if (hasLowerCase) score += 1;
        if (hasDigit) score += 1;
        if (hasSpecialChar) score += 1;
        
        // Ужесточаем требования к длине:
        if (password.length >= 10) score += 0.5; // Балл за 10+ символов (было 8+)
        if (password.length >= 14) score += 1;   // Дополнительный балл за 14+ символов (было 16+)
        if (password.length >= 18) score += 0.5; // Еще балл за очень длинный пароль

        // Максимальный балл теперь может достигать 5 (1+1+1+1 + 0.5+1+0.5)

        return score;
    }

    // Функция обновления интерфейса (ТРЕБУЕТСЯ НЕБОЛЬШАЯ КОРРЕКТИРОВКА ПОРОГОВ)
    function updateStrengthIndicator(strength) {
        // Шкала осталась прежней (от 0 до 5), но теперь ее сложнее заполнить.
        let width = (strength / 5) * 100;
        let color = '#ff0000';
        let text = 'Очень слабый';

        // Корректируем пороги, чтобы они соответствовали новому распределению баллов
        if (strength >= 2) { // Раньше было 1.5
            color = '#ff9800';
            text = 'Средний';
        }
        if (strength >= 3.5) { // Раньше было 3
            color = '#4caf50';
            text = 'Надежный';
        }
        if (strength >= 4.5) { // Раньше было 4.5
            color = '#8bc34a';
            text = 'Очень надежный';
        }

        strengthIndicator.style.width = `${width}%`;
        strengthIndicator.style.backgroundColor = color;
        strengthText.innerHTML = `Надежность: **${text}**`;
        strengthText.style.color = color;
    }
});

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


    // Функция оценки надежности пароля (СБАЛАНСИРОВАННАЯ ВЕРСИЯ)
    function checkPasswordStrength(password) {
        let score = 0;
        if (!password) return 0;

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

        // Даем баллы за каждый тип символа (по 1 баллу)
        if (hasUpperCase) score += 1;
        if (hasLowerCase) score += 1;
        if (hasDigit) score += 1;
        if (hasSpecialChar) score += 1;
        
        // Умеренно ужесточаем требования к длине:
        if (password.length >= 10) score += 0.5; // +0.5 балла за 10+ символов
        if (password.length >= 14) score += 0.5; // +0.5 балла за 14+ символов
        if (password.length >= 18) score += 0;   // Убрал балл за 18+, чтобы макс. балл был 5

        // Максимальный балл теперь ровно 5 (1+1+1+1 + 0.5 + 0.5)

        return score;
    }

    // Функция обновления интерфейса (СКОРРЕКТИРОВАНЫ ПОРОГИ)
    function updateStrengthIndicator(strength) {
        // Шкала от 0 до 5
        let width = (strength / 5) * 100;
        let color = '#ff0000';
        let text = 'Очень слабый';

        // Пороги:
        if (strength >= 2) { // Два типа символов ИЛИ один тип и длина 10+
            color = '#ff9800';
            text = 'Средний';
        }
        if (strength >= 3.5) { // Три типа символов И длина 10+, или 4 типа без длины
            color = '#4caf50';
            text = 'Надежный';
        }
        if (strength >= 4.5) { // Все 4 типа символов И длина 14+
            color = '#8bc34a';
            text = 'Очень надежный';
        }

        strengthIndicator.style.width = `${width}%`;
        strengthIndicator.style.backgroundColor = color;
        strengthText.innerHTML = `Надежность: **${text}**`;
        strengthText.style.color = color;
    }
});

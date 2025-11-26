body {
    background-color: #0a0a1a;
    color: #eee;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.hidden {
    display: none !important;
}

.game-container {
    width: 80%;
    max-width: 600px;
    padding: 20px;
    border: 1px solid #00ffcc; /* Бирюзовый акцент */
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.4); /* Бирюзовое свечение */
    background-color: rgba(10, 10, 26, 0.9);
    text-align: center;
    border-radius: 5px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.stage-info {
    color: #00ffcc; /* Бирюзовый */
    font-weight: bold;
}

.timer {
    color: #00ffcc;
    font-size: 1.2em;
}

h1 {
    color: #00ffcc; /* Бирюзовый */
    text-transform: uppercase;
    font-size: 1.5em;
    margin-bottom: 10px;
}

p {
    margin: 10px 0;
}

.intro-text {
    margin: 20px 0;
    line-height: 1.4;
    border-top: 1px dashed #00ffcc;
    border-bottom: 1px dashed #00ffcc;
    padding: 15px 0;
}

button#startButton {
    background-color: #00ffcc; /* Бирюзовый фон кнопки */
    color: #0a0a1a; /* Темный текст на кнопке */
    border: none;
    padding: 10px 20px;
    font-family: inherit;
    font-size: 1em;
    cursor: pointer;
    margin-top: 20px;
    box-shadow: 0 0 10px rgba(0, 255, 204, 0.7);
    transition: background-color 0.3s;
    font-weight: bold;
}

button#startButton:hover {
    background-color: #33ffff;
}

footer {
    margin-top: 20px;
    font-size: 0.8em;
    opacity: 0.6;
}

/* Стили для опций Этапа 1 (защитные иконки) */
.stage-options {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.option {
    background-color: rgba(0, 255, 204, 0.05);
    padding: 15px;
    border: 1px solid #00ffcc;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.option:hover {
    background-color: rgba(0, 255, 204, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.5);
}

.option i {
    margin-right: 10px;
    font-size: 1.5em;
    color: #00ffcc;
}

/* ... (Все предыдущие стили остаются без изменений) ... */

/* Новый стиль для блока сводки угрозы */
.threat-summary {
    background-color: rgba(255, 0, 85, 0.1); /* Легкий красный фон, чтобы обозначить опасность */
    border: 1px solid #ff0055;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 0.9em;
    color: #ff0055; /* Красный текст */
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(255, 0, 85, 0.3);
}

/* ... (Стили для .option, .option:hover и т.д. остаются прежними, используя бирюзовый цвет) ... */

/* Добавьте этот стиль в ваш style.css */
button.final-restart-button {
    background-color: #00ffcc; /* Бирюзовый фон кнопки */
    color: #0a0a1a; /* Темный текст на кнопке */
    border: none;
    padding: 10px 20px;
    font-family: inherit;
    font-size: 1em;
    cursor: pointer;
    margin-top: 20px;
    box-shadow: 0 0 10px rgba(0, 255, 204, 0.7);
    transition: background-color 0.3s;
    font-weight: bold;
    border-radius: 3px; /* Добавим немного скругления */
}

button.final-restart-button:hover {
    background-color: #33ffff;
}

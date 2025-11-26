// Функция для переключения темы
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    if (body.classList.contains('night-theme')) {
        body.classList.remove('night-theme');
        themeToggle.textContent = '🌙 Ночная тема';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('night-theme');
        themeToggle.textContent = '☀️ Дневная тема';
        localStorage.setItem('theme', 'dark');
    }
}

// Функция для загрузки темы из localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('night-theme');
        themeToggle.textContent = '☀️ Дневная тема';
    } else {
        document.body.classList.remove('night-theme');
        themeToggle.textContent = '🌙 Ночная тема';
    }
}

// Функция для перехода на страницу администрирования
function navigateToPage(pageUrl) {
    // Все страницы уже находятся в папке admin, поэтому просто переходим
    window.location.href = pageUrl;
}

// Функция для возврата в главное меню
function goToMainMenu() {
    window.location.href = '../menu.html';
}

// Функция для обработки кликов по карточкам меню
function setupMenuCards() {
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        card.addEventListener('click', function() {
            const pageUrl = this.getAttribute('data-page');
            if (pageUrl) {
                navigateToPage(pageUrl);
            }
        });

        // Добавляем обработчик клавиатуры для доступности
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const pageUrl = this.getAttribute('data-page');
                if (pageUrl) {
                    navigateToPage(pageUrl);
                }
            }
        });

        // Делаем карточки доступными для фокуса
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Перейти к ${card.querySelector('.menu-title').textContent}`);
    });
}

// Функция для показа уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Функция для проверки авторизации
function checkAuthorization() {
    // В реальном приложении здесь должна быть проверка токена/сессии
    const isAuthenticated = true; // Заглушка
    const isAdmin = true; // Заглушка

    if (!isAuthenticated) {
        window.location.href = '../index.html';
        return false;
    }

    if (!isAdmin) {
        showNotification('Недостаточно прав для доступа к панели администратора', 'error');
        setTimeout(() => {
            window.location.href = '../menu.html';
        }, 2000);
        return false;
    }

    return true;
}

// Функция для настройки обработчиков событий
function setupEventListeners() {
    // Кнопка переключения темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Кнопка возврата в меню
    const backToMenuBtn = document.getElementById('backToMenuBtn');
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', goToMainMenu);
    }

    // Настройка карточек меню
    setupMenuCards();
}

// Функция инициализации дашборда
function initDashboard() {
    console.log('Инициализация панели администратора...');

    // Загрузка темы
    loadTheme();

    // Настройка обработчиков событий
    setupEventListeners();

    // Проверка авторизации
    if (checkAuthorization()) {
        // Показываем приветственное сообщение
        setTimeout(() => {
            showNotification('Добро пожаловать в панель администратора!', 'success');
        }, 1000);
    }
}

// Обработчик загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();

    // Добавляем обработчик клавиш для быстрого доступа
    document.addEventListener('keydown', function(e) {
        // Alt + 1-6 для быстрого перехода к разделам
        if (e.altKey && e.key >= '1' && e.key <= '6') {
            const index = parseInt(e.key) - 1;
            const cards = document.querySelectorAll('.menu-card');
            if (cards[index]) {
                const pageUrl = cards[index].getAttribute('data-page');
                navigateToPage(pageUrl);
            }
        }

        // Escape для возврата в меню
        if (e.key === 'Escape') {
            goToMainMenu();
        }

        // Ctrl+D для переключения темы
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
    });
});

// Функция для обработки ошибок
function handleError(error) {
    console.error('Ошибка в панели администратора:', error);
    showNotification('Произошла ошибка. Пожалуйста, попробуйте еще раз.', 'error');
}

// Глобальные функции для использования в HTML
window.toggleTheme = toggleTheme;
window.navigateToPage = navigateToPage;
window.goToMainMenu = goToMainMenu;
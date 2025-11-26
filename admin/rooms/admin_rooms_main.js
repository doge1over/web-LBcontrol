console.log('=== ADMIN ROOMS JS ЗАГРУЖЕН ===');

// Проверка загрузки страницы
function checkPageLoad() {
    console.log('Проверка загрузки страницы помещений...');

    const criticalElements = [
        'roomsTableBody',
        'roomsSearch',
        'labFilter',
        'typeFilter',
        'editModal',
        'supportModal'
    ];

    let allFound = true;
    criticalElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`✓ ${id} найден`);
        } else {
            console.log(`✗ ${id} НЕ НАЙДЕН`);
            allFound = false;
        }
    });

    return allFound;
}

// Функция для возврата в админку
function goToAdmin() {
    console.log('Переход в админку');
    window.location.href = '../admin_dashboard.html';
}

// Обработчик формы редактирования
function setupEventListeners() {
    // Обработчик формы редактирования
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Сохранение изменений помещения');

            const roomNumber = document.getElementById('roomNumber').value;
            const roomName = document.getElementById('roomName').value;

            if (!roomNumber || !roomName) {
                alert('Пожалуйста, заполните обязательные поля (номер и наименование помещения)');
                return;
            }

            alert('Изменения сохранены!');
            closeEditModal();
        });
    }

    // Обработчик поиска
    const roomsSearch = document.getElementById('roomsSearch');
    if (roomsSearch) {
        roomsSearch.addEventListener('input', function() {
            console.log('Поиск помещений:', this.value);
            applyRoomsFilters();
        });
    }

    // Обработчики фильтров
    const labFilter = document.getElementById('labFilter');
    const typeFilter = document.getElementById('typeFilter');

    if (labFilter) {
        labFilter.addEventListener('change', applyRoomsFilters);
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', applyRoomsFilters);
    }

    // Обработчик формы поддержки
    const supportForm = document.querySelector('.support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы поддержки');
            alert('Сообщение отправлено в службу поддержки!');
            closeSupportModal();
        });
    }
}

// Инициализация страницы
function initRoomsPage() {
    console.log('=== DOM ЗАГРУЖЕН ДЛЯ ADMIN ROOMS ===');

    if (!checkPageLoad()) {
        console.error('Критические элементы не найдены!');
        return;
    }

    console.log('Все критически элементы найдены, инициализация...');

    // Настройка обработчиков событий
    setupEventListeners();

    // Загрузка данных
    console.log('Загрузка данных помещений...');
    loadRoomsData();
    console.log('Инициализация завершена');
}

// Запуск инициализации при загрузке DOM
document.addEventListener('DOMContentLoaded', initRoomsPage);
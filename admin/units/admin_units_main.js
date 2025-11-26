console.log('=== ADMIN UNITS MAIN ЗАГРУЖЕН ===');

// Функция для возврата в админку
function goToAdmin() {
    console.log('Переход в админку');
    window.location.href = 'admin_dashboard.html';
}

// Проверка загрузки страницы
function checkPageLoad() {
    console.log('Проверка загрузки страницы единиц измерения...');

    const criticalElements = [
        'unitsTableBody',
        'unitsSearch',
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

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM ЗАГРУЖЕН ДЛЯ ADMIN UNITS ===');

    // Проверяем загрузку страницы
    if (!checkPageLoad()) {
        console.error('Критические элементы не найдены!');
        return;
    }

    console.log('Все критически элементы найдены, инициализация...');

    // Обработчик поиска
    const unitsSearch = document.getElementById('unitsSearch');
    if (unitsSearch) {
        unitsSearch.addEventListener('input', function() {
            console.log('Поиск единиц измерения:', this.value);
            applyUnitsFilters();
        });
    }

    // Обработчик фильтра типа
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            console.log('Фильтр типа:', this.value);
            applyUnitsFilters();
        });
    }

    // Загрузка данных
    console.log('Загрузка данных единиц измерения...');
    loadUnitsData();
    console.log('Инициализация завершена');
});
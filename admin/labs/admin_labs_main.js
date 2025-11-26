// Основная логика инициализации

function goToAdmin() {
    window.location.href = 'admin_dashboard.html';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализация страницы лабораторий...');

    // Инициализация данных
    filteredLabs = [...labsData];

    // Первоначальная отрисовка таблицы
    loadLabsData();

    // Установка обработчиков событий
    setupEventListeners();
});

function setupEventListeners() {
    // Обработчик поиска
    const labsSearch = document.getElementById('labsSearch');
    if (labsSearch) {
        labsSearch.addEventListener('input', applyLabsFilters);
    }
}
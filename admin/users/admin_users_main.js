// Основная логика инициализации

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация данных
    filteredUsers = [...usersData];

    // Первоначальная отрисовка таблицы
    renderUsersTable();

    // Установка обработчиков событий
    setupEventListeners();
});

function setupEventListeners() {
    // Поиск при изменении фильтров
    const roleFilter = document.getElementById('roleFilter');
    const labFilter = document.getElementById('labFilter');

    if (roleFilter) {
        roleFilter.addEventListener('change', applyUsersFilters);
    }
    if (labFilter) {
        labFilter.addEventListener('change', applyUsersFilters);
    }
}
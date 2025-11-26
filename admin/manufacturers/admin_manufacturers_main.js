// Функция для возврата в админку
function goToAdmin() {
    window.location.href = 'admin_dashboard.html';
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализация страницы производителей...');

    // Обработчик поиска
    const manufacturersSearch = document.getElementById('manufacturersSearch');
    if (manufacturersSearch) {
        manufacturersSearch.addEventListener('input', applyManufacturersFilters);
    }

    // Загрузка данных при загрузке страницы
    setTimeout(() => {
        loadManufacturersData();
    }, 100);
});
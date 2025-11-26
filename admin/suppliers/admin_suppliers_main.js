// Функция для возврата в админку
function goToAdmin() {
    window.location.href = 'admin_dashboard.html';
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM ЗАГРУЖЕН ДЛЯ ADMIN SUPPLIERS ===');

    // Обработчик поиска
    const suppliersSearch = document.getElementById('suppliersSearch');
    if (suppliersSearch) {
        suppliersSearch.addEventListener('input', function() {
            console.log('Поиск:', this.value);
            applySuppliersFilters();
        });
    }

    // Загрузка данных
    console.log('Загрузка данных поставщиков...');
    loadSuppliersData();
    console.log('Инициализация завершена');
});
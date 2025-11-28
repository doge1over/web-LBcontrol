// admin_manufacturers_filters.js

// Функция для очистки поиска
function clearManufacturersSearch() {
    document.getElementById('manufacturersSearch').value = '';
    applyManufacturersFilters();
}

// Функция для применения фильтров
function applyManufacturersFilters() {
    if (!manufacturersData) return;

    const searchTerm = document.getElementById('manufacturersSearch').value.toLowerCase().trim();

    const filteredManufacturers = manufacturersData.filter(manufacturer => {
        const matchesSearch = !searchTerm ||
            manufacturer.name.toLowerCase().includes(searchTerm) ||
            manufacturer.id.toString().includes(searchTerm);

        return matchesSearch;
    });

    displayFilteredManufacturers(filteredManufacturers);
}
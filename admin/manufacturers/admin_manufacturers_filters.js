// Функция для очистки поиска
function clearManufacturersSearch() {
    document.getElementById('manufacturersSearch').value = '';
    applyManufacturersFilters();
}

// Функция для применения фильтров
function applyManufacturersFilters() {
    if (!manufacturersData) return;

    const searchTerm = document.getElementById('manufacturersSearch').value.toLowerCase();

    const filteredManufacturers = manufacturersData.filter(manufacturer => {
        const matchesSearch = !searchTerm ||
            manufacturer.name.toLowerCase().includes(searchTerm) ||
            manufacturer.email.toLowerCase().includes(searchTerm);

        return matchesSearch;
    });

    displayFilteredManufacturers(filteredManufacturers);
}
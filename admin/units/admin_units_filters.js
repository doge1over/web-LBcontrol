console.log('=== ADMIN UNITS FILTERS ЗАГРУЖЕН ===');

// Функция для очистки поиска
function clearUnitsSearch() {
    console.log('Очистка поиска единиц измерения');
    document.getElementById('unitsSearch').value = '';
    applyUnitsFilters();
}

// Функция для применения фильтров
function applyUnitsFilters() {
    const units = getUnitsData();
    if (!units || units.length === 0) return;

    const searchTerm = document.getElementById('unitsSearch').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;

    console.log('Применение фильтров единиц измерения:', { searchTerm, typeFilter });

    const filteredUnits = units.filter(unit => {
        const matchesSearch = !searchTerm ||
            (unit.name && unit.name.toLowerCase().includes(searchTerm)) ||
            (unit.symbol && unit.symbol.toLowerCase().includes(searchTerm));

        const matchesType = !typeFilter || unit.type === typeFilter;

        return matchesSearch && matchesType;
    });

    displayFilteredUnits(filteredUnits);
}
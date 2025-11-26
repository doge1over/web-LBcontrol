// Функция для очистки поиска
function clearSuppliersSearch() {
    console.log('Очистка поиска');
    document.getElementById('suppliersSearch').value = '';
    applySuppliersFilters();
}

// Функция для применения фильтров
function applySuppliersFilters() {
    const suppliers = getSuppliersData();
    if (!suppliers || suppliers.length === 0) return;

    const searchTerm = document.getElementById('suppliersSearch').value.toLowerCase();

    console.log('Применение фильтров:', { searchTerm });

    const filteredSuppliers = suppliers.filter(supplier => {
        const matchesSearch = !searchTerm ||
            (supplier.name && supplier.name.toLowerCase().includes(searchTerm)) ||
            (supplier.email && supplier.email.toLowerCase().includes(searchTerm));

        return matchesSearch;
    });

    displayFilteredSuppliers(filteredSuppliers);
}
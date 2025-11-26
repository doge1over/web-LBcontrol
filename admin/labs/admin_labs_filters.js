// Функции для фильтрации и поиска

function applyLabsFilters() {
    if (!labsData) return;

    const searchTerm = document.getElementById('labsSearch').value.toLowerCase();

    const filteredLabs = labsData.filter(lab => {
        const matchesSearch = !searchTerm ||
            lab.name.toLowerCase().includes(searchTerm) ||
            lab.code.toLowerCase().includes(searchTerm);

        return matchesSearch;
    });

    displayFilteredLabs(filteredLabs);
}

function clearLabsSearch() {
    document.getElementById('labsSearch').value = '';
    applyLabsFilters();
}

// Обработчики событий для поиска
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('labsSearch');
    if (searchInput) {
        searchInput.addEventListener('input', applyLabsFilters);
    }
});
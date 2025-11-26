// Функции для фильтрации и поиска

function applyUsersFilters() {
    const searchTerm = document.getElementById('usersSearch').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;
    const labFilter = document.getElementById('labFilter').value;

    filteredUsers = usersData.filter(user => {
        const matchesSearch = !searchTerm ||
            user.login.toLowerCase().includes(searchTerm) ||
            user.fullName.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.phone.toLowerCase().includes(searchTerm);

        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesLab = !labFilter || user.lab === labFilter;

        return matchesSearch && matchesRole && matchesLab;
    });

    renderUsersTable();
}

function clearUsersSearch() {
    document.getElementById('usersSearch').value = '';
    applyUsersFilters();
}

// Обработчики событий для поиска
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('usersSearch');
    if (searchInput) {
        searchInput.addEventListener('input', applyUsersFilters);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyUsersFilters();
            }
        });
    }
});
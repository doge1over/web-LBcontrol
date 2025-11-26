// Функция для очистки поиска
function clearRoomsSearch() {
    console.log('Очистка поиска помещений');
    document.getElementById('roomsSearch').value = '';
    applyRoomsFilters();
}

// Функция для применения фильтров
function applyRoomsFilters() {
    const rooms = getRoomsData();
    if (!rooms || rooms.length === 0) return;

    const searchTerm = document.getElementById('roomsSearch').value.toLowerCase();
    const labFilter = document.getElementById('labFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

    console.log('Применение фильтров помещений:', { searchTerm, labFilter, typeFilter });

    const filteredRooms = rooms.filter(room => {
        const matchesSearch = !searchTerm ||
            (room.number && room.number.toLowerCase().includes(searchTerm)) ||
            (room.name && room.name.toLowerCase().includes(searchTerm)) ||
            (room.lab && room.lab.toLowerCase().includes(searchTerm));

        const matchesLab = !labFilter || room.lab === labFilter;
        const matchesType = !typeFilter || room.type === typeFilter;

        return matchesSearch && matchesLab && matchesType;
    });

    displayFilteredRooms(filteredRooms);
}
// Функция для загрузки данных помещений в таблицу
function loadRoomsData() {
    console.log('Загрузка данных помещений...');
    const tbody = document.getElementById('roomsTableBody');
    if (!tbody) {
        console.error('Элемент roomsTableBody не найден');
        return;
    }

    const rooms = getRoomsData();

    if (!rooms || rooms.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Нет данных для отображения</td></tr>';
        console.warn('Данные помещений отсутствуют или пусты');
        updateRoomsStats();
        return;
    }

    console.log('Данные помещений найдены:', rooms);

    try {
        const roomsList = rooms.map(room => `
            <tr>
                <td>
                    <div class="room-info">
                        <div class="room-number">${room.number || 'Не указан'}</div>
                    </div>
                </td>
                <td>
                    <div class="room-name">${room.name || 'Не указано'}</div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn-small edit-btn" onclick="editRoom(${room.id})">
                            <span class="btn-icon">✏️</span>
                            <span class="btn-text">Редактировать</span>
                        </button>
                        <button class="action-btn-small delete-btn" onclick="deleteRoom(${room.id})">
                            <span class="btn-icon">🗑️</span>
                            <span class="btn-text">Удалить</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = roomsList;
        updateRoomsStats();
        console.log('Данные помещений загружены');
    } catch (error) {
        console.error('Ошибка при рендеринге данных помещений:', error);
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: red;">Ошибка загрузки данных</td></tr>';
    }
}

// Функция для отображения отфильтрованных помещений
function displayFilteredRooms(rooms) {
    const tbody = document.getElementById('roomsTableBody');
    if (!tbody) return;

    if (!rooms || rooms.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Ничего не найдено</td></tr>';
        document.getElementById('roomsResultsCount').textContent = '0';
        return;
    }

    try {
        const roomsList = rooms.map(room => `
            <tr>
                <td>
                    <div class="room-info">
                        <div class="room-number">${room.number || 'Не указан'}</div>
                    </div>
                </td>
                <td>
                    <div class="room-name">${room.name || 'Не указано'}</div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn-small edit-btn" onclick="editRoom(${room.id})">
                            <span class="btn-icon">✏️</span>
                            <span class="btn-text">Редактировать</span>
                        </button>
                        <button class="action-btn-small delete-btn" onclick="deleteRoom(${room.id})">
                            <span class="btn-icon">🗑️</span>
                            <span class="btn-text">Удалить</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = roomsList;
        document.getElementById('roomsResultsCount').textContent = rooms.length;
    } catch (error) {
        console.error('Ошибка при отображении отфильтрованных помещений:', error);
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: red;">Ошибка отображения данных</td></tr>';
    }
}

// Функция для обновления статистики помещений
function updateRoomsStats() {
    const rooms = getRoomsData();

    if (!rooms || rooms.length === 0) {
        document.getElementById('totalRoomsCount').textContent = '0';
        document.getElementById('roomsResultsCount').textContent = '0';
        document.getElementById('roomsTotalCount').textContent = '0';
        return;
    }

    const totalRooms = rooms.length;

    document.getElementById('totalRoomsCount').textContent = totalRooms;
    document.getElementById('roomsResultsCount').textContent = totalRooms;
    document.getElementById('roomsTotalCount').textContent = totalRooms;
}
// Функции для работы с помещениями
function addRoom() {
    console.log('Добавление помещения');
    document.getElementById('modalTitle').textContent = 'Добавление помещения';
    document.getElementById('modalFields').innerHTML = `
        <div class="form-group">
            <label for="roomNumber">Номер помещения *</label>
            <input type="text" id="roomNumber" placeholder="Например: 4.20" required>
        </div>
        <div class="form-group">
            <label for="roomName">Наименование помещения *</label>
            <input type="text" id="roomName" placeholder="Например: Основная химическая лаборатория" required>
        </div>
    `;

    document.getElementById('editModal').style.display = 'flex';
}

function editRoom(roomId) {
    console.log('Редактирование помещения:', roomId);
    const rooms = getRoomsData();
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        document.getElementById('modalTitle').textContent = 'Редактирование помещения';
        document.getElementById('modalFields').innerHTML = `
            <div class="form-group">
                <label for="roomNumber">Номер помещения *</label>
                <input type="text" id="roomNumber" value="${room.number || ''}" required>
            </div>
            <div class="form-group">
                <label for="roomName">Наименование помещения *</label>
                <input type="text" id="roomName" value="${room.name || ''}" required>
            </div>
            <input type="hidden" id="roomId" value="${room.id}">
        `;

        document.getElementById('editModal').style.display = 'flex';
    }
}

function deleteRoom(roomId) {
    console.log('Удаление помещения:', roomId);
    if (confirm('Вы уверены, что хотите удалить это помещение?')) {
        alert(`Помещение ID: ${roomId} будет удалено`);
        // Здесь будет логика удаления помещения
    }
}

// Функции для модальных окон
function closeEditModal() {
    console.log('Закрытие модального окна редактирования');
    document.getElementById('editModal').style.display = 'none';
}

function closeSupportModal() {
    console.log('Закрытие модального окна поддержки');
    document.getElementById('supportModal').style.display = 'none';
}

function openSupportModal() {
    console.log('Открытие модального окна поддержки');
    document.getElementById('supportModal').style.display = 'flex';
}
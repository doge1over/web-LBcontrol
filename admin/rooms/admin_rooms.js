console.log('=== ADMIN ROOMS JS ЗАГРУЖЕН ===');

// Данные помещений
const extendedRoomsData = [
    {
        id: 1,
        number: '4.20',
        name: 'Основная химическая лаборатория',
        type: 'лаборатория',
        area: '45',
        lab: 'Химическая лаборатория №1',
        seats: 'с2п2, х1',
        status: 'active'
    },
    {
        id: 2,
        number: '3.27',
        name: 'Лаборатория органической химии',
        type: 'лаборатория',
        area: '35',
        lab: 'Химическая лаборатория №2',
        seats: 'с3п1, х2, м1',
        status: 'active'
    },
    {
        id: 3,
        number: '2.15',
        name: 'Хранилище реактивов',
        type: 'хранилище',
        area: '25',
        lab: 'Химическая лаборатория №1',
        seats: 'с4, п0, ш2',
        status: 'active'
    },
    {
        id: 4,
        number: '1.08',
        name: 'Биохимическая лаборатория',
        type: 'лаборатория',
        area: '40',
        lab: 'Биохимическая лаборатория',
        seats: 'с4п4, х3, ц1',
        status: 'active'
    },
    {
        id: 5,
        number: '5.12',
        name: 'Склад оборудования',
        type: 'склад',
        area: '60',
        lab: 'Исследовательская лаборатория',
        seats: 'с6, п0, пк2',
        status: 'active'
    },
    {
        id: 6,
        number: '3.33',
        name: 'Аналитическая лаборатория',
        type: 'лаборатория',
        area: '30',
        lab: 'Лаборатория органической химии',
        seats: 'с2п2, х1, а1',
        status: 'inactive'
    },
    {
        id: 7,
        number: '4.25',
        name: 'Лаборатория контроля качества',
        type: 'лаборатория',
        area: '28',
        lab: 'Лаборатория контроля качества',
        seats: 'с3п3, х2, т1',
        status: 'active'
    },
    {
        id: 8,
        number: '2.09',
        name: 'Хранилище опасных веществ',
        type: 'хранилище',
        area: '20',
        lab: 'Химическая лаборатория №1',
        seats: 'с2, п0, х1',
        status: 'maintenance'
    }
];

// Проверка загрузки страницы
function checkPageLoad() {
    console.log('Проверка загрузки страницы помещений...');

    const criticalElements = [
        'roomsTableBody',
        'roomsSearch',
        'labFilter',
        'typeFilter',
        'editModal',
        'supportModal'
    ];

    let allFound = true;
    criticalElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`✓ ${id} найден`);
        } else {
            console.log(`✗ ${id} НЕ НАЙДЕН`);
            allFound = false;
        }
    });

    return allFound;
}

// Безопасное получение данных помещений
function getRoomsData() {
    return extendedRoomsData;
}

// Функция для возврата в админку
function goToAdmin() {
    console.log('Переход в админку');
    window.location.href = 'admin_dashboard.html';
}

// Функция для загрузки данных помещений
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

// Обработчик формы редактирования
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM ЗАГРУЖЕН ДЛЯ ADMIN ROOMS ===');

    if (!checkPageLoad()) {
        console.error('Критические элементы не найдены!');
        return;
    }

    console.log('Все критически элементы найдены, инициализация...');

    // Обработчик формы редактирования
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Сохранение изменений помещения');

            const roomNumber = document.getElementById('roomNumber').value;
            const roomName = document.getElementById('roomName').value;

            if (!roomNumber || !roomName) {
                alert('Пожалуйста, заполните обязательные поля (номер и наименование помещения)');
                return;
            }

            alert('Изменения сохранены!');
            closeEditModal();
        });
    }

    // Обработчик поиска
    const roomsSearch = document.getElementById('roomsSearch');
    if (roomsSearch) {
        roomsSearch.addEventListener('input', function() {
            console.log('Поиск помещений:', this.value);
            applyRoomsFilters();
        });
    }

    // Обработчики фильтров
    const labFilter = document.getElementById('labFilter');
    const typeFilter = document.getElementById('typeFilter');

    if (labFilter) {
        labFilter.addEventListener('change', applyRoomsFilters);
    }

    if (typeFilter) {
        typeFilter.addEventListener('change', applyRoomsFilters);
    }

    // Обработчик формы поддержки
    const supportForm = document.querySelector('.support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы поддержки');
            alert('Сообщение отправлено в службу поддержки!');
            closeSupportModal();
        });
    }

    // Загрузка данных
    console.log('Загрузка данных помещений...');
    loadRoomsData();
    console.log('Инициализация завершена');
});
// Переменная для хранения текущего выбранного пользователя
let currentUserId = null;

// Функция для возврата в админку
function goToAdmin() {
    window.location.href = 'admin_dashboard.html';
}

// Функция для загрузки данных пользователей
function loadUsersData() {
    const tbody = document.getElementById('usersTableBody');

    if (!tbody) {
        console.error('Элемент usersTableBody не найден');
        return;
    }

    console.log('Загрузка данных пользователей:', usersData);

    if (!usersData || usersData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #ccc;">Нет данных для отображения</td></tr>';
        return;
    }

    tbody.innerHTML = usersData.map(user => `
        <tr>
            <td>
                <div class="user-info">
                    <div class="user-name">${user.fullName}</div>
                    <div class="user-login">@${user.login}</div>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <div class="email">${user.email}</div>
                    <div class="phone">${user.phone}</div>
                </div>
            </td>
            <td>
                <span class="role-badge role-${user.role.toLowerCase().replace(' ', '-')}">
                    ${user.role}
                </span>
            </td>
            <td>${user.lab}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small edit-btn" onclick="editUser(${user.id})">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">Редактировать</span>
                    </button>
                    <button class="action-btn-small history-btn" onclick="viewUserHistory(${user.id})">
                        <span class="btn-icon">📊</span>
                        <span class="btn-text">История</span>
                    </button>
                    <button class="action-btn-small delete-btn" onclick="deleteUser(${user.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Удалить</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    updateUsersStats();
}

// Функция для обновления статистики пользователей
function updateUsersStats() {
    if (!usersData || usersData.length === 0) {
        document.getElementById('totalUsersCount').textContent = '0';
        document.getElementById('adminsCount').textContent = '0';
        document.getElementById('usersResultsCount').textContent = '0';
        document.getElementById('usersTotalCount').textContent = '0';
        return;
    }

    const totalUsers = usersData.length;
    const adminsCount = usersData.filter(user => user.role === 'Администратор').length;

    document.getElementById('totalUsersCount').textContent = totalUsers;
    document.getElementById('adminsCount').textContent = adminsCount;
    document.getElementById('usersResultsCount').textContent = totalUsers;
    document.getElementById('usersTotalCount').textContent = totalUsers;
}

// Функция для очистки поиска
function clearUsersSearch() {
    document.getElementById('usersSearch').value = '';
    applyUsersFilters();
}

// Функция для применения фильтров
function applyUsersFilters() {
    if (!usersData) return;

    const searchTerm = document.getElementById('usersSearch').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;
    const labFilter = document.getElementById('labFilter').value;

    const filteredUsers = usersData.filter(user => {
        const matchesSearch = !searchTerm ||
            user.fullName.toLowerCase().includes(searchTerm) ||
            user.login.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.phone.toLowerCase().includes(searchTerm);

        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesLab = !labFilter || user.lab === labFilter;

        return matchesSearch && matchesRole && matchesLab;
    });

    displayFilteredUsers(filteredUsers);
}

// Функция для отображения отфильтрованных пользователей
function displayFilteredUsers(users) {
    const tbody = document.getElementById('usersTableBody');

    if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #ccc;">Ничего не найдено</td></tr>';
        document.getElementById('usersResultsCount').textContent = '0';
        return;
    }

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>
                <div class="user-info">
                    <div class="user-name">${user.fullName}</div>
                    <div class="user-login">@${user.login}</div>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <div class="email">${user.email}</div>
                    <div class="phone">${user.phone}</div>
                </div>
            </td>
            <td>
                <span class="role-badge role-${user.role.toLowerCase().replace(' ', '-')}">
                    ${user.role}
                </span>
            </td>
            <td>${user.lab}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small edit-btn" onclick="editUser(${user.id})">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">Редактировать</span>
                    </button>
                    <button class="action-btn-small history-btn" onclick="viewUserHistory(${user.id})">
                        <span class="btn-icon">📊</span>
                        <span class="btn-text">История</span>
                    </button>
                    <button class="action-btn-small delete-btn" onclick="deleteUser(${user.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Удалить</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('usersResultsCount').textContent = users.length;
}

// Функция для отображения истории пользователя
function viewUserHistory(userId) {
    currentUserId = userId;
    const user = usersData.find(u => u.id === userId);

    if (!user) {
        alert('Пользователь не найден');
        return;
    }

    // Скрываем основную таблицу и показываем таблицу истории
    document.getElementById('usersTableBody').closest('.table-section').style.display = 'none';

    // Создаем или показываем секцию истории
    let historySection = document.getElementById('historySection');
    if (!historySection) {
        historySection = document.createElement('div');
        historySection.id = 'historySection';
        historySection.className = 'table-section';
        historySection.innerHTML = `
            <div class="section-header">
                <h2>История действий: ${user.fullName}</h2>
                <div class="history-actions">
                    <button class="action-btn export-btn" onclick="exportUserHistory()">
                        📤 Экспорт истории
                    </button>
                    <button class="action-btn back-btn" onclick="backToUsers()" style="color: white; border-color: white;">
                        ← Назад к пользователям
                    </button>
                </div>
            </div>
            <div class="table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Дата и время</th>
                            <th>Действие</th>
                            <th>Детали</th>
                            <th>IP-адрес</th>
                        </tr>
                    </thead>
                    <tbody id="historyTableBody">
                    </tbody>
                </table>
            </div>
        `;
        document.querySelector('.admin-container').appendChild(historySection);
    } else {
        historySection.style.display = 'block';
    }

    // Загружаем данные истории
    loadHistoryData(userId);
}

// Функция для загрузки данных истории
function loadHistoryData(userId) {
    const tbody = document.getElementById('historyTableBody');
    if (!tbody) return;

    const userHistory = userHistoryData.filter(history => history.userId === userId);

    if (userHistory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #ccc;">История действий отсутствует</td></tr>';
        return;
    }

    tbody.innerHTML = userHistory.map(history => `
        <tr>
            <td>
                <div class="datetime-info">
                    <div class="date">${formatDate(history.timestamp)}</div>
                    <div class="time">${formatTime(history.timestamp)}</div>
                </div>
            </td>
            <td>${history.action}</td>
            <td>${history.details}</td>
            <td>${history.ip}</td>
        </tr>
    `).join('');
}

// Функция для возврата к таблице пользователей
function backToUsers() {
    const historySection = document.getElementById('historySection');
    if (historySection) {
        historySection.style.display = 'none';
    }
    document.getElementById('usersTableBody').closest('.table-section').style.display = 'block';
    currentUserId = null;
}

// Функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

// Функция для форматирования времени
function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

// Функции для работы с пользователями
function addUser() {
    document.getElementById('modalTitle').textContent = 'Добавление пользователя';
    document.getElementById('modalFields').innerHTML = `
        <div class="form-group">
            <label for="userFullName">ФИО</label>
            <input type="text" id="userFullName" placeholder="Введите полное имя" required>
        </div>
        <div class="form-group">
            <label for="userLogin">Логин</label>
            <input type="text" id="userLogin" placeholder="Введите логин" required>
        </div>
        <div class="form-group">
            <label for="userEmail">Email</label>
            <input type="email" id="userEmail" placeholder="Введите email" required>
        </div>
        <div class="form-group">
            <label for="userPhone">Телефон</label>
            <input type="tel" id="userPhone" placeholder="+7 (XXX) XXX-XX-XX" required>
        </div>
        <div class="form-group">
            <label for="userRole">Роль</label>
            <select id="userRole" required>
                <option value="">Выберите роль</option>
                <option value="Администратор">Администратор</option>
                <option value="Химик">Химик</option>
                <option value="Лаборант">Лаборант</option>
                <option value="Исследователь">Исследователь</option>
                <option value="Контроль качества">Контроль качества</option>
            </select>
        </div>
        <div class="form-group">
            <label for="userLab">Лаборатория</label>
            <select id="userLab" required>
                <option value="">Выберите лабораторию</option>
                <option value="Химическая лаборатория №1">Химическая лаборатория №1</option>
                <option value="Химическая лаборатория №2">Химическая лаборатория №2</option>
                <option value="Исследовательский центр">Исследовательский центр</option>
                <option value="Лаборатория контроля качества">Лаборатория контроля качества</option>
            </select>
        </div>
        <div class="form-group">
            <label for="userStatus">Статус</label>
            <select id="userStatus" required>
                <option value="active">Активен</option>
                <option value="inactive">Неактивен</option>
            </select>
        </div>
    `;
    document.getElementById('editModal').style.display = 'flex';
}

function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (user) {
        document.getElementById('modalTitle').textContent = 'Редактирование пользователя';
        document.getElementById('modalFields').innerHTML = `
            <div class="form-group">
                <label for="userFullName">ФИО</label>
                <input type="text" id="userFullName" value="${user.fullName}" required>
            </div>
            <div class="form-group">
                <label for="userLogin">Логин</label>
                <input type="text" id="userLogin" value="${user.login}" required>
            </div>
            <div class="form-group">
                <label for="userEmail">Email</label>
                <input type="email" id="userEmail" value="${user.email}" required>
            </div>
            <div class="form-group">
                <label for="userPhone">Телефон</label>
                <input type="tel" id="userPhone" value="${user.phone}" required>
            </div>
            <div class="form-group">
                <label for="userRole">Роль</label>
                <select id="userRole" required>
                    <option value="Администратор" ${user.role === 'Администратор' ? 'selected' : ''}>Администратор</option>
                    <option value="Химик" ${user.role === 'Химик' ? 'selected' : ''}>Химик</option>
                    <option value="Лаборант" ${user.role === 'Лаборант' ? 'selected' : ''}>Лаборант</option>
                    <option value="Исследователь" ${user.role === 'Исследователь' ? 'selected' : ''}>Исследователь</option>
                    <option value="Контроль качества" ${user.role === 'Контроль качества' ? 'selected' : ''}>Контроль качества</option>
                </select>
            </div>
            <div class="form-group">
                <label for="userLab">Лаборатория</label>
                <select id="userLab" required>
                    <option value="Химическая лаборатория №1" ${user.lab === 'Химическая лаборатория №1' ? 'selected' : ''}>Химическая лаборатория №1</option>
                    <option value="Химическая лаборатория №2" ${user.lab === 'Химическая лаборатория №2' ? 'selected' : ''}>Химическая лаборатория №2</option>
                    <option value="Исследовательский центр" ${user.lab === 'Исследовательский центр' ? 'selected' : ''}>Исследовательский центр</option>
                    <option value="Лаборатория контроля качества" ${user.lab === 'Лаборатория контроля качества' ? 'selected' : ''}>Лаборатория контроля качества</option>
                </select>
            </div>
            <div class="form-group">
                <label for="userStatus">Статус</label>
                <select id="userStatus" required>
                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Активен</option>
                    <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Неактивен</option>
                </select>
            </div>
            <input type="hidden" id="userId" value="${user.id}">
        `;
        document.getElementById('editModal').style.display = 'flex';
    }
}

function deleteUser(userId) {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        alert(`Пользователь ID: ${userId} будет удален`);
    }
}

function resetPassword() {
    alert('Функция сброса пароля будет реализована в ближайшее время');
}

function managePermissions() {
    alert('Функция управления правами доступа будет реализована в ближайшее время');
}

function exportUsers() {
    alert('Функция экспорта пользователей будет реализована в ближайшее время');
}


// Функции для модальных окон
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function closeSupportModal() {
    document.getElementById('supportModal').style.display = 'none';
}

function openSupportModal() {
    document.getElementById('supportModal').style.display = 'flex';
}

// Обработчик формы редактирования
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализация страницы пользователей...');

    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Изменения сохранены!');
            closeEditModal();
        });
    }

    // Обработчик поиска
    const usersSearch = document.getElementById('usersSearch');
    if (usersSearch) {
        usersSearch.addEventListener('input', applyUsersFilters);
    }

    // Загрузка данных при загрузке страницы
    setTimeout(() => {
        loadUsersData();
    }, 100);
});
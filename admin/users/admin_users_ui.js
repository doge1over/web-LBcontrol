// Функции для работы с пользовательским интерфейсом

function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    const resultsCount = document.getElementById('usersResultsCount');
    const totalCount = document.getElementById('usersTotalCount');

    if (!tbody) return;

    if (filteredUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #ccc;">Пользователи не найдены</td></tr>';
    } else {
        tbody.innerHTML = filteredUsers.map(user => `
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
    }

    resultsCount.textContent = filteredUsers.length;
    totalCount.textContent = usersData.length;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
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
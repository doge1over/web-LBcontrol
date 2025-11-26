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
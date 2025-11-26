// Глобальные переменные для истории действий
let currentPage = 1;
const pageSize = 5; // По 5 записей на страницу для демонстрации
let allLogs = [];
let filteredLogs = [];

// Функция возврата назад
function goBack() {
    window.location.href = 'menu.html';
}

// Функция открытия модального окна поддержки
function openSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Функция закрытия модального окна поддержки
function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Инициализация тестовых данных
function initializeData() {
    allLogs = [
        { id: 'LOG-001', date: '2024-12-15T10:30:00', action: 'Добавление реагента', user: 'admin', reagent: 'Соляная кислота', reagentId: 'CHEM-001', batchId: 'BATCH-001' },
        { id: 'LOG-002', date: '2024-12-15T11:15:00', action: 'Изменение количества', user: 'chemist', reagent: 'Ацетон', reagentId: 'CHEM-002', batchId: 'BATCH-002' },
        { id: 'LOG-003', date: '2024-12-14T14:20:00', action: 'Списание реагента', user: 'user1', reagent: 'Этанол', reagentId: 'CHEM-003', batchId: 'BATCH-003' },
        { id: 'LOG-004', date: '2024-12-14T16:45:00', action: 'Добавление поставщика', user: 'manager', reagent: '-', reagentId: '-', batchId: '-' },
        { id: 'LOG-005', date: '2024-12-13T09:10:00', action: 'Изменение данных', user: 'admin', reagent: 'Перекись водорода', reagentId: 'CHEM-004', batchId: 'BATCH-004' },
        { id: 'LOG-006', date: '2024-12-13T11:30:00', action: 'Просмотр отчета', user: 'user2', reagent: '-', reagentId: '-', batchId: '-' },
        { id: 'LOG-007', date: '2024-12-12T08:45:00', action: 'Добавление реагента', user: 'chemist', reagent: 'Серная кислота', reagentId: 'CHEM-005', batchId: 'BATCH-005' },
        { id: 'LOG-008', date: '2024-12-12T13:20:00', action: 'Удаление реагента', user: 'admin', reagent: 'Метанол', reagentId: 'CHEM-006', batchId: 'BATCH-006' },
        { id: 'LOG-009', date: '2024-12-11T10:00:00', action: 'Изменение поставщика', user: 'manager', reagent: '-', reagentId: '-', batchId: '-' },
        { id: 'LOG-010', date: '2024-12-11T15:45:00', action: 'Списание реагента', user: 'user1', reagent: 'Изопропанол', reagentId: 'CHEM-007', batchId: 'BATCH-007' },
        { id: 'LOG-011', date: '2024-12-10T09:30:00', action: 'Добавление реагента', user: 'chemist', reagent: 'Азотная кислота', reagentId: 'CHEM-008', batchId: 'BATCH-008' },
        { id: 'LOG-012', date: '2024-12-10T14:15:00', action: 'Изменение данных', user: 'admin', reagent: 'Гексан', reagentId: 'CHEM-009', batchId: 'BATCH-009' }
    ];

    filteredLogs = [...allLogs];
    applyFilters(); // Применяем фильтры при инициализации
}

function applyFilters() {
    const userFilter = document.getElementById('userFilter').value;
    const searchFilter = document.getElementById('searchInput').value.toLowerCase();
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;

    filteredLogs = allLogs.filter(log => {
        // Фильтр по пользователю
        if (userFilter && log.user !== userFilter) return false;

        // Поиск по всем полям
        if (searchFilter) {
            const searchable = `${log.id} ${log.date} ${log.action} ${log.user} ${log.reagent} ${log.reagentId} ${log.batchId}`.toLowerCase();
            if (!searchable.includes(searchFilter)) return false;
        }

        // Фильтр по дате
        if (dateFrom) {
            const logDate = log.date.split('T')[0];
            if (logDate < dateFrom) return false;
        }
        if (dateTo) {
            const logDate = log.date.split('T')[0];
            if (logDate > dateTo) return false;
        }

        return true;
    });

    currentPage = 1; // Сбрасываем на первую страницу при фильтрации
    renderTable();
    updatePagination();
    updateStats();
}

function resetFilters() {
    document.getElementById('userFilter').value = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    applyFilters();
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredLogs.length / pageSize);
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderTable();
        updatePagination();
    }
}

function renderTable() {
    const tbody = document.getElementById('historyTableBody');
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageLogs = filteredLogs.slice(startIndex, endIndex);

    if (pageLogs.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #cccccc;">
                    📭 Записи не найдены. Попробуйте изменить параметры фильтрации.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = pageLogs.map(log => `
        <tr>
            <td>${log.id}</td>
            <td>${formatDate(log.date)}</td>
            <td>${log.action}</td>
            <td>
                <span class="user-badge ${log.user}">${log.user}</span>
            </td>
            <td>${log.reagent}</td>
            <td>${log.reagentId}</td>
            <td>${log.batchId}</td>
        </tr>
    `).join('');
}

function updatePagination() {
    const totalPages = Math.ceil(filteredLogs.length / pageSize);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function updateStats() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = filteredLogs.length;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Обработчики событий для истории действий
document.addEventListener('DOMContentLoaded', function() {
    initializeData();

    // Мгновенная фильтрация при изменении полей
    const searchInput = document.getElementById('searchInput');
    const userFilter = document.getElementById('userFilter');
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (userFilter) userFilter.addEventListener('change', applyFilters);
    if (dateFrom) dateFrom.addEventListener('change', applyFilters);
    if (dateTo) dateTo.addEventListener('change', applyFilters);

    // Обработка формы поддержки
    const supportForm = document.querySelector('.support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Сообщение отправлено в поддержку!');
            closeSupportModal();
            this.reset();
        });
    }
});

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('supportModal');
    if (event.target == modal) {
        closeSupportModal();
    }
}
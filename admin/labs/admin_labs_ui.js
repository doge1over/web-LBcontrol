// Функции для работы с пользовательским интерфейсом

function loadLabsData() {
    const tbody = document.getElementById('labsTableBody');

    if (!tbody) {
        console.error('Элемент labsTableBody не найден');
        return;
    }

    console.log('Загрузка данных лабораторий:', labsData);

    if (!labsData || labsData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Нет данных для отображения</td></tr>';
        return;
    }

    tbody.innerHTML = labsData.map(lab => `
        <tr>
            <td>
                <div class="lab-info">
                    <div class="lab-name">${lab.name}</div>
                </div>
            </td>
            <td>
                <div class="location-info">
                    <div class="room-number">${lab.code}</div>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small edit-btn" onclick="editLab(${lab.id})">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">Редактировать</span>
                    </button>
                    <button class="action-btn-small staff-btn-small" onclick="viewLabStaff(${lab.id})">
                        <span class="btn-icon">👥</span>
                        <span class="btn-text">Персонал</span>
                    </button>
                    <button class="action-btn-small delete-btn" onclick="deleteLab(${lab.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Удалить</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    updateLabsStats();
}

function displayFilteredLabs(labs) {
    const tbody = document.getElementById('labsTableBody');

    if (!labs || labs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Ничего не найдено</td></tr>';
        document.getElementById('labsResultsCount').textContent = '0';
        return;
    }

    tbody.innerHTML = labs.map(lab => `
        <tr>
            <td>
                <div class="lab-info">
                    <div class="lab-name">${lab.name}</div>
                </div>
            </td>
            <td>
                <div class="location-info">
                    <div class="room-number">${lab.code}</div>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small edit-btn" onclick="editLab(${lab.id})">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">Редактировать</span>
                    </button>
                    <button class="action-btn-small staff-btn-small" onclick="viewLabStaff(${lab.id})">
                        <span class="btn-icon">👥</span>
                        <span class="btn-text">Персонал</span>
                    </button>
                    <button class="action-btn-small delete-btn" onclick="deleteLab(${lab.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Удалить</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('labsResultsCount').textContent = labs.length;
}

function loadStaffData(labId) {
    const tbody = document.getElementById('staffTableBody');
    if (!tbody) return;

    const labStaff = staffData.filter(staff => staff.labId === labId);

    if (labStaff.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #ccc;">В этой лаборатории пока нет сотрудников</td></tr>';
        return;
    }

    tbody.innerHTML = labStaff.map(staff => `
        <tr>
            <td>
                <div class="staff-info">
                    <div class="staff-name">${staff.fullName}</div>
                    <div class="staff-lab">${staff.labCode}</div>
                </div>
            </td>
            <td>${staff.role}</td>
            <td>
                <span class="status-badge status-${staff.status}">
                    ${staff.status === 'active' ? 'Активен' : 'Неактивен'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small edit-btn" onclick="editStaff(${staff.id})">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">Редактировать</span>
                    </button>
                    <button class="action-btn-small delete-btn" onclick="deleteStaff(${staff.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Удалить</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateLabsStats() {
    if (!labsData || labsData.length === 0) {
        document.getElementById('labsResultsCount').textContent = '0';
        document.getElementById('labsTotalCount').textContent = '0';
        return;
    }

    const totalLabs = labsData.length;

    document.getElementById('labsResultsCount').textContent = totalLabs;
    document.getElementById('labsTotalCount').textContent = totalLabs;
}
// Функции для работы с персоналом лабораторий

function viewLabStaff(labId) {
    currentLabId = labId;
    const lab = labsData.find(l => l.id === labId);

    if (!lab) {
        alert('Лаборатория не найдена');
        return;
    }

    // Скрываем основную таблицу и показываем таблицу персонала
    document.getElementById('labsTableBody').closest('.table-section').style.display = 'none';

    // Создаем или показываем секцию персонала
    let staffSection = document.getElementById('staffSection');
    if (!staffSection) {
        staffSection = document.createElement('div');
        staffSection.id = 'staffSection';
        staffSection.className = 'table-section';
        staffSection.innerHTML = `
            <div class="section-header">
                <h2>Персонал лаборатории: ${lab.name}</h2>
                <div class="staff-actions">
                    <button class="action-btn add-btn" onclick="addStaffMember()">
                        ➕ Добавить сотрудника
                    </button>
                    <button class="action-btn back-btn" onclick="backToLabs()">
                        ← Назад к лабораториям
                    </button>
                </div>
            </div>
            <div class="table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Роль</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody id="staffTableBody">
                    </tbody>
                </table>
            </div>
        `;
        document.querySelector('.admin-container').appendChild(staffSection);
    } else {
        staffSection.style.display = 'block';
    }

    // Загружаем данные персонала
    loadStaffData(labId);
}

function backToLabs() {
    const staffSection = document.getElementById('staffSection');
    if (staffSection) {
        staffSection.style.display = 'none';
    }
    document.getElementById('labsTableBody').closest('.table-section').style.display = 'block';
    currentLabId = null;
}
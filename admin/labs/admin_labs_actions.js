// Основные действия с лабораториями

function addLab() {
    alert('Функция добавления лаборатории будет реализована в ближайшее время');
}

function editLab(labId) {
    const lab = labsData.find(l => l.id === labId);
    if (lab) {
        document.getElementById('modalTitle').textContent = 'Редактирование лаборатории';
        document.getElementById('modalFields').innerHTML = `
            <div class="form-group">
                <label for="editName">Название лаборатории</label>
                <input type="text" id="editName" value="${lab.name}" required>
            </div>
            <div class="form-group">
                <label for="editCode">Код лаборатории</label>
                <input type="text" id="editCode" value="${lab.code}" required>
            </div>
        `;

        const editModal = document.getElementById('editModal');
        editModal.style.display = 'flex';
        editModal.style.alignItems = 'center';
        editModal.style.justifyContent = 'center';
    }
}

function deleteLab(labId) {
    if (confirm('Вы уверены, что хотите удалить эту лабораторию?')) {
        alert(`Лаборатория ID: ${labId} будет удалена`);
    }
}

// Функции для работы с персоналом
function addStaffMember() {
    if (!currentLabId) return;

    const lab = labsData.find(l => l.id === currentLabId);
    if (!lab) return;

    document.getElementById('modalTitle').textContent = 'Добавление сотрудника';
    document.getElementById('modalFields').innerHTML = `
        <div class="form-group">
            <label for="staffFullName">ФИО</label>
            <input type="text" id="staffFullName" required>
        </div>
        <div class="form-group">
            <label for="staffRole">Роль</label>
            <input type="text" id="staffRole" required>
        </div>
        <input type="hidden" id="staffLabId" value="${currentLabId}">
        <input type="hidden" id="staffLabCode" value="${lab.code}">
    `;

    const editModal = document.getElementById('editModal');
    editModal.style.display = 'flex';
    editModal.style.alignItems = 'center';
    editModal.style.justifyContent = 'center';
}

function editStaff(staffId) {
    const staff = staffData.find(s => s.id === staffId);
    if (staff) {
        document.getElementById('modalTitle').textContent = 'Редактирование сотрудника';
        document.getElementById('modalFields').innerHTML = `
            <div class="form-group">
                <label for="staffFullName">ФИО</label>
                <input type="text" id="staffFullName" value="${staff.fullName}" required>
            </div>
            <div class="form-group">
                <label for="staffRole">Роль</label>
                <input type="text" id="staffRole" value="${staff.role}" required>
            </div>
            <div class="form-group">
                <label for="staffStatus">Статус</label>
                <select id="staffStatus" required>
                    <option value="active" ${staff.status === 'active' ? 'selected' : ''}>Активен</option>
                    <option value="inactive" ${staff.status === 'inactive' ? 'selected' : ''}>Неактивен</option>
                </select>
            </div>
            <input type="hidden" id="staffId" value="${staff.id}">
        `;

        const editModal = document.getElementById('editModal');
        editModal.style.display = 'flex';
        editModal.style.alignItems = 'center';
        editModal.style.justifyContent = 'center';
    }
}

function deleteStaff(staffId) {
    if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
        alert(`Сотрудник ID: ${staffId} будет удален`);
        if (currentLabId) {
            loadStaffData(currentLabId);
        }
    }
}

// Обработка формы редактирования
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Изменения сохранены!');
            closeEditModal();
        });
    }
});
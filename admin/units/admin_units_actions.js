console.log('=== ADMIN UNITS ACTIONS ЗАГРУЖЕН ===');

// Функции для работы с единицами измерения
function addUnit() {
    console.log('Добавление единицы измерения');
    document.getElementById('modalTitle').textContent = 'Добавление единицы измерения';
    document.getElementById('modalFields').innerHTML = `
        <div class="form-group">
            <label for="unitName">Название единицы</label>
            <input type="text" id="unitName" placeholder="Например: килограмм" required>
        </div>
        <div class="form-group">
            <label for="unitSymbol">Сокращение</label>
            <input type="text" id="unitSymbol" placeholder="Например: кг" required>
        </div>
        <div class="form-group">
            <label for="unitType">Тип измерения</label>
            <select id="unitType" required>
                <option value="Масса">Масса</option>
                <option value="Объем">Объем</option>
                <option value="Количество">Количество</option>
                <option value="Длина">Длина</option>
                <option value="Другое">Другое</option>
            </select>
        </div>
        <div class="form-group">
            <label for="unitQuantitative">Количественное</label>
            <select id="unitQuantitative" required>
                <option value="true">Да</option>
                <option value="false">Нет</option>
            </select>
        </div>
    `;

    const editModal = document.getElementById('editModal');
    editModal.style.display = 'flex';
    editModal.style.alignItems = 'center';
    editModal.style.justifyContent = 'center';
}

function editUnit(unitId) {
    console.log('Редактирование единицы измерения:', unitId);
    const units = getUnitsData();
    const unit = units.find(u => u.id === unitId);
    if (unit) {
        document.getElementById('modalTitle').textContent = 'Редактирование единицы измерения';
        document.getElementById('modalFields').innerHTML = `
            <div class="form-group">
                <label for="unitName">Название единицы</label>
                <input type="text" id="unitName" value="${unit.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="unitSymbol">Сокращение</label>
                <input type="text" id="unitSymbol" value="${unit.symbol || ''}" required>
            </div>
            <div class="form-group">
                <label for="unitType">Тип измерения</label>
                <select id="unitType" required>
                    <option value="Масса" ${unit.type === 'Масса' ? 'selected' : ''}>Масса</option>
                    <option value="Объем" ${unit.type === 'Объем' ? 'selected' : ''}>Объем</option>
                    <option value="Количество" ${unit.type === 'Количество' ? 'selected' : ''}>Количество</option>
                    <option value="Длина" ${unit.type === 'Длина' ? 'selected' : ''}>Длина</option>
                    <option value="Другое" ${unit.type === 'Другое' ? 'selected' : ''}>Другое</option>
                </select>
            </div>
            <div class="form-group">
                <label for="unitQuantitative">Количественное</label>
                <select id="unitQuantitative" required>
                    <option value="true" ${unit.quantitative ? 'selected' : ''}>Да</option>
                    <option value="false" ${!unit.quantitative ? 'selected' : ''}>Нет</option>
                </select>
            </div>
            <input type="hidden" id="unitId" value="${unit.id}">
        `;

        const editModal = document.getElementById('editModal');
        editModal.style.display = 'flex';
        editModal.style.alignItems = 'center';
        editModal.style.justifyContent = 'center';
    }
}

function deleteUnit(unitId) {
    console.log('Удаление единицы измерения:', unitId);
    if (confirm('Вы уверены, что хотите удалить эту единицу измерения?')) {
        alert(`Единица измерения ID: ${unitId} будет удалена`);
        // Здесь будет логика удаления единицы измерения
    }
}

// Обработка формы редактирования
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Сохранение изменений единицы измерения');
            alert('Изменения сохранены!');
            closeEditModal();
        });
    }
});
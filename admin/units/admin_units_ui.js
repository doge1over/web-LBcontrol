console.log('=== ADMIN UNITS UI ЗАГРУЖЕН ===');

// Функция для загрузки данных единиц измерения
function loadUnitsData() {
    console.log('Загрузка данных единиц измерения...');
    const tbody = document.getElementById('unitsTableBody');
    if (!tbody) {
        console.error('Элемент unitsTableBody не найден');
        return;
    }

    // Безопасно получаем данные
    const units = getUnitsData();

    if (!units || units.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #ccc;">Нет данных для отображения</td></tr>';
        console.warn('Данные единиц измерения отсутствуют или пусты');
        updateUnitsStats();
        return;
    }

    console.log('Данные единиц измерения найдены:', units);

    // Безопасное использование map с проверкой
    try {
        const unitsList = units.map(unit => `
            <tr>
                <td>
                    <div class="unit-info">
                        <div class="unit-name">${unit.name || 'Не указано'}</div>
                    </div>
                </td>
                <td>
                    <div class="unit-symbol">
                        <span class="symbol-badge">${unit.symbol || 'н/д'}</span>
                    </div>
                </td>
                <td>
                    <div class="unit-quantitative">
                        <span class="quantitative-badge ${unit.quantitative ? 'quantitative-yes' : 'quantitative-no'}">
                            ${unit.quantitative ? 'Да' : 'Нет'}
                        </span>
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn-small edit-btn" onclick="editUnit(${unit.id})">
                            <span class="btn-icon">✏️</span>
                            <span class="btn-text">Редактировать</span>
                        </button>
                        <button class="action-btn-small delete-btn" onclick="deleteUnit(${unit.id})">
                            <span class="btn-icon">🗑️</span>
                            <span class="btn-text">Удалить</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = unitsList;
        updateUnitsStats();
        console.log('Данные единиц измерения загружены');
    } catch (error) {
        console.error('Ошибка при рендеринге данных единиц измерения:', error);
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">Ошибка загрузки данных</td></tr>';
    }
}

// Функция для отображения отфильтрованных единиц измерения
function displayFilteredUnits(units) {
    const tbody = document.getElementById('unitsTableBody');
    if (!tbody) return;

    if (!units || units.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #ccc;">Ничего не найдено</td></tr>';
        document.getElementById('unitsResultsCount').textContent = '0';
        return;
    }

    try {
        const unitsList = units.map(unit => `
            <tr>
                <td>
                    <div class="unit-info">
                        <div class="unit-name">${unit.name || 'Не указано'}</div>
                    </div>
                </td>
                <td>
                    <div class="unit-symbol">
                        <span class="symbol-badge">${unit.symbol || 'н/д'}</span>
                    </div>
                </td>
                <td>
                    <div class="unit-quantitative">
                        <span class="quantitative-badge ${unit.quantitative ? 'quantitative-yes' : 'quantitative-no'}">
                            ${unit.quantitative ? 'Да' : 'Нет'}
                        </span>
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn-small edit-btn" onclick="editUnit(${unit.id})">
                            <span class="btn-icon">✏️</span>
                            <span class="btn-text">Редактировать</span>
                        </button>
                        <button class="action-btn-small delete-btn" onclick="deleteUnit(${unit.id})">
                            <span class="btn-icon">🗑️</span>
                            <span class="btn-text">Удалить</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = unitsList;
        document.getElementById('unitsResultsCount').textContent = units.length;
    } catch (error) {
        console.error('Ошибка при отображении отфильтрованных единиц измерения:', error);
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">Ошибка отображения данных</td></tr>';
    }
}

// Функция для обновления статистики единиц измерения
function updateUnitsStats() {
    const units = getUnitsData();

    if (!units || units.length === 0) {
        document.getElementById('totalUnitsCount').textContent = '0';
        document.getElementById('unitsResultsCount').textContent = '0';
        document.getElementById('unitsTotalCount').textContent = '0';
        return;
    }

    const totalUnits = units.length;

    document.getElementById('totalUnitsCount').textContent = totalUnits;
    document.getElementById('unitsResultsCount').textContent = totalUnits;
    document.getElementById('unitsTotalCount').textContent = totalUnits;
}
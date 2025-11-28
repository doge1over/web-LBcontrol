// admin_manufacturers_ui.js

// Функция для загрузки данных производителей
async function loadManufacturersData() {
    const tbody = document.getElementById('manufacturersTableBody');

    if (!tbody) {
        console.error('Элемент manufacturersTableBody не найден');
        return;
    }

    try {
        manufacturersData = await manufacturerService.getAll();
        console.log('Загружено производителей:', manufacturersData);

        displayFilteredManufacturers(manufacturersData);
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ff6b6b;">Ошибка загрузки данных</td></tr>';
    }
}

// Функция для отображения отфильтрованных производителей
function displayFilteredManufacturers(manufacturers) {
    const tbody = document.getElementById('manufacturersTableBody');

    if (!manufacturers || manufacturers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Нет данных для отображения</td></tr>';
        updateManufacturersStats(0);
        return;
    }

    tbody.innerHTML = manufacturers.map(manufacturer => `
        <tr>
            <td>
                <div class="manufacturer-info">
                    <div class="manufacturer-name">${manufacturer.name}</div>
                    <div class="manufacturer-id">ID: ${manufacturer.id}</div>
                </div>
            </td>
            <td>
                <div class="manufacturer-contact">
                    <div class="contact-info">Контактная информация отсутствует</div>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small edit-btn" onclick="editManufacturer(${manufacturer.id})">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">Редактировать</span>
                    </button>
                    <button class="action-btn-small delete-btn" onclick="deleteManufacturer(${manufacturer.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Удалить</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    updateManufacturersStats(manufacturers.length);
}

// Функция для обновления статистики
function updateManufacturersStats(displayedCount) {
    const totalCount = manufacturersData.length;

    document.getElementById('manufacturersResultsCount').textContent = displayedCount;
    document.getElementById('manufacturersTotalCount').textContent = totalCount;
}
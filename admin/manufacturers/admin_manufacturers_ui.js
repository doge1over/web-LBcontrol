// Функция для загрузки данных производителей
function loadManufacturersData() {
    const tbody = document.getElementById('manufacturersTableBody');

    if (!tbody) {
        console.error('Элемент manufacturersTableBody не найден');
        return;
    }

    console.log('Загрузка данных производителей:', manufacturersData);

    if (!manufacturersData || manufacturersData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Нет данных для отображения</td></tr>';
        return;
    }

    tbody.innerHTML = manufacturersData.map(manufacturer => `
        <tr>
            <td>
                <div class="manufacturer-info">
                    <div class="manufacturer-name">${manufacturer.name}</div>
                </div>
            </td>
            <td>
                <div class="manufacturer-contact">
                    <div class="contact-phone">${manufacturer.contact}</div>
                    <div class="contact-email">${manufacturer.email}</div>
                    <a href="https://${manufacturer.website}" target="_blank" class="contact-website">${manufacturer.website}</a>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small edit-btn" onclick="editManufacturer(${manufacturer.id})">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">Редактировать</span>
                    </button>
                    <button class="action-btn-small products-btn" onclick="viewManufacturerProducts(${manufacturer.id})">
                        <span class="btn-icon">📦</span>
                        <span class="btn-text">Продукция</span>
                    </button>
                    <button class="action-btn-small delete-btn" onclick="deleteManufacturer(${manufacturer.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Удалить</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    updateManufacturersStats();
}

// Функция для отображения отфильтрованных производителей
function displayFilteredManufacturers(manufacturers) {
    const tbody = document.getElementById('manufacturersTableBody');

    if (!manufacturers || manufacturers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Ничего не найдено</td></tr>';
        document.getElementById('manufacturersResultsCount').textContent = '0';
        return;
    }

    tbody.innerHTML = manufacturers.map(manufacturer => `
        <tr>
            <td>
                <div class="manufacturer-info">
                    <div class="manufacturer-name">${manufacturer.name}</div>
                </div>
            </td>
            <td>
                <div class="manufacturer-contact">
                    <div class="contact-phone">${manufacturer.contact}</div>
                    <div class="contact-email">${manufacturer.email}</div>
                    <a href="https://${manufacturer.website}" target="_blank" class="contact-website">${manufacturer.website}</a>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn-small edit-btn" onclick="editManufacturer(${manufacturer.id})">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">Редактировать</span>
                    </button>
                    <button class="action-btn-small products-btn" onclick="viewManufacturerProducts(${manufacturer.id})">
                        <span class="btn-icon">📦</span>
                        <span class="btn-text">Продукция</span>
                    </button>
                    <button class="action-btn-small delete-btn" onclick="deleteManufacturer(${manufacturer.id})">
                        <span class="btn-icon">🗑️</span>
                        <span class="btn-text">Удалить</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('manufacturersResultsCount').textContent = manufacturers.length;
}

// Функция для обновления статистики производителей
function updateManufacturersStats() {
    if (!manufacturersData || manufacturersData.length === 0) {
        document.getElementById('manufacturersResultsCount').textContent = '0';
        document.getElementById('manufacturersTotalCount').textContent = '0';
        return;
    }

    const totalManufacturers = manufacturersData.length;

    document.getElementById('manufacturersResultsCount').textContent = totalManufacturers;
    document.getElementById('manufacturersTotalCount').textContent = totalManufacturers;
}
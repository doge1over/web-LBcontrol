// Функция для загрузки данных поставщиков
function loadSuppliersData() {
    console.log('=== ЗАГРУЗКА ДАННЫХ ПОСТАВЩИКОВ ===');
    const tbody = document.getElementById('suppliersTableBody');

    if (!tbody) {
        console.error('❌ Элемент suppliersTableBody не найден');
        return;
    }

    // Безопасно получаем данные
    const suppliers = getSuppliersData();
    console.log('Получены данные:', suppliers);

    if (!suppliers || suppliers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Нет данных для отображения</td></tr>';
        console.warn('⚠️ Данные поставщиков отсутствуют или пусты');
        return;
    }

    console.log('✅ Рендерим данные поставщиков');

    // Безопасное использование map с проверкой
    try {
        const suppliersList = suppliers.map(supplier => `
            <tr>
                <td>
                    <div class="supplier-info">
                        <div class="supplier-name">${supplier.name || 'Не указано'}</div>
                    </div>
                </td>
                <td>
                    <div class="supplier-contact">
                        <div class="contact-phone">${supplier.contact || 'Не указано'}</div>
                        <div class="contact-email">${supplier.email || 'Не указано'}</div>
                        <a href="https://${supplier.website || '#'}" target="_blank" class="contact-website">${supplier.website || 'Не указано'}</a>
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn-small edit-btn" onclick="editSupplier(${supplier.id})">
                            <span class="btn-icon">✏️</span>
                            <span class="btn-text">Редактировать</span>
                        </button>
                        <button class="action-btn-small products-btn" onclick="viewSupplierProducts(${supplier.id})">
                            <span class="btn-icon">📦</span>
                            <span class="btn-text">Продукция</span>
                        </button>
                        <button class="action-btn-small delete-btn" onclick="deleteSupplier(${supplier.id})">
                            <span class="btn-icon">🗑️</span>
                            <span class="btn-text">Удалить</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = suppliersList;
        updateSuppliersStats();
        console.log('✅ Данные поставщиков успешно загружены');
    } catch (error) {
        console.error('❌ Ошибка при рендеринге данных поставщиков:', error);
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: red;">Ошибка загрузки данных</td></tr>';
    }
}

// Функция для отображения отфильтрованных поставщиков
function displayFilteredSuppliers(suppliers) {
    const tbody = document.getElementById('suppliersTableBody');
    if (!tbody) return;

    if (!suppliers || suppliers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #ccc;">Ничего не найдено</td></tr>';
        document.getElementById('suppliersResultsCount').textContent = '0';
        return;
    }

    try {
        const suppliersList = suppliers.map(supplier => `
            <tr>
                <td>
                    <div class="supplier-info">
                        <div class="supplier-name">${supplier.name || 'Не указано'}</div>
                    </div>
                </td>
                <td>
                    <div class="supplier-contact">
                        <div class="contact-phone">${supplier.contact || 'Не указано'}</div>
                        <div class="contact-email">${supplier.email || 'Не указано'}</div>
                        <a href="https://${supplier.website || '#'}" target="_blank" class="contact-website">${supplier.website || 'Не указано'}</a>
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn-small edit-btn" onclick="editSupplier(${supplier.id})">
                            <span class="btn-icon">✏️</span>
                            <span class="btn-text">Редактировать</span>
                        </button>
                        <button class="action-btn-small products-btn" onclick="viewSupplierProducts(${supplier.id})">
                            <span class="btn-icon">📦</span>
                            <span class="btn-text">Продукция</span>
                        </button>
                        <button class="action-btn-small delete-btn" onclick="deleteSupplier(${supplier.id})">
                            <span class="btn-icon">🗑️</span>
                            <span class="btn-text">Удалить</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        tbody.innerHTML = suppliersList;
        document.getElementById('suppliersResultsCount').textContent = suppliers.length;
    } catch (error) {
        console.error('❌ Ошибка при отображении отфильтрованных поставщиков:', error);
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: red;">Ошибка отображения данных</td></tr>';
    }
}

// Функция для обновления статистики поставщиков
function updateSuppliersStats() {
    const suppliers = getSuppliersData();

    if (!suppliers || suppliers.length === 0) {
        document.getElementById('suppliersResultsCount').textContent = '0';
        document.getElementById('suppliersTotalCount').textContent = '0';
        return;
    }

    const totalSuppliers = suppliers.length;

    document.getElementById('suppliersResultsCount').textContent = totalSuppliers;
    document.getElementById('suppliersTotalCount').textContent = totalSuppliers;
}
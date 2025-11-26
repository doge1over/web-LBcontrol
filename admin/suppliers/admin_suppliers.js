// Переменная для хранения текущего выбранного поставщика
let currentSupplierId = null;

// Функция для возврата в админку
function goToAdmin() {
    window.location.href = 'admin_dashboard.html';
}

// Безопасное получение данных поставщиков
function getSuppliersData() {
    console.log('=== ПРОВЕРКА ДАННЫХ ПОСТАВЩИКОВ ===');
    console.log('adminSuppliersData:', adminSuppliersData);
    console.log('Тип adminSuppliersData:', typeof adminSuppliersData);
    console.log('Является массивом:', Array.isArray(adminSuppliersData));

    // Проверяем, есть ли данные поставщиков
    if (typeof adminSuppliersData === 'undefined') {
        console.error('❌ adminSuppliersData не определена в глобальной области');
        return [];
    }

    // Проверяем, является ли adminSuppliersData массивом
    if (!Array.isArray(adminSuppliersData)) {
        console.warn('⚠️ adminSuppliersData не является массивом, преобразуем:', typeof adminSuppliersData);

        // Пытаемся преобразовать в массив
        if (adminSuppliersData && typeof adminSuppliersData === 'object') {
            const arrayData = Object.values(adminSuppliersData);
            console.log('✅ Преобразовано в массив:', arrayData);
            return arrayData;
        } else {
            console.error('❌ Не удалось преобразовать в массив');
            return [];
        }
    }

    console.log('✅ Данные поставщиков загружены успешно');
    return adminSuppliersData;
}

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

// Функция для очистки поиска
function clearSuppliersSearch() {
    console.log('Очистка поиска');
    document.getElementById('suppliersSearch').value = '';
    applySuppliersFilters();
}

// Функция для применения фильтров
function applySuppliersFilters() {
    const suppliers = getSuppliersData();
    if (!suppliers || suppliers.length === 0) return;

    const searchTerm = document.getElementById('suppliersSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    console.log('Применение фильтров:', { searchTerm, statusFilter });

    const filteredSuppliers = suppliers.filter(supplier => {
        const matchesSearch = !searchTerm ||
            (supplier.name && supplier.name.toLowerCase().includes(searchTerm)) ||
            (supplier.email && supplier.email.toLowerCase().includes(searchTerm));

        const matchesStatus = !statusFilter || supplier.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    displayFilteredSuppliers(filteredSuppliers);
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

// Функция для отображения продукции поставщика
function viewSupplierProducts(supplierId) {
    console.log('Просмотр продукции поставщика:', supplierId);
    currentSupplierId = supplierId;

    const suppliers = getSuppliersData();
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) {
        alert('Поставщик не найден');
        return;
    }

    // Скрываем основную таблицу и показываем таблицу продукции
    const mainTable = document.querySelector('.table-section');
    if (mainTable) mainTable.style.display = 'none';

    // Создаем или показываем секцию продукции
    let productsSection = document.getElementById('productsSection');
    if (!productsSection) {
        productsSection = document.createElement('div');
        productsSection.id = 'productsSection';
        productsSection.className = 'table-section products-section';
        productsSection.innerHTML = `
            <div class="products-header">
                <h2 class="products-title">Продукция поставщика: ${supplier.name}</h2>
                <div class="products-actions">
                    <button class="action-btn add-btn" onclick="addProduct()">
                        ➕ Добавить продукт
                    </button>
                    <button class="action-btn back-btn" onclick="backToSuppliers()">
                        ← Назад к поставщикам
                    </button>
                </div>
            </div>
            <div class="table-container">
                <table class="products-table">
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Код продукта</th>
                            <th>Описание</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody id="productsTableBody">
                    </tbody>
                </table>
            </div>
        `;
        document.querySelector('.admin-container').appendChild(productsSection);
    } else {
        productsSection.style.display = 'block';
    }

    // Загружаем данные продукции
    loadProductsData(supplierId);
}

// Функция для загрузки данных продукции
function loadProductsData(supplierId) {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    // Проверяем, что adminSupplierProductsData существует
    if (typeof adminSupplierProductsData === 'undefined' || !Array.isArray(adminSupplierProductsData)) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #ccc;">Ошибка загрузки данных продукции</td></tr>';
        return;
    }

    const supplierProducts = adminSupplierProductsData.filter(product => product.supplierId === supplierId);

    if (supplierProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #ccc;">Продукция отсутствует</td></tr>';
        return;
    }

    try {
        tbody.innerHTML = supplierProducts.map(product => `
            <tr>
                <td>${product.name || 'Не указано'}</td>
                <td>${product.code || 'Не указан'}</td>
                <td>${product.description || 'Описание отсутствует'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn-small edit-btn" onclick="editProduct(${product.id})">
                            <span class="btn-icon">✏️</span>
                            <span class="btn-text">Редактировать</span>
                        </button>
                        <button class="action-btn-small delete-btn" onclick="deleteProduct(${product.id})">
                            <span class="btn-icon">🗑️</span>
                            <span class="btn-text">Удалить</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('❌ Ошибка при загрузке данных продукции:', error);
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">Ошибка загрузки продукции</td></tr>';
    }
}

// Функция для возврата к таблице поставщиков
function backToSuppliers() {
    console.log('Возврат к списку поставщиков');
    const productsSection = document.getElementById('productsSection');
    if (productsSection) {
        productsSection.style.display = 'none';
    }
    const mainTable = document.querySelector('.table-section');
    if (mainTable) mainTable.style.display = 'block';
    currentSupplierId = null;
}

// Функции для работы с поставщиками
function addSupplier() {
    console.log('Добавление поставщика');
    document.getElementById('modalTitle').textContent = 'Добавление поставщика';
    document.getElementById('modalFields').innerHTML = `
        <div class="form-group">
            <label for="supplierName">Название поставщика</label>
            <input type="text" id="supplierName" placeholder="Введите название" required>
        </div>
        <div class="form-group">
            <label for="supplierContact">Контактный телефон</label>
            <input type="tel" id="supplierContact" placeholder="+7 (XXX) XXX-XX-XX" required>
        </div>
        <div class="form-group">
            <label for="supplierEmail">Email</label>
            <input type="email" id="supplierEmail" placeholder="Введите email" required>
        </div>
        <div class="form-group">
            <label for="supplierWebsite">Веб-сайт</label>
            <input type="text" id="supplierWebsite" placeholder="www.example.com" required>
        </div>
    `;
    document.getElementById('editModal').style.display = 'flex';
}

function editSupplier(supplierId) {
    console.log('Редактирование поставщика:', supplierId);
    const suppliers = getSuppliersData();
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
        document.getElementById('modalTitle').textContent = 'Редактирование поставщика';
        document.getElementById('modalFields').innerHTML = `
            <div class="form-group">
                <label for="supplierName">Название поставщика</label>
                <input type="text" id="supplierName" value="${supplier.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="supplierContact">Контактный телефон</label>
                <input type="tel" id="supplierContact" value="${supplier.contact || ''}" required>
            </div>
            <div class="form-group">
                <label for="supplierEmail">Email</label>
                <input type="email" id="supplierEmail" value="${supplier.email || ''}" required>
            </div>
            <div class="form-group">
                <label for="supplierWebsite">Веб-сайт</label>
                <input type="text" id="supplierWebsite" value="${supplier.website || ''}" required>
            </div>
            <div class="form-group">
                <label for="supplierStatus">Статус</label>
                <select id="supplierStatus" required>
                    <option value="active" ${supplier.status === 'active' ? 'selected' : ''}>Активен</option>
                    <option value="inactive" ${supplier.status === 'inactive' ? 'selected' : ''}>Неактивен</option>
                </select>
            </div>
            <input type="hidden" id="supplierId" value="${supplier.id}">
        `;
        document.getElementById('editModal').style.display = 'flex';
    }
}

function deleteSupplier(supplierId) {
    console.log('Удаление поставщика:', supplierId);
    if (confirm('Вы уверены, что хотите удалить этого поставщика?')) {
        alert(`Поставщик ID: ${supplierId} будет удален`);
    }
}

// Вспомогательные функции
function addProduct() {
    console.log('Добавление продукта');
    alert('Функция добавления продукта будет реализована в ближайшее время');
}

function editProduct(productId) {
    console.log('Редактирование продукта:', productId);
    alert(`Редактирование продукта ID: ${productId}`);
}

function deleteProduct(productId) {
    console.log('Удаление продукта:', productId);
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
        alert(`Продукт ID: ${productId} будет удален`);
    }
}

// Функции для модальных окон
function closeEditModal() {
    console.log('Закрытие модального окна редактирования');
    document.getElementById('editModal').style.display = 'none';
}

function closeSupportModal() {
    console.log('Закрытие модального окна поддержки');
    document.getElementById('supportModal').style.display = 'none';
}

function openSupportModal() {
    console.log('Открытие модального окна поддержки');
    document.getElementById('supportModal').style.display = 'flex';
}

// Обработчик формы редактирования
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM ЗАГРУЖЕН ДЛЯ ADMIN SUPPLIERS ===');

    // Обработчик формы редактирования
    const editForm = document.getElementById('editForm');
    if (editForm) {
        console.log('Найдена форма редактирования');
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Сохранение изменений поставщика');
            alert('Изменения сохранены!');
            closeEditModal();
        });
    }

    // Обработчик поиска
    const suppliersSearch = document.getElementById('suppliersSearch');
    if (suppliersSearch) {
        suppliersSearch.addEventListener('input', function() {
            console.log('Поиск:', this.value);
            applySuppliersFilters();
        });
    }

    // Обработчик статуса
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            console.log('Фильтр статуса:', this.value);
            applySuppliersFilters();
        });
    }

    // Обработчик формы поддержки
    const supportForm = document.querySelector('.support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы поддержки');
            alert('Сообщение отправлено в службу поддержки!');
            closeSupportModal();
        });
    }

    // Загрузка данных
    console.log('Загрузка данных поставщиков...');
    loadSuppliersData();
    console.log('Инициализация завершена');
});
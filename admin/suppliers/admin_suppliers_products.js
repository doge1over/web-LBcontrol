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

    const productsData = getSupplierProductsData();
    const supplierProducts = productsData.filter(product => product.supplierId === supplierId);

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

// Вспомогательные функции для продукции
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
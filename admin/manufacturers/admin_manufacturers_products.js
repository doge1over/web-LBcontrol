// Функция для отображения продукции производителя
function viewManufacturerProducts(manufacturerId) {
    currentManufacturerId = manufacturerId;
    const manufacturer = manufacturersData.find(m => m.id === manufacturerId);

    if (!manufacturer) {
        alert('Производитель не найден');
        return;
    }

    // Скрываем основную таблицу и показываем таблицу продукции
    document.getElementById('manufacturersTableBody').closest('.table-section').style.display = 'none';

    // Создаем или показываем секцию продукции
    let productsSection = document.getElementById('productsSection');
    if (!productsSection) {
        productsSection = document.createElement('div');
        productsSection.id = 'productsSection';
        productsSection.className = 'table-section products-section';
        productsSection.innerHTML = `
            <div class="products-header">
                <h2 class="products-title">Продукция производителя: ${manufacturer.name}</h2>
                <div class="products-actions">
                    <button class="action-btn add-btn" onclick="addProduct()">
                        ➕ Добавить продукт
                    </button>
                    <button class="action-btn back-btn" onclick="backToManufacturers()">
                        ← Назад к производителям
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
    loadProductsData(manufacturerId);
}

// Функция для загрузки данных продукции
function loadProductsData(manufacturerId) {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    const manufacturerProducts = productsData.filter(product => product.manufacturerId === manufacturerId);

    if (manufacturerProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #ccc;">Продукция отсутствует</td></tr>';
        return;
    }

    tbody.innerHTML = manufacturerProducts.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.code}</td>
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
}

// Функция для возврата к таблице производителей
function backToManufacturers() {
    const productsSection = document.getElementById('productsSection');
    if (productsSection) {
        productsSection.style.display = 'none';
    }
    document.getElementById('manufacturersTableBody').closest('.table-section').style.display = 'block';
    currentManufacturerId = null;
}

// Вспомогательные функции для продукции
function addProduct() {
    alert('Функция добавления продукта будет реализована в ближайшее время');
}

function editProduct(productId) {
    alert(`Редактирование продукта ID: ${productId}`);
}

function deleteProduct(productId) {
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
        alert(`Продукт ID: ${productId} будет удален`);
    }
}
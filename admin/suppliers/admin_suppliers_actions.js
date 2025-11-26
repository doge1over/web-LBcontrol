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

    const editModal = document.getElementById('editModal');
    editModal.style.display = 'flex';
    editModal.style.alignItems = 'center';
    editModal.style.justifyContent = 'center';
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
            <input type="hidden" id="supplierId" value="${supplier.id}">
        `;

        const editModal = document.getElementById('editModal');
        editModal.style.display = 'flex';
        editModal.style.alignItems = 'center';
        editModal.style.justifyContent = 'center';
    }
}

function deleteSupplier(supplierId) {
    console.log('Удаление поставщика:', supplierId);
    if (confirm('Вы уверены, что хотите удалить этого поставщика?')) {
        alert(`Поставщик ID: ${supplierId} будет удален`);
    }
}

// Обработка формы редактирования
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Сохранение изменений поставщика');
            alert('Изменения сохранены!');
            closeEditModal();
        });
    }
});
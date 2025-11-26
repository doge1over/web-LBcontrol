// Функции для работы с производителями
function addManufacturer() {
    document.getElementById('modalTitle').textContent = 'Добавление производителя';
    document.getElementById('modalFields').innerHTML = `
        <div class="form-group">
            <label for="manufacturerName">Название производителя</label>
            <input type="text" id="manufacturerName" placeholder="Введите название" required>
        </div>
        <div class="form-group">
            <label for="manufacturerContact">Контактный телефон</label>
            <input type="tel" id="manufacturerContact" placeholder="+7 (XXX) XXX-XX-XX" required>
        </div>
        <div class="form-group">
            <label for="manufacturerEmail">Email</label>
            <input type="email" id="manufacturerEmail" placeholder="Введите email" required>
        </div>
        <div class="form-group">
            <label for="manufacturerWebsite">Веб-сайт</label>
            <input type="text" id="manufacturerWebsite" placeholder="www.example.com" required>
        </div>
    `;

    const editModal = document.getElementById('editModal');
    editModal.style.display = 'flex';
    editModal.style.alignItems = 'center';
    editModal.style.justifyContent = 'center';
}

function editManufacturer(manufacturerId) {
    const manufacturer = manufacturersData.find(m => m.id === manufacturerId);
    if (manufacturer) {
        document.getElementById('modalTitle').textContent = 'Редактирование производителя';
        document.getElementById('modalFields').innerHTML = `
            <div class="form-group">
                <label for="manufacturerName">Название производителя</label>
                <input type="text" id="manufacturerName" value="${manufacturer.name}" required>
            </div>
            <div class="form-group">
                <label for="manufacturerContact">Контактный телефон</label>
                <input type="tel" id="manufacturerContact" value="${manufacturer.contact}" required>
            </div>
            <div class="form-group">
                <label for="manufacturerEmail">Email</label>
                <input type="email" id="manufacturerEmail" value="${manufacturer.email}" required>
            </div>
            <div class="form-group">
                <label for="manufacturerWebsite">Веб-сайт</label>
                <input type="text" id="manufacturerWebsite" value="${manufacturer.website}" required>
            </div>
            <input type="hidden" id="manufacturerId" value="${manufacturer.id}">
        `;

        const editModal = document.getElementById('editModal');
        editModal.style.display = 'flex';
        editModal.style.alignItems = 'center';
        editModal.style.justifyContent = 'center';
    }
}

function deleteManufacturer(manufacturerId) {
    if (confirm('Вы уверены, что хотите удалить этого производителя?')) {
        alert(`Производитель ID: ${manufacturerId} будет удален`);
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
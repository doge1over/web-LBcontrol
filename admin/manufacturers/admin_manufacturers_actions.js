
// Глобальная переменная для хранения данных
let manufacturersData = [];

// Функция для добавления производителя
function addManufacturer() {
    document.getElementById('modalTitle').textContent = 'Добавление производителя';
    document.getElementById('modalFields').innerHTML = `
        <div class="form-group">
            <label for="manufacturerName">Название производителя *</label>
            <input type="text" id="manufacturerName" placeholder="Введите название производителя" required>
        </div>
    `;

    const editModal = document.getElementById('editModal');
    editModal.style.display = 'flex';

    // Фокус на поле ввода
    setTimeout(() => {
        document.getElementById('manufacturerName').focus();
    }, 100);
}

// Функция для редактирования производителя
function editManufacturer(manufacturerId) {
    const manufacturer = manufacturersData.find(m => m.id === manufacturerId);
    if (manufacturer) {
        document.getElementById('modalTitle').textContent = 'Редактирование производителя';
        document.getElementById('modalFields').innerHTML = `
            <div class="form-group">
                <label for="manufacturerName">Название производителя *</label>
                <input type="text" id="manufacturerName" value="${manufacturer.name}" required>
            </div>
            <input type="hidden" id="manufacturerId" value="${manufacturer.id}">
        `;

        const editModal = document.getElementById('editModal');
        editModal.style.display = 'flex';

        setTimeout(() => {
            document.getElementById('manufacturerName').focus();
        }, 100);
    }
}

// Функция для удаления производителя
async function deleteManufacturer(manufacturerId) {
    if (confirm('Вы уверены, что хотите удалить этого производителя?')) {
        try {
            await manufacturerService.delete(manufacturerId);
            await loadManufacturersData(); // Перезагружаем данные
            alert('Производитель успешно удален');
        } catch (error) {
            alert('Ошибка при удалении производителя: ' + error.message);
        }
    }
}

// Обработка формы редактирования/добавления
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('manufacturerName').value.trim();
            const manufacturerId = document.getElementById('manufacturerId')?.value;

            if (!name) {
                alert('Введите название производителя');
                return;
            }

            try {
                if (manufacturerId) {
                    // Редактирование существующего
                    await manufacturerService.update(parseInt(manufacturerId), name);
                } else {
                    // Создание нового
                    await manufacturerService.create(name);
                }

                await loadManufacturersData(); // Перезагружаем данные
                closeEditModal();
            } catch (error) {
                alert('Ошибка при сохранении: ' + error.message);
            }
        });
    }
});